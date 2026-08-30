import { readConsent, startClarity } from "@/lib/consent";

/**
 * Microsoft Clarity — oturum kaydı ve ısı haritası.
 *
 * Dosya adı Next'in `instrumentation-client` sözleşmesi: HTML yüklendikten
 * sonra, React hydration'dan ÖNCE senkron çalışıyor. Bir client component
 * içindeki `useEffect`ten daha erken, dolayısıyla ilk ekranda yapılan
 * tıklamalar da kayda giriyor.
 * Kaynak: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md
 *
 * Model opt-out: kayıtlı bir RET yoksa araç çalışır. Karar verilmemiş
 * ziyaretçide de çalışıyor; bildirim bunu haber verip kapatma imkânı sunuyor
 * (bkz. components/CookieConsent.tsx).
 *
 * SPA gezinmeleri için `onRouterTransitionStart` gerekmiyor; Clarity script'i
 * history değişikliklerini kendi izliyor.
 */
if (readConsent() !== "denied") {
  startClarity();
}
