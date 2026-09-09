import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import appIcon from "@/assets/app-icon.svg";
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
 * Mağaza bölümü. Bileşen eskiden `ComingSoon` adıyla duruyordu; uygulama iki
 * mağazada da yayına girdiği için bölümün işi artık "yakında" duyurusu değil,
 * indirme adresini vermek.
 *
 * Rozetin basılıp basılmayacağını `site.stores` belirliyor: adresi boş olan
 * mağazanın rozeti hiç render edilmez. Linksiz rozet göstermek hem ziyaretçiyi
 * boşa çıkarır hem de rozet kurallarına aykırı.
 */
export function StoreLinks() {
  return (
    <section id="indir" className="border-t border-outline-variant px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-xl border border-outline-variant bg-inverse-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* `unoptimized`: Next'in görsel iyileştiricisi SVG'yi varsayılan olarak
              işlemez; bayrak olmadan istek 400 döner. */}
          <Image
            src={appIcon}
            alt="Yeni Müşterim uygulama simgesi"
            width={96}
            height={96}
            unoptimized
            className="mx-auto mb-8 size-20 sm:size-24"
          />

          <h2 className="mx-auto max-w-2xl text-2xl font-bold leading-tight tracking-[-0.02em] text-inverse-ink sm:text-4xl">
            {site.name} uygulamasını indirin
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-inverse-ink/75">
            Uygulamaya giriş, servis noktası hesabınız tanımlandıktan sonra
            yapılır. Kayıt olmak isteyen servis noktaları başvuru formunu
            doldurur; başvuru incelendikten sonra hesap merkez tarafından
            tanımlanır ve giriş bilgileri e-posta ile iletilir.
          </p>

          {/* Rozetler kayıt düğmesinin ÜSTÜNDE: bölümün başlığı indirmeyi
              söylüyor, indirme adresi de hemen onun altında duruyor. Kayıt
              düğmesi hesabı olmayan servis noktası için ikinci adım. */}
          <div className="mt-8">
            <Link
              href="/app/kayit"
              className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-6 py-3 text-[15px] font-semibold text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim"
            >
              Kayıt olun
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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

        </div>
      </div>
    </section>
  );
}

/**
 * Adresi olmayan mağazanın rozeti hiç basılmaz.
 *
 * İki rozet de 48px yüksekliğinde (`h-12`); genişlik dosyaların kendi oranından
 * geliyor. `unoptimized` gerekçesi bölümün başındaki uygulama simgesiyle aynı:
 * Next'in görsel iyileştiricisi SVG'yi işlemez, bayrak olmadan istek 400 döner.
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
