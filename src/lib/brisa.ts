/**
 * Başvuruyu Brisa backend'ine ileten katman.
 *
 * ⛔ NEDEN VAR: bu form 2 Eylül 2026'ya kadar doldurulan başvuruyu SESSİZCE DÜŞÜRÜYORDU.
 * `actions.ts` yalnızca doğrulama yapıp "Başvurunuz alındı" ekranı gösteriyor, veri
 * gönderimin sonunda kayboluyordu (o dosyanın kendi yorumu da bunu söylüyordu). Hazırlanmış
 * Sheets + Apps Script kurgusu (`docs/kayit-formu.md`) devreye alınmadı; yerine başvurular
 * `POST /api/dealer-applications` ucuna gidiyor ve `dealer_applications` tablosunda
 * `PENDING` olarak saklanıyor. Dashboard'daki **Bayi Başvuruları** ekranı onları listeliyor,
 * onaylandığında tek transaction içinde bir bayi kaydı açılıyor.
 *
 * ⛔ CORS GEREKMİYOR — ve bu, entegrasyon notundaki bir yanılgının düzeltmesi. İstek
 * tarayıcıdan DEĞİL, Next.js sunucusundan çıkıyor (`actions.ts` bir `'use server'` dosyası),
 * yani server-to-server. Preflight yok, `Origin` başlığı yok, backend'in `CORS_ORIGINS`
 * listesine formun domaini EKLENMEK ZORUNDA DEĞİL. Bunun bir yan faydası var: backend
 * adresi tarayıcı paketine hiç girmiyor, o yüzden değişken adı bilinçli olarak
 * `NEXT_PUBLIC_` ÖNEKSİZ (`BRISA_API_BASE`) — önek eklenirse adres istemciye sızar.
 *
 * ⛔ EŞLEME DERLEYİCİYLE KORUNUYOR, disiplinle değil. Aşağıdaki sözlükler `kayit.ts`'teki
 * seçenek dizilerinden TÜRETİLMİŞ anahtarlara sahip (`Record<Bolge, LocationType>`), yani
 * bir seçeneğin Türkçe metni değişirse ya da yenisi eklenirse **build kırılır**. Elle
 * yazılmış bir `switch` ya da `string` anahtarlı bir nesne, o değişikliği sessizce
 * `undefined`'a çevirip başvuruyu 422'ye düşürürdü — üstelik yalnız o seçeneği işaretleyen
 * kullanıcılarda.
 */

import {
  BOLGE_SECENEKLERI,
  DIGER,
  DIJITAL_PAZARLAMA_SECENEKLERI,
  HIZMET_SECENEKLERI,
  KAPASITE_SECENEKLERI,
  MUSTERI_PROFILI_SECENEKLERI,
  telefonuBicimle,
  type Degerler,
} from './kayit';

type Bolge = (typeof BOLGE_SECENEKLERI)[number];
type Kapasite = (typeof KAPASITE_SECENEKLERI)[number];
type MusteriProfili = (typeof MUSTERI_PROFILI_SECENEKLERI)[number];
type Hizmet = (typeof HIZMET_SECENEKLERI)[number];
type DijitalPazarlama = (typeof DIJITAL_PAZARLAMA_SECENEKLERI)[number];

/* Enum değerleri backend'in `app/schemas/application.py` dosyasındakilerle birebir. */

const KONUM_TIPI: Record<Bolge, string> = {
  'Ana cadde / işlek cadde üzerinde': 'MAIN_STREET',
  'Sanayi sitesi içerisinde': 'INDUSTRIAL_SITE',
  'Ara sokak / mahalle içerisinde': 'NEIGHBORHOOD',
  'AVM veya büyük market içerisinde': 'SHOPPING_CENTER',
  Diğer: 'OTHER',
};

const ARAC_KAPASITESI: Record<Kapasite, string> = {
  '2 araç veya daha az': 'UP_TO_2',
  '3–4 araç': 'THREE_TO_FOUR',
  '5 araç veya daha fazla': 'FIVE_OR_MORE',
};

const MUSTERI_TIPI: Record<MusteriProfili, string> = {
  'Fiyat ve ekonomik çözümler odaklı bireysel müşteriler': 'PRICE_FOCUSED',
  'Premium segment araç sahipleri': 'PREMIUM',
  'Şehir içi kullanım ağırlıklı bireysel müşteriler': 'URBAN',
  'Ticari araç veya filo müşterileri': 'COMMERCIAL_FLEET',
  'Farklı müşteri gruplarına benzer oranlarda hizmet veriyoruz': 'BALANCED',
};

const HIZMET: Record<Hizmet, string> = {
  'Lastik değişimi': 'TIRE_CHANGE',
  'Lastik depolama': 'TIRE_STORAGE',
  'Akü hizmetleri': 'BATTERY',
  'Jant, rot ve balans hizmetleri': 'WHEEL_ALIGNMENT',
  'Oto Pratik / genel bakım hizmetleri': 'GENERAL_MAINTENANCE',
  Diğer: 'OTHER',
};

const DIJITAL: Record<DijitalPazarlama, string> = {
  'Web sitemi ve sosyal medya hesaplarımı aktif kullanıyor, düzenli olarak dijital reklam veriyorum':
    'ACTIVE_WEB_AND_ADS',
  'Sosyal medya hesaplarımı aktif kullanıyorum ancak web sitem veya düzenli dijital reklam faaliyetim bulunmuyor':
    'SOCIAL_ONLY',
  'Dijital kanalları sınırlı olarak kullanıyorum': 'LIMITED',
  'Henüz aktif bir dijital kanal kullanmıyorum': 'NONE',
  'Dijital pazarlama konusunda destek almak isterim': 'NEEDS_SUPPORT',
};

/**
 * Uca gidecek gövde. Alan adları backend'in alias'larıyla birebir ve uç
 * `extra="forbid"` ile çalışıyor — fazladan tek bir anahtar bütün başvuruyu 422 yapar,
 * o yüzden buraya "ne olur ne olmaz" diye alan eklenmez.
 */
export interface BasvuruGovdesi {
  companyName: string;
  city: string;
  district: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone: string;
  privacyConsent: true;
  locationType: string;
  vehicleCapacity: string;
  customerProfile: string;
  services: string[];
  digitalMarketingProfile?: string;
  locationTypeOther?: string;
  servicesOther?: string;
}

/**
 * Doğrulanmış form değerlerini uç gövdesine çevirir.
 *
 * ⚠ YALNIZ DOĞRULAMADAN GEÇMİŞ değerlerle çağrılır. Sözlükler doğrulamanın kabul ettiği
 * metinleri kapsıyor; kapsamayan bir değer buraya ancak doğrulama atlanırsa gelir ve o
 * hâlde `undefined` üretip uçtan 422 alır — sessizce yanlış bir enum yazmaktansa doğrusu bu.
 *
 * ⚠ Telefon HAM DEĞİL biçimlendirilmiş gidiyor (`telefonuBicimle`). İki sebep: uçtaki
 * `phone` alanı en fazla 20 karakter (form 30'a kadar kabul ediyor, `+90 (532) 123 45 67`
 * gibi bir giriş sınırı aşabilirdi) ve onaylanan başvuru `dealers.phone` kolonuna aynı
 * değeri yazıyor — orada `VARCHAR(20)`. Biçimlenmiş hâli 14 karakter.
 */
export function govdeyeCevir(degerler: Degerler): BasvuruGovdesi {
  const hizmetler = degerler.hizmetler ?? [];
  const bolge = degerler.bolge as Bolge;
  const dijital = degerler.dijitalPazarlama ?? '';

  const govde: BasvuruGovdesi = {
    companyName: degerler.sirket ?? '',
    city: degerler.il ?? '',
    district: degerler.ilce ?? '',
    contactFirstName: degerler.ad ?? '',
    contactLastName: degerler.soyad ?? '',
    email: degerler.email ?? '',
    phone: telefonuBicimle(degerler.telefon ?? ''),
    privacyConsent: true,
    locationType: KONUM_TIPI[bolge],
    vehicleCapacity: ARAC_KAPASITESI[degerler.kapasite as Kapasite],
    customerProfile: MUSTERI_TIPI[degerler.musteriProfili as MusteriProfili],
    /* Tekrar eden hizmet uçta 422 veriyor; kullanıcı aynı kutuyu iki kez işaretleyemez
       ama `getAll` elle kurcalanmış bir istekte yineleyebilir. */
    services: [...new Set(hizmetler.map((h) => HIZMET[h as Hizmet]))],
  };

  /* İsteğe bağlı alanlar YALNIZCA doluysa ekleniyor: `undefined` bir anahtar
     `JSON.stringify` ile düşer, ama boş string uçtaki `max_length`/enum kontrolüne
     takılırdı. */
  if (dijital !== '') govde.digitalMarketingProfile = DIJITAL[dijital as DijitalPazarlama];

  /* "Diğer" açıklamaları yalnız o seçenek işaretliyse gönderilir — seçim değiştikten
     sonra formda kalmış bayat bir metni başvuruya yazmamak için. */
  if (bolge === DIGER && (degerler.bolgeDiger ?? '') !== '') {
    govde.locationTypeOther = degerler.bolgeDiger;
  }
  if (hizmetler.includes(DIGER) && (degerler.hizmetlerDiger ?? '') !== '') {
    govde.servicesOther = degerler.hizmetlerDiger;
  }

  return govde;
}

/** Kullanıcıya gösterilen iletim hatası. Tek metin: sebebi kullanıcı düzeltemez. */
export const ILETILEMEDI_MESAJI =
  'Başvurunuz şu anda iletilemedi. Lütfen birkaç dakika sonra tekrar deneyin.';

/**
 * Başvuruyu uca gönderir. Başarılıysa `null`, değilse kullanıcıya gösterilecek mesaj döner.
 *
 * ⛔ HATA YUTULMUYOR: adres tanımsızsa, ağ koparsa ya da uç 4xx/5xx dönerse çağıran taraf
 * `message` alıyor ve form `BasvuruIletilemedi` ekranını basıyor. Eski davranış (sessizce
 * başarı göstermek) tam olarak bu yüzden kusurluydu — kullanıcı başvurusunun alındığını
 * sanıyordu.
 *
 * ⚠ Uçtan gelen `detail` KULLANICIYA GÖSTERİLMİYOR, yalnız sunucu log'una yazılıyor:
 * doğrulama mesajları alan adlarını (`locationType`) ve şema ayrıntısını sızdırır, ve
 * kullanıcının düzeltebileceği bir şey değil — form kendi doğrulamasından geçti.
 */
export async function basvuruyuGonder(degerler: Degerler): Promise<string | null> {
  const taban = process.env.BRISA_API_BASE;
  if (!taban) {
    console.error('[kayit] BRISA_API_BASE tanımlı değil — başvuru gönderilemedi');
    return ILETILEMEDI_MESAJI;
  }

  try {
    const yanit = await fetch(`${taban.replace(/\/+$/, '')}/api/dealer-applications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(govdeyeCevir(degerler)),
      /* Next'in fetch önbelleği POST'ta devrede değil; yine de açıkça yazılıyor ki
         framework varsayılanı değişse bir başvuru önbellekten "gönderilmiş" sayılmasın. */
      cache: 'no-store',
    });

    if (!yanit.ok) {
      const govde = await yanit.text().catch(() => '');
      console.error(`[kayit] uç ${yanit.status} döndü: ${govde.slice(0, 500)}`);
      return ILETILEMEDI_MESAJI;
    }

    /* Uç `{status, success, register, applicationId}` döndürüyor ve dördü de aynı şeyi
       söylüyor: satır yazıldı. Hiçbirine bakılmıyor — HTTP 2xx zaten commit'ten sonra
       üretiliyor, ve bir alanı okumak onun kalıcı olduğunu varsaymak olurdu (chatbot
       ucundaki üç alandan hangisinin kalacağı henüz belli değil). */
    return null;
  } catch (hata) {
    console.error('[kayit] başvuru iletilemedi:', hata);
    return ILETILEMEDI_MESAJI;
  }
}
