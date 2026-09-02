import Clarity from "@microsoft/clarity";

/**
 * Çerez rızasının ve analitik araçların tek kaynağı.
 *
 * İki çağıran var ve ikisi de aynı anahtarı, aynı başlatma yolunu kullansın
 * diye burada toplandı: `instrumentation-client.ts` (hydration'dan önce, daha
 * önce rıza vermiş ziyaretçi için) ve `components/CookieConsent.tsx` (ziyaretçi
 * kararı o an verdiğinde).
 *
 * İki araç var — Microsoft Clarity ve Google Analytics 4 — ve ikisi de aynı
 * karara bağlı: `startAnalytics()` dışarıya tek düğme veriyor, hangi aracın
 * nasıl başladığı buranın içinde kalıyor. Bir araç eklenir veya çıkarılırsa
 * gizlilik politikasının 13. bölümü de değişir (src/app/gizlilik/page.tsx).
 *
 * Model OPT-OUT: kayıtlı bir ret yoksa araçlar çalışır (bkz.
 * `instrumentation-client.ts`). KVKK'nın Çerez Uygulamaları Rehberi zorunlu
 * olmayan analitik çerezler için önceden alınmış açık rıza istiyor; buradaki
 * akış o eşiği karşılamıyor, ziyaretçiye bildirim ve her zaman erişilebilir
 * bir kapatma yolu sunuyor. Opt-in'e geçilirse değişecek yer
 * `instrumentation-client.ts` içindeki koşul ve bildirimin düğme metinleri.
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_STORAGE_KEY = "ym-cerez-rizasi";

export type ConsentChoice = "granted" | "denied";

/**
 * Araçların bu alan adına yazdığı birinci taraf çerezler. Rıza geri alındığında
 * siliniyor. clarity.ms alan adındaki çerezler bu koddan silinemez; onlar yeni
 * istek yapılmadığı sürece de güncellenmez.
 *
 * Google Analytics'in ikinci çerezi ölçüm kimliğinden türüyor (`G-` öneki
 * atılıp `_ga_` ile birleştiriliyor), bu yüzden liste çalışma anında kuruluyor.
 */
function firstPartyCookies(): string[] {
  const names = ["_clck", "_clsk", "_ga"];
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (measurementId) {
    names.push(`_ga_${measurementId.replace(/^G-/, "")}`);
  }

  return names;
}

let clarityStarted = false;
let googleAnalyticsStarted = false;

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

/**
 * Ziyaret analizini başlatır. İki araç da tanımlıysa ikisi, biri tanımlıysa
 * yalnızca o çalışır; ortam değişkeni yoksa ilgili araç hiç yüklenmez.
 */
export function startAnalytics(): void {
  startClarity();
  startGoogleAnalytics();
}

function startClarity(): void {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;
  if (!projectId || clarityStarted) return;

  clarityStarted = true;
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

/**
 * Google Analytics 4 — gtag.js.
 *
 * Google'ın verdiği snippet iki `<script>` etiketinden oluşuyor; burası aynı
 * işi JavaScript'ten yapıyor, çünkü script yalnızca ret verilmemişken
 * yüklenecek ve bu karar layout'un render edildiği yerde (sunucu) bilinmiyor.
 *
 * Sıra önemli: komutlar `dataLayer` kuyruğuna gtag.js yüklenmeden önce
 * giriyor, script gelince kuyruğu baştan işliyor. Böylece consent sinyali ilk
 * ölçüm isteğinden önce uygulanıyor.
 *
 * SPA gezinmeleri için ek bir çağrı yok: GA4'ün geliştirilmiş ölçümü,
 * varsayılan ayarıyla history değişikliklerinde sayfa görüntülemesini kendi
 * gönderiyor (Clarity'de de durum aynı).
 */
function startGoogleAnalytics(): void {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId || googleAnalyticsStarted) return;

  googleAnalyticsStarted = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag() {
    /*
     * Kuyruğa dizi değil `arguments` giriyor: Google'ın yayımladığı snippet
     * komutları bu biçimde koyuyor ve gtag.js girdileri buna göre okuyor.
     * Dizinin aynı işlenip işlenmediği doğrulanmadı; snippet'ten sapmamak için
     * `arguments` korunuyor ve lint kuralı bu satırda susturuluyor.
     */
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer?.push(arguments);
  };

  /*
   * Clarity'de yapılan ayrım burada da korunuyor: reklam amaçlı depolama
   * reddediliyor, yalnızca analitik depolamaya izin veriliyor (bkz.
   * startClarity). Gizlilik politikası bölüm 13 bu sinyali anlatıyor.
   */
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
  });
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);
}

export function clearAnalyticsCookies(): void {
  for (const name of firstPartyCookies()) {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname}`;
  }
}
