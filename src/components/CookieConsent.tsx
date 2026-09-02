"use client";

import { useSyncExternalStore } from "react";
import {
  clearClarityCookies,
  readConsent,
  startClarity,
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
 * Çerez bildirimi — sol alt köşede küçük bir pencere.
 *
 * Model opt-out: analitik bildirimle birlikte çalışmaya başlamış oluyor,
 * bildirim de bunu haber verip kapatma imkânı sunuyor. Bu yüzden "Tamam" bir
 * izin değil, bildirimin okunduğunu belirtip pencereyi kapatma; asıl iş yapan
 * düğme "Reddet".
 *
 * Kapatma (X) düğmesi yok: bildirimin karar verilmeden kapanması, kapanmayı
 * zımni onay sayan bir okumaya kapı açardı. Pencere modal değil, odak
 * hapsetmiyor; sayfa okunmaya devam edebilir.
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
      // Opt-out olduğu için araç zaten çalışıyor; bu çağrı yalnızca daha önce
      // reddedip sonra izin veren ziyaretçi için iş yapıyor.
      startClarity();
      return;
    }

    /*
     * Ret geldiğinde script bu sayfada çoktan yüklü ve Clarity'nin kaldırma
     * API'si yok. Toplamayı gerçekten durdurmanın tek güvenilir yolu sayfayı
     * yeniden yüklemek; çerezler de öncesinde siliniyor.
     */
    clearClarityCookies();
    window.location.reload();
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Çerez bildirimi"
      className="fixed bottom-4 left-4 right-4 z-[60] sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm"
    >
      <div className="rounded-lg border border-outline-variant bg-surface-lowest p-4">
        <p className="text-[13px] leading-5 text-ink-muted">
          Sitemizin performansını ve kullanım deneyimini geliştirmek amacıyla
          sayfa içindeki tıklama, kaydırma ve gezinme gibi etkileşim verilerini
          analiz ediyoruz.
        </p>
        <p className="mt-3 text-[13px] leading-5 text-ink-muted">
          Analitik kullanımını dilediğiniz zaman kapatabilirsiniz.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
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
 * Metin "dilediğiniz zaman kapatabilirsiniz" diyor; bu cümlenin doğru olması
 * için bildirimi yeniden açan bir giriş noktası gerekiyor. O nokta gizlilik
 * politikasının 13. bölümü — ziyaretçi oraya her sayfanın footer'ındaki
 * Gizlilik Politikası bağlantısından ulaşıyor. Politika sayfası bir server
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
