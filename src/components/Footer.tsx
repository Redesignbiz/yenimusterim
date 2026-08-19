import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-outline-variant bg-surface-low">
      <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Logo className="h-7 w-auto" />
            <p className="mt-3 max-w-xs text-[14px] leading-5 text-ink-muted">
              {site.tagline}
            </p>
          </div>

          <nav className="flex flex-col gap-3 sm:items-end">
            <Link
              href="/sss"
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Sık sorulan sorular
            </Link>
            <Link
              href="/gizlilik"
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/hesap-silme"
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              Hesap silme
            </Link>
            <a
              href={`mailto:${site.contact.support}`}
              className="text-[14px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              {site.contact.support}
            </a>
          </nav>
        </div>

        <p className="mt-10 border-t border-outline-variant pt-6 text-[13px] text-outline">
          © {new Date().getFullYear()} {site.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
}
