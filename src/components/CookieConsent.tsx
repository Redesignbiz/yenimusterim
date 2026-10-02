"use client";

import { useSyncExternalStore } from "react";
import {
  clearAnalyticsCookies,
  readConsent,
  startAnalytics,
  writeConsent,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Footer'daki "Çerez tercihi" düğmesi ile bildirim arasındaki bağ bir DOM
 * olayı. İkisi ağacın farklı yerlerinde duruyor; tek bir boolean için layout'a
 * context sarmalayıcısı eklemeye değmiyor.
 */
const REOPEN_EVENT = "ym:cerez-tercihi";

/*
 * Bildirimin görünürlüğü React'in dışındaki iki kaynaktan geliyor:
 * localStorage'daki karar ve footer düğmesinin tetiklediği olay. Bu yüzden
 * `useState` + `useEffect` yerine `useSyncExternalStore` kullanılıyor —
 * effect içinde setState çağırmak cascading render üretiyor (React'in
 * `set-state-in-effect` kuralı).
 *
 * Sunucu anlık görüntüsü her zaman `false`: localStorage sunucuda yok,
 * bildirim ancak hydration'dan sonra açılıyor.
 */
const listeners = new Set<() => void>();
let snapshot: boolean | null = null;

function getSnapshot(): boolean {
  if (snapshot === null) snapshot = readConsent() === null;
  return snapshot;
}

function getServerSnapshot(): boolean {
  return false;
}

function setSnapshot(next: boolean): void {
  snapshot = next;
  for (const listener of listeners) listener();
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  const reopen = () => setSnapshot(true);
  window.addEventListener(REOPEN_EVENT, reopen);

  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener(REOPEN_EVENT, reopen);
  };
}

/**
 * Çerez bildirimi — ekranın alt kenarına yayılan bir çubuk.
 *
 * Model opt-out: analitik bildirimle birlikte çalışmaya başlamış oluyor,
 * bildirim de bunu haber verip kapatma imkânı sunuyor. Bu yüzden "Tamam" bir
 * izin değil, bildirimin okunduğunu belirtip pencereyi kapatma; asıl iş yapan
 * düğme "Reddet".
 *
 * Kapatma (X) düğmesi yok: bildirimin karar verilmeden kapanması, kapanmayı
 * zımni onay sayan bir okumaya kapı açardı. Çubuk modal değil, odak hapsetmiyor;
 * sayfa okunmaya devam edebilir.
 *
 * Konum layout'taki alt kaptan geliyor (bkz. layout.tsx), bileşen kendini
 * sabitlemiyor.
 */
export function CookieConsent() {
  const visible = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  function decide(choice: ConsentChoice) {
    writeConsent(choice);
    setSnapshot(false);

    if (choice === "granted") {
      // Opt-out olduğu için araçlar zaten çalışıyor; bu çağrı yalnızca daha
      // önce reddedip sonra izin veren ziyaretçi için iş yapıyor.
      startAnalytics();
      return;
    }

    /*
     * Ret geldiğinde script'ler bu sayfada çoktan yüklü ve ikisinin de
     * kaldırma API'si yok. Toplamayı gerçekten durdurmanın tek güvenilir yolu
     * sayfayı yeniden yüklemek; çerezler de öncesinde siliniyor.
     */
    clearAnalyticsCookies();
    window.location.reload();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="pointer-events-auto border-t border-outline-variant bg-surface-lowest"
    >
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6">
        <p className="text-[13px] leading-5 text-ink-muted">
          Sitemizin performansını ve kullanım deneyimini geliştirmek amacıyla
          sayfa içindeki etkileşim verilerini analiz ediyoruz.
        </p>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-primary-bright"
          >
            Tamam
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="rounded-full border border-outline-variant px-4 py-1.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface-container"
          >
            Reddet
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Ziyaretçi kararını sonradan değiştirebilsin diye bildirimi yeniden açan giriş
 * noktası: gizlilik politikasının 13. bölümü, her sayfanın footer'ındaki
 * Gizlilik Politikası bağlantısından ulaşılıyor. Politika sayfası bir server
 * component olduğundan `onClick` taşıyan parça ayrı.
 */
export function CookieConsentButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(REOPEN_EVENT))}
      className={className}
    >
      Çerez tercihini değiştir
    </button>
  );
}
