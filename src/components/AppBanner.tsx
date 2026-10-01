"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import appIcon from "@/assets/app-icon.svg";

const KAPATILDI_ANAHTARI = "app-banner-kapatildi";

/* Değer ilk okumadan sonra değişmiyor; abonelik boş. */
const abone = () => () => {};
const sunucuda = () => null;

function platformOku(): "ios" | "android" | null {
  try {
    if (localStorage.getItem(KAPATILDI_ANAHTARI)) {
      return null;
    }
  } catch {
    /* Gizli sekmede okuma hata atıyor; banner yine de çıksın. */
  }

  const ua = navigator.userAgent;

  if (/iPhone|iPad|iPod/.test(ua)) {
    return "ios";
  }

  if (/Android/.test(ua)) {
    return "android";
  }

  return null;
}

/**
 * Telefondan gelen ziyaretçiye uygulamayı kurma çağrısı. iOS Safari'nin kendi
 * Smart App Banner'ı Chrome ve uygulama içi tarayıcılarda çıkmadığı için banner
 * sayfanın kendisinde duruyor.
 *
 * Yalnızca telefonda çıkıyor: platform iOS ya da Android değilse hiçbir şey
 * basılmıyor, `sm:hidden` de geniş ekranı dışarıda bırakıyor. Masaüstü ziyaretçi
 * indirme bölümündeki iki rozeti görüyor.
 *
 * Platform `useSyncExternalStore` ile okunuyor: değer yalnızca tarayıcıda belli
 * olduğu için sunucu anlık görüntüsü `null`, hidrasyon da bu yüzden uyuşuyor.
 */
export function AppBanner() {
  const platform = useSyncExternalStore(abone, platformOku, sunucuda);
  const [kapandi, setKapandi] = useState(false);

  const adres = platform === "ios" ? site.stores.appStore : site.stores.googlePlay;

  if (kapandi || !platform || !adres) {
    return null;
  }

  function kapat() {
    setKapandi(true);
    try {
      localStorage.setItem(KAPATILDI_ANAHTARI, "1");
    } catch {
      /* Kapatma bu oturumda yine de geçerli, yalnızca hatırlanmıyor. */
    }
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-outline-variant bg-surface-lowest pb-[env(safe-area-inset-bottom)] sm:hidden">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={kapat}
          aria-label="Kapat"
          className="-m-1 shrink-0 p-1 text-outline transition-colors hover:text-ink"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            aria-hidden
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <Image
          src={appIcon}
          alt=""
          width={44}
          height={44}
          unoptimized
          className="size-11 shrink-0 rounded-[10px]"
        />

        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-semibold text-ink">{site.name}</p>
          <p className="truncate text-[12px] text-ink-muted">
            Servis noktası uygulaması
          </p>
        </div>

        <a
          href={adres}
          target="_blank"
          rel="noopener"
          className="shrink-0 rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-white"
        >
          İndirin
        </a>
      </div>
    </div>
  );
}
