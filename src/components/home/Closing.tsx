import Link from "next/link";
import { Section } from "@/components/Section";

/**
 * Kapanış. Form yok: bu projede backend de form uç noktası da yok, sessizce
 * düşen bir form ise adresten kötüdür. Birincil düğme iletişim sayfasına
 * (/iletisim), ikincisi servis noktası uygulamasına (/app) gidiyor.
 */
export function Closing() {
  return (
    <Section id="sonraki-adim" className="border-t border-outline-variant">
      <div className="rounded-lg border border-outline-variant bg-surface-lowest p-7 sm:p-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3 text-sm text-primary">
            Birlikte kurgulayalım
          </p>
          <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-ink sm:text-3xl">
            Kendi satış ağınızda nasıl çalışacağını görün
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-muted sm:text-lg">
            Kısa bir görüşmede mevcut akışınızı dinleriz, size özel senaryoyu birlikte kurgularız ve kısa sürede devreye alırız.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
            >
              Demo talep edin
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
            <Link
              href="/app"
              className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
            >
              Servis noktası uygulamasını inceleyin
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
