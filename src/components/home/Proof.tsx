import { site } from "@/lib/site";

/**
 * Sayfadaki tek koyu bölüm. Referans işi taşıdığı için görsel kesintiyi hak
 * ediyor.
 *
 * Burada geçen her rakam `site.metrics` içindeki dörtten biri — yani Redesign
 * Business'ın vaka çalışmasında zaten yayımlanmış olanlar. Bu bölüme başka bir
 * rakam girmez.
 *
 * `inverse-ink-muted` diye bir token yok (bkz. globals.css); ComingSoon'daki
 * gibi opaklıkla çözülüyor.
 */
export function Proof() {
  return (
    <section
      id="sonuclar"
      className="bg-inverse-surface px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-3 text-sm text-primary-fixed-dim">Kanıt</p>
            <h2 className="text-2xl font-bold leading-tight tracking-[-0.02em] text-inverse-ink sm:text-3xl">
              Bir lastik üreticisinin servis noktası ağı için kuruldu
            </h2>
            <p className="mt-5 text-base leading-relaxed text-inverse-ink/75 sm:text-lg">
              {site.caseStudy.client} dijital kanallarda gerçek bir talep
              üretiyordu ve bu talebi servis noktasına aktarırken kaybediyordu;
              yanıt süresi günlerle ölçülüyordu. {site.name} bu boşluğu kapatmak
              için kuruldu. Ölçüm de ilk günden sistemin içindeydi:
              yönlendirilen ilk talepten itibaren hangi talebin satışa
              dönüştüğü görünüyordu.
            </p>
            <p className="mt-5 text-base leading-relaxed text-inverse-ink/75 sm:text-lg">
              Platform o ilk ağın ötesine geçti. Bugün otomotiv, tüketici
              ürünleri ve servis noktası ağıyla satış yapan başka sektörlerde de
              aynı işi yapıyor: dijital talebi sahadaki servis noktasına
              ulaştırmak ve orada ne olduğunu ölçmek.
            </p>

            <a
              href={site.caseStudy.href}
              className="mt-7 inline-flex items-center gap-2 text-[15px] font-semibold text-primary-fixed-dim underline underline-offset-4 transition-colors hover:text-inverse-ink"
            >
              {site.caseStudy.client} vaka çalışmasını okuyun
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
            </a>
          </div>

          <dl className="grid gap-px self-start overflow-hidden rounded-lg border border-white/15 bg-white/15 sm:grid-cols-2">
            {site.metrics.map((metric) => (
              <div key={metric.label} className="bg-inverse-surface p-6">
                <dt className="text-[32px] font-bold leading-none tracking-[-0.03em] text-inverse-ink tabular-nums">
                  {metric.value}
                </dt>
                <dd className="mt-2.5 text-[13px] leading-5 text-inverse-ink/70">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
