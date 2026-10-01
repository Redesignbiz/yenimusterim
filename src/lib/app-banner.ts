import { site } from "@/lib/site";

const KAPATILDI_ANAHTARI = "app-banner-kapatildi";

/**
 * İndirme banner'ının durumu. Banner ekranın alt kenarında duruyor ve çerez
 * bildirimi de orada; bildirimin kendini yukarı alabilmesi için banner'ın
 * basılıp basılmadığını bilmesi gerekiyor (bkz. AppBanner.tsx, CookieConsent.tsx).
 *
 * Durum React'in dışında tutuluyor, iki bileşen de `useSyncExternalStore` ile
 * okuyor: değer yalnızca tarayıcıda belli olduğundan sunucu anlık görüntüsü
 * `null` ve hidrasyon bu sayede uyuşuyor.
 */
export type BannerPlatformu = "ios" | "android" | null;

let kapandi = false;
const dinleyiciler = new Set<() => void>();

export function bannerDurumu(): BannerPlatformu {
  if (kapandi) {
    return null;
  }

  try {
    if (localStorage.getItem(KAPATILDI_ANAHTARI)) {
      return null;
    }
  } catch {
    /* Gizli sekmede okuma hata atıyor; banner yine de çıksın. */
  }

  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/.test(ua)) {
    return site.stores.appStore ? "ios" : null;
  }

  if (/Android/.test(ua)) {
    return site.stores.googlePlay ? "android" : null;
  }

  return null;
}

export function bannerSunucuda(): BannerPlatformu {
  return null;
}

export function bannerDinle(yenile: () => void): () => void {
  dinleyiciler.add(yenile);
  return () => {
    dinleyiciler.delete(yenile);
  };
}

export function banneriKapat(): void {
  kapandi = true;

  try {
    localStorage.setItem(KAPATILDI_ANAHTARI, "1");
  } catch {
    /* Kapatma bu oturumda yine de geçerli, yalnızca hatırlanmıyor. */
  }

  for (const yenile of dinleyiciler) {
    yenile();
  }
}
