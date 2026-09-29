import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { StoreBadges } from "@/components/StoreBadges";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import appIcon from "@/assets/app-icon.svg";

/**
 * Mağaza bölümü. Bileşen eskiden `ComingSoon` adıyla duruyordu; uygulama iki
 * mağazada da yayına girdiği için bölümün işi artık "yakında" duyurusu değil,
 * indirme adresini vermek.
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

          {/* Kayıt düğmesi rozetlerin üstünde: bölümün metni hesabın önce
              tanımlanması gerektiğini söylüyor, başvuru da bu yüzden ilk adım.
              Rozetler hemen altında, hesabı hazır olan servis noktası için. */}
          <div className="mt-8">
            <Link
              href="/app/kayit"
              className="inline-flex items-center gap-2 rounded-full bg-primary-fixed px-6 py-3 text-[15px] font-semibold text-on-primary-fixed transition-colors hover:bg-primary-fixed-dim"
            >
              Servis noktası ağına katılın
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

          <StoreBadges className="mt-10 justify-center" />
        </div>
      </div>
    </section>
  );
}
