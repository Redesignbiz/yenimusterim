/**
 * Kayıt formunun istemci ve sunucu tarafının ORTAK sözleşmesi: alan adları,
 * seçenek listeleri, doğrulama kuralları, hata metinleri ve gönderim durumunun
 * tipi.
 *
 * Ayrı bir dosyada duruyorlar çünkü `app/kayit/actions.ts` bir `'use server'`
 * dosyası; oradan sabit export etmek server reference üretimiyle çakışır.
 * Buradaki değerler hem action'a hem `SignupForm`a giriyor, böylece iki taraf
 * aynı alan adını, aynı seçeneği ve aynı kuralı kullanıyor — doğrulama iki
 * yerde ayrı ayrı yazılmıyor.
 */

/* ---------------------------------------------------------------- alanlar */

/** Adım 1 — servis noktası ve sorumlu kişi bilgileri. */
export type Adim1Alani =
  | 'sirket'
  | 'il'
  | 'ilce'
  | 'ad'
  | 'soyad'
  | 'email'
  | 'telefon';

/** Adım 2 — işletme profili soruları. */
export type Adim2Alani =
  | 'bolge'
  | 'bolgeDiger'
  | 'kapasite'
  | 'musteriProfili'
  | 'hizmetler'
  | 'hizmetlerDiger'
  | 'dijitalPazarlama';

export type Alan = Adim1Alani | Adim2Alani | 'onay';

export type Hatalar = Partial<Record<Alan, string>>;

/**
 * Zorunlu metin alanları. Sıra ÖNEMLİ: doğrulama eksik alan bulduğunda bu
 * sıradaki ilkine odaklanıyor, yani kullanıcı formun en üstündeki eksiğe
 * gidiyor.
 */
export const ADIM1_ALANLARI: readonly Adim1Alani[] = [
  'sirket',
  'il',
  'ilce',
  'ad',
  'soyad',
  'email',
  'telefon',
];

/**
 * Adım 2'de zorunlu olan tek seçimli sorular. `dijitalPazarlama` bilinçli
 * olarak dışarıda: isteğe bağlı. `hizmetler` de burada değil, çoklu seçim
 * olduğu için ayrı kontrol ediliyor.
 */
export const ADIM2_ZORUNLU_SECIMLER: readonly Adim2Alani[] = [
  'bolge',
  'kapasite',
  'musteriProfili',
];

/* --------------------------------------------------------------- seçenekler */

/*
 * Seçenek değerleri KISA KOD DEĞİL, görünen metnin kendisi: hem tabloya okunur
 * biçimde düşüyor hem de sunucu doğrulaması "gelen değer listede var mı" diye
 * tek satırda bakabiliyor. Bir seçeneğin metni değişirse eski başvuruların
 * tablodaki kaydı olduğu gibi kalır, yeni gönderimler yeni metinle gelir.
 */

export const BOLGE_SECENEKLERI = [
  'Ana cadde / işlek cadde üzerinde',
  'Sanayi sitesi içerisinde',
  'Ara sokak / mahalle içerisinde',
  'AVM veya büyük market içerisinde',
  'Diğer',
] as const;

export const KAPASITE_SECENEKLERI = [
  '2 araç veya daha az',
  '3–4 araç',
  '5 araç veya daha fazla',
] as const;

export const MUSTERI_PROFILI_SECENEKLERI = [
  'Fiyat ve ekonomik çözümler odaklı bireysel müşteriler',
  'Premium segment araç sahipleri',
  'Şehir içi kullanım ağırlıklı bireysel müşteriler',
  'Ticari araç veya filo müşterileri',
  'Farklı müşteri gruplarına benzer oranlarda hizmet veriyoruz',
] as const;

export const HIZMET_SECENEKLERI = [
  'Lastik değişimi',
  'Lastik depolama',
  'Akü hizmetleri',
  'Jant, rot ve balans hizmetleri',
  'Oto Pratik / genel bakım hizmetleri',
  'Diğer',
] as const;

export const DIJITAL_PAZARLAMA_SECENEKLERI = [
  'Web sitemi ve sosyal medya hesaplarımı aktif kullanıyor, düzenli olarak dijital reklam veriyorum',
  'Sosyal medya hesaplarımı aktif kullanıyorum ancak web sitem veya düzenli dijital reklam faaliyetim bulunmuyor',
  'Dijital kanalları sınırlı olarak kullanıyorum',
  'Henüz aktif bir dijital kanal kullanmıyorum',
  'Dijital pazarlama konusunda destek almak isterim',
] as const;

/** "Diğer" seçildiğinde yanında serbest metin alanı açılan seçeneğin adı. */
export const DIGER = 'Diğer';

/* ------------------------------------------------------------- doğrulama */

export const EMAIL_KALIBI = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * `+90 (532) 123 45 67`, `0532 123 45 67` ve `5321234567` aynı sonuca iner:
 * rakam dışındaki her karakter ve baştaki ülke kodu / sıfır atılıp 10 haneli
 * gövde bırakılır. Türkiye'de alan kodları 2 ile 5 arasında başladığı için
 * `^90` kırpması geçerli bir numarayı bozmuyor.
 */
export function telefonGovdesi(giris: string): string {
  return giris.replace(/\D/g, '').replace(/^(?:0090|90|0)/, '');
}

export function telefonGecerliMi(giris: string): boolean {
  return /^[2-5]\d{9}$/.test(telefonGovdesi(giris));
}

/** 5321234567 → 0532 123 45 67. Tabloya ve e-postaya okunur biçimde yazılır. */
export function telefonuBicimle(giris: string): string {
  const govde = telefonGovdesi(giris);
  return `0${govde.slice(0, 3)} ${govde.slice(3, 6)} ${govde.slice(6, 8)} ${govde.slice(8, 10)}`;
}

/* ------------------------------------------------------------- mesajlar */

/**
 * Boş bırakılan her metin alanı için tek mesaj. Alanın ne olduğu etiketinde
 * zaten yazıyor; mesajın işi eksikliği söylemek.
 */
export const ZORUNLU_ALAN_MESAJI = 'Bu alan zorunludur.';

/** Tek seçimli sorular: kutu "doldurulmuyor", işaretleniyor. */
export const SECIM_MESAJI = 'Bir seçenek işaretleyin.';

/** Çoklu seçim (hizmetler). */
export const HIZMET_MESAJI = 'En az bir hizmet işaretleyin.';

export const ONAY_MESAJI = 'Başvuruyu göndermek için bu onay gerekiyor.';

/* ----------------------------------------------------------------- durum */

/** Sunucudan geri gelen değerler; hata hâlinde form bunlarla yeniden doluyor. */
export type Degerler = Partial<
  Record<Adim1Alani | Exclude<Adim2Alani, 'hizmetler'>, string>
> & {
  /** Çoklu seçim; diğer alanlardan farklı olarak dizi. */
  hizmetler?: string[];
};

export type KayitState = {
  status: 'idle' | 'error' | 'success';
  /** Alan bazlı hatalar; ilgili alanın altında gösterilir. */
  errors?: Hatalar;
  /**
   * Forma değil sürecin tamamına ait hata. Kayıt katmanı bağlanmadığı için
   * bugün hiç set edilmiyor; `BasvuruIletilemedi` ekranı onu bekliyor.
   */
  message?: string;
  /**
   * React 19, `action` bir fonksiyon olduğunda gönderim sonrası formu sıfırlıyor.
   * Hata hâlinde kullanıcının yazdıkları kaybolmasın diye değerler geri
   * döndürülüp `defaultValue` / `defaultChecked` olarak basılıyor.
   */
  values?: Degerler;
};

export const KAYIT_BASLANGIC: KayitState = { status: 'idle' };

/* --------------------------------------------------- okuma ve doğrulama */

/** Tek satırlık metin: kenar boşlukları, satır sonları ve iç boşluk tekrarları temizlenir. */
export function temizle(deger: FormDataEntryValue | null, azamiUzunluk: number): string {
  if (typeof deger !== 'string') return '';
  return deger.replace(/\s+/g, ' ').trim().slice(0, azamiUzunluk);
}

/**
 * Formu tek yerden okur. İstemci de sunucu da aynı fonksiyonu çağırıyor, yani
 * "kullanıcının gördüğü değer" ile "sunucunun doğruladığı değer" aynı temizleme
 * adımlarından geçiyor.
 */
export function formuOku(formData: FormData): Degerler {
  return {
    sirket: temizle(formData.get('sirket'), 160),
    il: temizle(formData.get('il'), 40),
    ilce: temizle(formData.get('ilce'), 60),
    ad: temizle(formData.get('ad'), 60),
    soyad: temizle(formData.get('soyad'), 60),
    email: temizle(formData.get('email'), 160).toLowerCase(),
    telefon: temizle(formData.get('telefon'), 30),
    bolge: temizle(formData.get('bolge'), 80),
    bolgeDiger: temizle(formData.get('bolgeDiger'), 120),
    kapasite: temizle(formData.get('kapasite'), 40),
    musteriProfili: temizle(formData.get('musteriProfili'), 120),
    hizmetler: formData
      .getAll('hizmetler')
      .map((deger) => temizle(deger, 80))
      .filter(Boolean),
    hizmetlerDiger: temizle(formData.get('hizmetlerDiger'), 120),
    dijitalPazarlama: temizle(formData.get('dijitalPazarlama'), 200),
  };
}

function listedeMi(liste: readonly string[], deger: string) {
  return liste.includes(deger);
}

/**
 * Adım 1 alanlarının hataları. Boş alan ile hatalı alan ayrı: boşsa mesaj her
 * alanda aynı, doluysa neyin yanlış olduğu söyleniyor — "Bu alan zorunludur"
 * yazısını dolu bir alanın altına koymak kullanıcıyı yanıltırdı.
 *
 * `iller` ve `ilceIlinMi` parametre olarak alınıyor: bu dosyanın referans verisine
 * bağımlı olmasına gerek yok, çağıran taraf hangi listeye karşı doğrulayacağını veriyor.
 *
 * ⛔ `ilceIlinMi` ZORUNLU, opsiyonel DEĞİL — ve bu bilinçli. Varsayılanı olsaydı
 * (ör. "her ilçeyi kabul et") bir çağıran onu geçmeyi unutup ilçe doğrulamasını
 * sessizce atlayabilirdi; iki çağıran var (form ve server action) ve ikisinin farklı
 * doğrulaması, forma elle istek atan birinin ilçe kontrolünü tamamen aşması demekti.
 * Zorunlu parametre bunu derleme hatasına çeviriyor.
 */
export function adim1Hatalari(
  degerler: Degerler,
  iller: readonly string[],
  ilceIlinMi: (il: string, ilce: string) => boolean,
): Hatalar {
  const hatalar: Hatalar = {};
  const { sirket = '', il = '', ilce = '', ad = '', soyad = '', email = '', telefon = '' } =
    degerler;

  if (sirket === '') hatalar.sirket = ZORUNLU_ALAN_MESAJI;
  else if (sirket.length < 2) hatalar.sirket = 'Şirket adını eksiksiz yazın.';

  if (il === '') hatalar.il = ZORUNLU_ALAN_MESAJI;
  else if (!listedeMi(iller, il)) hatalar.il = 'Listeden il seçin.';

  /*
    ⛔ İLÇE ARTIK SERBEST METİN DEĞİL, LİSTEDEN SEÇİLİYOR (3 Eyl 2026) — bu yüzden
    kontrol "en az 2 karakter" değil "o ilin ilçesi mi".

    Gerekçesi ölçülebilir: backend gelen ilçeyi kanonikleştiriyor ama tanımadığı bir
    yazımı olduğu gibi saklıyor, ve o satıra yazılmış hiçbir atama kuralı tutmuyor —
    yani "Kadikoy" yazan bir başvuru sessizce hiçbir kurala eşleşmeyen bir bayi kaydına
    dönüşürdü. Listeden seçilen ad uçta TAM EŞLEŞME buluyor.

    İl boşsa ilçe hatası BASILMIYOR: kullanıcı henüz il seçmediği için ilçe kutusu da
    kapalı, ve iki alanın altına birden hata yazmak eksiğin hangisi olduğunu belirsiz
    yapardı. İl hatası zaten basılıyor.
  */
  if (il !== '') {
    if (ilce === '') hatalar.ilce = SECIM_MESAJI;
    else if (!ilceIlinMi(il, ilce)) hatalar.ilce = 'Listeden ilçe seçin.';
  }

  if (ad === '') hatalar.ad = ZORUNLU_ALAN_MESAJI;
  else if (ad.length < 2) hatalar.ad = 'Adı eksiksiz yazın.';

  if (soyad === '') hatalar.soyad = ZORUNLU_ALAN_MESAJI;
  else if (soyad.length < 2) hatalar.soyad = 'Soyadı eksiksiz yazın.';

  if (email === '') hatalar.email = ZORUNLU_ALAN_MESAJI;
  else if (!EMAIL_KALIBI.test(email)) hatalar.email = 'E-posta adresini kontrol edin.';

  if (telefon === '') hatalar.telefon = ZORUNLU_ALAN_MESAJI;
  else if (!telefonGecerliMi(telefon)) {
    /* Mesajda örnek YOK: boşluklu bir örnek, boşluğun zorunlu olduğu izlenimini
       veriyor. Girilen değerdeki boşluk, parantez ve tire zaten atılıyor. */
    hatalar.telefon = 'Numarayı alan koduyla ve 10 hane olarak yazın.';
  }

  return hatalar;
}

/**
 * Adım 2 sorularının hataları. Seçenekler sabit listeden geldiği için kontrol
 * "gelen değer listede var mı" sorusuna iniyor; listede olmayan bir değer
 * ancak istek elle kurcalandığında oluşur.
 */
export function adim2Hatalari(degerler: Degerler): Hatalar {
  const hatalar: Hatalar = {};
  const {
    bolge = '',
    kapasite = '',
    musteriProfili = '',
    hizmetler = [],
    dijitalPazarlama = '',
  } = degerler;

  if (!listedeMi(BOLGE_SECENEKLERI, bolge)) hatalar.bolge = SECIM_MESAJI;
  if (!listedeMi(KAPASITE_SECENEKLERI, kapasite)) hatalar.kapasite = SECIM_MESAJI;
  if (!listedeMi(MUSTERI_PROFILI_SECENEKLERI, musteriProfili)) {
    hatalar.musteriProfili = SECIM_MESAJI;
  }

  if (hizmetler.length === 0) hatalar.hizmetler = HIZMET_MESAJI;
  else if (hizmetler.some((hizmet) => !listedeMi(HIZMET_SECENEKLERI, hizmet))) {
    hatalar.hizmetler = HIZMET_MESAJI;
  }

  /* İsteğe bağlı: boş geçilebilir, ama doldurulduysa listeden olmalı. */
  if (dijitalPazarlama !== '' && !listedeMi(DIJITAL_PAZARLAMA_SECENEKLERI, dijitalPazarlama)) {
    hatalar.dijitalPazarlama = SECIM_MESAJI;
  }

  return hatalar;
}

/**
 * "Diğer" seçildiğinde serbest metni seçeneğin yanına ekler: tabloda tek kolon
 * kalıyor ve "Diğer" satırı tek başına anlamsız bir kayıt olmuyor.
 */
export function digerIleBirlestir(secim: string, aciklama: string): string {
  if (secim !== DIGER || aciklama === '') return secim;
  return `${DIGER} — ${aciklama}`;
}
