import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import appIcon from "@/assets/app-icon.svg";

/**
 * Mağaza bölümü. Bileşen eskiden `ComingSoon` adıyla duruyordu; uygulama
 * 31 Ağustos 2026'da Google Play'de yayına girdiği için bölümün işi artık
 * "yakında" duyurusu değil, indirme adresini vermek.
 *
 * Rozetin link olup olmayacağını `site.stores` belirliyor: adresi olan mağaza
 * bağlantıya dönüşür, olmayan (bugün App Store) "yakında" etiketiyle `div`
 * olarak kalır. Böylece iOS sürümü yayına girdiğinde tek satır adres girmek
 * yetiyor.
 */
export function StoreLinks() {
  const playYayinda = Boolean(site.stores.googlePlay);
  const appStoreYayinda = Boolean(site.stores.appStore);

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
            {appStoreYayinda
              ? `${site.name} uygulamasını indirin`
              : `${site.name} uygulamasını indirin`}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-inverse-ink/75">
            Uygulamaya giriş, servis noktası hesabınız tanımlandıktan sonra
            yapılır. Kayıt olmak isteyen servis noktaları başvuru formunu
            doldurur; başvuru incelendikten sonra hesap merkez tarafından
            tanımlanır ve giriş bilgileri e-posta ile iletilir.
          </p>

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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              store="App Store"
              prefix={appStoreYayinda ? "İndirin" : "Yakında"}
              href={site.stores.appStore}
              icon={
                <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.2-.9c-1.7 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-.9-2.4-3.6ZM14 5.6c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4Z" />
              }
            />
            <StoreBadge
              store="Google Play"
              prefix={playYayinda ? "İndirin" : "Yakında"}
              href={site.stores.googlePlay}
              icon={
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.6 2.3Zm12.5 6.2L4.8 2.1l8.4 8.4 2.9-2Zm3.5 2c.7.4 1.1.9 1.1 1.5s-.4 1.1-1 1.5l-2.5 1.4-3.1-2.9 3.1-3.1 2.4 1.6ZM4.8 21.9l11.3-6.4-2.9-2.9-8.4 9.3Z" />
              }
            />
          </div>

        </div>
      </div>
    </section>
  );
}

/**
 * Adresi olan rozet `a`, olmayan `div` olarak basılır: yayında olmayan bir
 * mağazaya link vermek kullanıcıyı boş arama sonucuna götürür.
 */
function StoreBadge({
  store,
  prefix,
  href,
  icon,
}: {
  store: string;
  prefix: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const govde = (
    <>
      <svg
        viewBox="0 0 24 24"
        className="size-6 text-inverse-ink/60"
        fill="currentColor"
        aria-hidden
      >
        {icon}
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] text-inverse-ink/55">{prefix}</span>
        <span className="block text-[15px] font-semibold text-inverse-ink/80">
          {store}
        </span>
      </span>
    </>
  );

  const sinif =
    "flex items-center gap-3 rounded-DEFAULT border border-white/20 bg-white/5 px-5 py-3";

  if (!href) {
    return <div className={sinif}>{govde}</div>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={`${sinif} transition-colors hover:border-white/40 hover:bg-white/10`}
    >
      {govde}
      <span className="sr-only">— yeni sekmede açılır</span>
    </a>
  );
}
