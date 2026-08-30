import Clarity from "@microsoft/clarity";

/**
 * Çerez rızasının tek kaynağı.
 *
 * İki çağıran var ve ikisi de aynı anahtarı, aynı başlatma yolunu kullansın
 * diye burada toplandı: `instrumentation-client.ts` (hydration'dan önce, daha
 * önce rıza vermiş ziyaretçi için) ve `components/CookieConsent.tsx` (ziyaretçi
 * kararı o an verdiğinde).
 *
 * KVKK'nın Çerez Uygulamaları Rehberi'nin gereği: zorunlu olmayan analitik
 * çerezler açık rıza ALINMADAN çalıştırılmaz. Bu yüzden model "önce yükle,
 * sonra rızayı bildir" değil — rıza yoksa script hiç enjekte edilmez.
 */

export const CONSENT_STORAGE_KEY = "ym-cerez-rizasi";

export type ConsentChoice = "granted" | "denied";

/**
 * Clarity'nin bu alan adına yazdığı birinci taraf çerezler. Rıza geri
 * alındığında siliniyor. clarity.ms alan adındaki çerezler bu koddan
 * silinemez; onlar yeni istek yapılmadığı sürece de güncellenmez.
 */
const CLARITY_COOKIES = ["_clck", "_clsk"];

let started = false;

/**
 * Depolama erişimi özel pencerede ve katı tarayıcı ayarlarında istisna
 * fırlatabiliyor; bu durumda karar saklanamaz ve bildirim sonraki ziyarette
 * yeniden gösterilir. Sessizce yutuluyor, çünkü alternatifi sayfayı kırmak.
 */
export function readConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function writeConsent(choice: ConsentChoice): void {
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // bkz. readConsent
  }
}

export function startClarity(): void {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!projectId || started) return;

  started = true;
  Clarity.init(projectId);

  /*
   * Clarity projesinde "cookie consent" ayarı açıksa çerez, bu bildirim
   * gelene kadar yazılmıyor. Ayar kapalıyken çağrı zararsız. İkisini de
   * karşıladığı için koşulsuz çağrılıyor.
   *
   * ad_Storage reddediliyor: sitede reklam amaçlı izleme yok ve bildirimde
   * yalnızca ziyaret analizi için rıza isteniyor.
   */
  Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
}

export function clearClarityCookies(): void {
  for (const name of CLARITY_COOKIES) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
  }
}
