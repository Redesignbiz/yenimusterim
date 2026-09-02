import { readConsent, startAnalytics } from "@/lib/consent";

/**
 * Ziyaret analizi — Microsoft Clarity (oturum kaydı, ısı haritası) ve Google
 * Analytics 4 (trafik ve dönüşüm ölçümü).
 *
 * Dosya adı Next'in `instrumentation-client` sözleşmesi: HTML yüklendikten
 * sonra, React hydration'dan ÖNCE senkron çalışıyor. Bir client component
 * içindeki `useEffect`ten daha erken, dolayısıyla ilk ekranda yapılan
 * tıklamalar da kayda giriyor.
 * Kaynak: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md
 *
 * Model opt-out: kayıtlı bir RET yoksa araçlar çalışır. Karar verilmemiş
 * ziyaretçide de çalışıyor; bildirim bunu haber verip kapatma imkânı sunuyor
 * (bkz. components/CookieConsent.tsx).
 *
 * SPA gezinmeleri için `onRouterTransitionStart` gerekmiyor; iki araç da
 * history değişikliklerini kendi izliyor.
 */
if (readConsent() !== "denied") {
  startAnalytics();
}
