import Image from "next/image";
import { site } from "@/lib/site";
/*
 * Rozetler mağazaların kendi marka paketlerinden geliyor: Google'ın "Get it on
 * Google Play" dosyası (Turkish / color) olduğu gibi, Apple'ın "Download on the
 * App Store" dosyası ise (US-UK / Black lockup) yalnızca üst satırı Türkçeleşmiş
 * hâliyle. Gövde, elma, kenarlık, köşe yarıçapı ve iki satırın punto/konumu
 * Apple'ın dosyasından; üst satırdaki "Download on the" glifleri, aynı paketin
 * Türkçe dosyasındaki "İndirin" glifleriyle değiştirildi ve o satırın kendi
 * yerine taşındı. Tek elle ayar, bu satırın baseline hizasından 2,8 birim
 * (rozet yüksekliğinin %7'si) yukarı alınması: "İndirin" İngilizce metinden
 * kısa ve yüksek olduğu için iki satır arası dar kalıyordu.
 *
 * Paketin Türkçe dosyası doğrudan kullanılmadı: orada dizilim ters — büyük "App
 * Store'dan" üstte, küçük "İndirin" altta — ve yanındaki Google rozetiyle hizası
 * kaçıyor.
 */
import appStoreBadge from "@/assets/store-badge-app-store-tr.svg";
import googlePlayBadge from "@/assets/store-badge-google-play-tr.svg";

/**
 * İki mağaza rozeti yan yana. Hem /app hero'sunda (bkz. Hero.tsx) hem de
 * sayfanın indirme bölümünde (bkz. StoreLinks.tsx) aynı bileşen duruyor;
 * rozetin boyu, adresi ve basılıp basılmayacağı tek yerde tanımlı olsun.
 *
 * Hizayı `className` belirliyor: hero'da metin kolonuyla birlikte sola dayalı,
 * indirme bölümünde ortalanmış.
 */
export function StoreBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      <StoreBadge
        href={site.stores.appStore}
        src={appStoreBadge}
        alt="App Store'dan indirin"
      />
      <StoreBadge
        href={site.stores.googlePlay}
        src={googlePlayBadge}
        alt="Google Play'den indirin"
      />
    </div>
  );
}

/**
 * Adresi olmayan mağazanın rozeti hiç basılmaz. Linksiz rozet göstermek hem
 * ziyaretçiyi boşa çıkarır hem de rozet kurallarına aykırı (bkz. site.stores).
 *
 * İki rozet de 48px yüksekliğinde (`h-12`); genişlik dosyaların kendi oranından
 * geliyor. `unoptimized`: Next'in görsel iyileştiricisi SVG'yi varsayılan olarak
 * işlemez, bayrak olmadan istek 400 döner.
 */
function StoreBadge({
  href,
  src,
  alt,
}: {
  href?: string;
  src: React.ComponentProps<typeof Image>["src"];
  alt: string;
}) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="transition-opacity hover:opacity-80"
    >
      <Image src={src} alt={alt} unoptimized className="h-12 w-auto" />
      <span className="sr-only">— yeni sekmede açılır</span>
    </a>
  );
}
