'use server';

import { basvuruyuGonder } from '@/lib/brisa';
import { iller } from '@/lib/iller';
import {
  ONAY_MESAJI,
  adim1Hatalari,
  adim2Hatalari,
  formuOku,
  temizle,
  type Hatalar,
  type KayitState,
} from '@/lib/kayit';

/**
 * Kayıt başvurusunun sunucu tarafı.
 *
 * ⛔ BAŞVURU ARTIK KAYDEDİLİYOR (2 Eyl 2026). Bu action 2 Eylül'e kadar yalnızca
 * doğrulama yapıyor, geçince "Başvurunuz alındı" ekranı gösteriyor ve veriyi
 * SESSİZCE DÜŞÜRÜYORDU — kullanıcı başvurduğunu sanıyor, hiçbir yerde kayıt yoktu.
 * Artık Brisa backend'indeki `POST /api/dealer-applications` ucuna gidiyor ve
 * `dealer_applications` tablosuna `PENDING` olarak yazılıyor; dashboard'daki
 * **Bayi Başvuruları** ekranı listeliyor, onay tek transaction içinde bayi kaydı açıyor.
 *
 * ⚠ Hazırlanmış Sheets + Apps Script kurgusu (`docs/kayit-formu.md`, `kayit-formu.gs`)
 * DEVREYE ALINMADI: başvurunun onaylanınca bayi kaydına dönmesi gerekiyor, bir tablo
 * satırı bunu yapamaz.
 *
 * Doğrulama kuralları `@/lib/kayit` içinde ve istemciyle ORTAK; burada yeniden
 * çalıştırılıyor çünkü action'a doğrudan istek atılabiliyor, kabul kararı
 * sunucunun. Eşleme (Türkçe seçenek → enum) `@/lib/brisa` içinde.
 */
export async function kayitBasvurusuGonder(
  _oncekiDurum: KayitState,
  formData: FormData,
): Promise<KayitState> {
  const degerler = formuOku(formData);

  /**
   * Bal küpü. Alan CSS ile ekran dışında, insan kullanıcı dolduramıyor; formu
   * otomatik tarayan bot dolduruyor. Bot'a hata göstermek denemeyi
   * tekrarlamasına yol açtığı için başarı ekranı döndürülüyor.
   */
  if (temizle(formData.get('websitesi'), 200) !== '') {
    return { status: 'success' };
  }

  const errors: Hatalar = {
    ...adim1Hatalari(degerler, iller),
    ...adim2Hatalari(degerler),
  };
  if (formData.get('onay') !== 'evet') errors.onay = ONAY_MESAJI;

  if (Object.keys(errors).length > 0) {
    return { status: 'error', errors, values: degerler };
  }

  /*
    ⛔ BAŞARI EKRANI ANCAK KAYIT YAZILDIKTAN SONRA. Doğrulamanın geçmesi başvurunun
    alındığı anlamına gelmiyor; uç ulaşılamazsa kullanıcı bunu ÖĞRENMELİ, yoksa
    başvurduğunu sanıp bir daha dönmez.

    Girilen değerler hata hâlinde geri veriliyor (`values`): React 19 action sonrası
    formu sıfırlıyor ve kullanıcı iki adımı yeniden doldurmak zorunda kalırdı.
  */
  const iletimHatasi = await basvuruyuGonder(degerler);
  if (iletimHatasi !== null) {
    return { status: 'error', message: iletimHatasi, values: degerler };
  }

  return { status: 'success' };
}
