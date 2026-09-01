'use server';

import { iller } from '@/lib/iller';
import { site } from '@/lib/site';
import {
  ONAY_MESAJI,
  adim1Hatalari,
  adim2Hatalari,
  digerIleBirlestir,
  formuOku,
  telefonuBicimle,
  temizle,
  type Asama,
  type Degerler,
  type Hatalar,
  type KayitState,
} from '@/lib/kayit';

/**
 * Kayıt başvurusunun sunucu tarafı.
 *
 * Başvuru, Google Apps Script ile yayımlanmış bir web app'e POST edilir; script
 * satırı Sheets'e yazar ve bildirim e-postasını gönderir (kurulum: docs/kayit-formu.md).
 * İstek TARAYICIDAN DEĞİL sunucudan atılıyor: webhook adresi ve paylaşılan sır
 * istemciye hiç inmiyor, aksi hâlde tabloya dışarıdan satır yazılabilirdi.
 *
 * İKİ AŞAMA VAR. Adım 1 tamamlandığında (`adim1Kaydet`) satır tabloya hemen
 * düşüyor; kullanıcı ikinci adımı yarıda bıraksa bile iletişim bilgisi elde
 * kalıyor. Adım 2 gönderildiğinde (`kayitBasvurusuGonder`) aynı satır
 * `basvuruId` üzerinden bulunup tamamlanıyor.
 *
 * Doğrulama kuralları `@/lib/kayit` içinde ve istemciyle ORTAK; burada yeniden
 * çalıştırılıyor çünkü action'a doğrudan istek atılabiliyor, kabul kararı
 * sunucunun.
 */

/** Webhook'a gidecek düz gövde. Apps Script tarafı bu adları bekliyor. */
type WebhookGovdesi = {
  token: string;
  asama: Asama;
  basvuruId: string;
  gonderimZamani: string;
  sirket: string;
  il: string;
  ilce: string;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  bolge: string;
  kapasite: string;
  musteriProfili: string;
  hizmetler: string;
  dijitalPazarlama: string;
};

/**
 * Webhook çağrısı. Başarılıysa `true`; her başarısızlık durumunda sunucu
 * log'una neden yazılıp `false` dönüyor.
 */
async function webhookaGonder(
  govde: Omit<WebhookGovdesi, 'token'>,
): Promise<boolean> {
  const webhookUrl = process.env.SIGNUP_WEBHOOK_URL;
  const webhookToken = process.env.SIGNUP_WEBHOOK_TOKEN;

  if (!webhookUrl || !webhookToken) {
    console.error(
      '[kayit] SIGNUP_WEBHOOK_URL veya SIGNUP_WEBHOOK_TOKEN tanımlı değil; başvuru hiçbir yere yazılmadı.',
    );
    return false;
  }

  try {
    const yanit = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ token: webhookToken, ...govde }),
      /* Apps Script ağır yük altında yavaşlayabiliyor; süresiz beklemek yerine
         kullanıcıya hata gösterip tekrar denemesini istemek daha iyi. */
      signal: AbortSignal.timeout(15_000),
    });

    /* Apps Script hata verdiğinde 200 ile HTML hata sayfası döndürebiliyor;
       bu yüzden durum kodu yeterli değil, gövdedeki `ok` de kontrol ediliyor. */
    const govdeMetni = await yanit.text();
    let kabul = false;
    try {
      kabul = yanit.ok && JSON.parse(govdeMetni)?.ok === true;
    } catch {
      kabul = false;
    }

    if (!kabul) {
      console.error(
        `[kayit] Webhook başvuruyu kabul etmedi (${govde.asama}). Durum: ${yanit.status}. Yanıt: ${govdeMetni.slice(0, 300)}`,
      );
    }
    return kabul;
  } catch (hata) {
    console.error(`[kayit] Webhook isteği başarısız (${govde.asama}):`, hata);
    return false;
  }
}

/** Değerleri webhook gövdesine çevirir; "Diğer" açıklamaları seçeneğe eklenir. */
function govdeyeCevir(
  degerler: Degerler,
  asama: Asama,
  basvuruId: string,
): Omit<WebhookGovdesi, 'token'> {
  return {
    asama,
    basvuruId,
    gonderimZamani: new Date().toISOString(),
    sirket: degerler.sirket ?? '',
    il: degerler.il ?? '',
    ilce: degerler.ilce ?? '',
    ad: degerler.ad ?? '',
    soyad: degerler.soyad ?? '',
    email: degerler.email ?? '',
    telefon: degerler.telefon ? telefonuBicimle(degerler.telefon) : '',
    bolge: digerIleBirlestir(degerler.bolge ?? '', degerler.bolgeDiger ?? ''),
    kapasite: degerler.kapasite ?? '',
    musteriProfili: degerler.musteriProfili ?? '',
    hizmetler: (degerler.hizmetler ?? [])
      .map((hizmet) => digerIleBirlestir(hizmet, degerler.hizmetlerDiger ?? ''))
      .join(', '),
    dijitalPazarlama: degerler.dijitalPazarlama ?? '',
  };
}

/**
 * Adım 1'in kaydı. Kullanıcı "Devam Et"e bastığında çağrılıyor ve YANITI
 * BEKLENMİYOR: kayıt bir yan etki, ikinci adıma geçişi geciktirmemeli. Bu
 * yüzden hata da döndürmüyor — başarısızlık log'a yazılır, kullanıcının verisi
 * ikinci adımın gönderiminde zaten yeniden gidiyor.
 */
export async function adim1Kaydet(formData: FormData): Promise<void> {
  /* Bal küpü doluysa hiçbir şey kaydedilmez — bkz. kayitBasvurusuGonder. */
  if (temizle(formData.get('websitesi'), 200) !== '') return;

  const basvuruId = temizle(formData.get('basvuruId'), 64);
  if (basvuruId === '') {
    console.error('[kayit] Adım 1 kaydı basvuruId olmadan geldi, atlandı.');
    return;
  }

  const degerler = formuOku(formData);
  if (Object.keys(adim1Hatalari(degerler, iller)).length > 0) return;
  if (formData.get('onay') !== 'evet') return;

  await webhookaGonder(govdeyeCevir(degerler, 'adim1', basvuruId));
}

/** Adım 2'nin gönderimi: başvuruyu tamamlar. */
export async function kayitBasvurusuGonder(
  _oncekiDurum: KayitState,
  formData: FormData,
): Promise<KayitState> {
  const degerler = formuOku(formData);

  /**
   * Bal küpü. Alan CSS ile ekran dışında, insan kullanıcı dolduramıyor; formu
   * otomatik tarayan bot dolduruyor. Bot'a hata göstermek denemeyi
   * tekrarlamasına yol açtığı için başarı ekranı döndürülüyor, ama hiçbir yere
   * kayıt gitmiyor.
   */
  if (temizle(formData.get('websitesi'), 200) !== '') {
    return { status: 'success', gonderilenEmail: degerler.email };
  }

  const errors: Hatalar = {
    ...adim1Hatalari(degerler, iller),
    ...adim2Hatalari(degerler),
  };
  if (formData.get('onay') !== 'evet') errors.onay = ONAY_MESAJI;

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values: degerler };
  }

  const basvuruId = temizle(formData.get('basvuruId'), 64);
  const gonderildi = await webhookaGonder(
    govdeyeCevir(degerler, 'tamamlandi', basvuruId),
  );

  if (!gonderildi) {
    return { status: 'error', message: iletilemediMesaji(), values: degerler };
  }

  return { status: 'success', gonderilenEmail: degerler.email };
}

/**
 * Başvurunun kaydedilemediği her durumda aynı metin dönüyor: kullanıcı için
 * webhook'un neden yanıt vermediği bir bilgi değil, yapabileceği tek şey tekrar
 * denemek veya yazmak. Sebep sunucu log'unda duruyor.
 */
function iletilemediMesaji(): string {
  return (
    'Başvuru şu anda iletilemedi. Kısa süre sonra tekrar deneyin; ' +
    `sorunun devam etmesi durumunda bize ${site.contact.support} adresinden ulaşabilirsiniz.`
  );
}
