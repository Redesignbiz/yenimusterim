import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

/**
 * Header her sayfada render ediliyor, bu yüzden site içi bağlantılar MUTLAK yol
 * kullanır: logo ana sayfaya ("/"), iletişim düğmesi "/iletisim" sayfasına.
 * Giriş düğmesi ayrı bir alan adına gittiği için `Link` değil düz `a`.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link href="/" className="shrink-0">
          <Logo className="h-6 w-auto sm:h-7" />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Telefonda gizli: logoyla giriş düğmesinin yanına sığmıyor. */}
          <Link
            href="/iletisim"
            className="hidden shrink-0 rounded-full border border-outline-variant bg-surface-lowest px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-surface-low sm:inline-flex sm:px-5"
          >
            Bize ulaşın
          </Link>

          <a
            href={site.appUrl}
            className="shrink-0 whitespace-nowrap rounded-full bg-primary px-3 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-primary-bright sm:px-5 sm:text-sm"
          >
            Servis noktası girişi
          </a>
        </div>
      </div>
    </header>
  );
}
