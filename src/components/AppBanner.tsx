"use client";

import Image from "next/image";
import { useSyncExternalStore } from "react";
import { site } from "@/lib/site";
import appIcon from "@/assets/app-icon.svg";

const KAPATILDI_ANAHTARI = "app-banner-kapatildi";

let kapandi = false;
const dinleyiciler = new Set<() => void>();

function abone(yenile: () => void): () => void {
  dinleyiciler.add(yenile);
  return () => {
    dinleyiciler.delete(yenile);
  };
}

function sunucuda(): null {
  return null;
}

function platformOku(): "ios" | "android" | null {
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

function kapat(): void {
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
 * olduğu için sunucu anlık görüntüsü `null` ve hidrasyon bu sayede uyuşuyor.
 *
 * Konum layout'taki alt kaptan geliyor (bkz. layout.tsx), bileşen kendini
 * sabitlemiyor.
 */
export function AppBanner() {
  const platform = useSyncExternalStore(abone, platformOku, sunucuda);

  if (!platform) {
    return null;
  }

  const adres =
    platform === "ios" ? site.stores.appStore : site.stores.googlePlay;

  return (
    <div className="pointer-events-auto border-t border-outline-variant bg-surface-lowest sm:hidden">
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
          <p className="truncate text-[14px] font-semibold text-ink">
            {site.name}
          </p>
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
