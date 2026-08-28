import Clarity from "@microsoft/clarity";

/**
 * Microsoft Clarity — oturum kaydı ve ısı haritası.
 *
 * Dosya adı Next'in `instrumentation-client` sözleşmesi: HTML yüklendikten
 * sonra, React hydration'dan ÖNCE senkron çalışıyor. Bir client component
 * içindeki `useEffect`ten daha erken — ilk ekranda yapılan tıklamalar da kayda
 * giriyor. Ayrıca layout'a bileşen eklemeyi gerektirmiyor.
 * Kaynak: node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/instrumentation-client.md
 *
 * Proje kimliği `site.ts` yerine ortam değişkeninden okunuyor: değişkenin
 * tanımlı olmadığı ortamda `init` hiç çağrılmaz, script de enjekte edilmez.
 *
 * SPA gezinmeleri için `onRouterTransitionStart` gerekmiyor; Clarity script'i
 * history değişikliklerini kendi izliyor. `init` de kendi içinde try/catch'li
 * ve script'i id ile tek sefere kilitliyor (@microsoft/clarity/src/utils.js).
 */
const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

if (projectId) {
  Clarity.init(projectId);
}
