'use server';

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
 * BAŞVURU HENÜZ HİÇBİR YERE KAYDEDİLMİYOR. Bu action bugün yalnızca doğrulama
 * yapıyor; geçerse kullanıcıya "Başvurunuz alındı" ekranı gösteriliyor ama veri
 * gönderimin sonunda kayboluyor. Kaydın nereye yazılacağı ayrı bir iş —
 * hazırlanmış Sheets + Apps Script kurgusu docs/kayit-formu.md'de duruyor ve
 * devreye alındığında bağlanacağı yer bu dosya.
 *
 * FORM YAYINA ALINMADAN ÖNCE burası bağlanmalı: bugünkü hâliyle form, doldurulan
 * başvuruyu sessizce düşürüyor.
 *
 * Doğrulama kuralları `@/lib/kayit` içinde ve istemciyle ORTAK; burada yeniden
 * çalıştırılıyor çünkü action'a doğrudan istek atılabiliyor, kabul kararı
 * sunucunun.
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

  return { status: 'success' };
}
