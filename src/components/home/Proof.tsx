import Image from "next/image";
import { site } from "@/lib/site";
import { LOWER_STREET, STREETS } from "@/lib/streets";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import cover from "@/assets/case-study/bridgestone-cover.webp";
import logo from "@/assets/case-study/bridgestone-logo.svg";
import { MapBackdrop } from "./MapBackdrop";

/**
 * Sayfanın lacivert (`primary-deep`) bölümü. Referans işi ve yayımlanmış
 * dört rakamı taşıdığı için görsel kesintiyi hak ediyor. Laciverdin üstünde
 * kapanış kutusuyla aynı sokak haritası dokusu var; yukarıda temiz,
 * rakamların altına doğru belirginleşiyor.
 *
 * Kapak, Redesign Business'ın portfolyosundaki Bridgestone kartının kapağı;
 * kapağın tamamı vaka çalışmasına gidiyor. Rakamlar altta, tek satırda.
 *
 * Burada geçen her rakam `site.metrics` içindeki dörtten biri — yani Redesign
 * Business'ın vaka çalışmasında zaten yayımlanmış olanlar. Açıklamadaki iki
 * rakam da oradan okunuyor.
 */

/** Alt yatay sokak, tam genişlikte, kendi yüksekliğine kırpılmış. */
function StreetStrip({ className }: { className: string }) {
  return (
    <svg
      viewBox="-10 300 980 62"
      className={`pointer-events-none absolute left-1/2 -z-10 w-screen max-w-none -translate-x-1/2 ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d={STREETS.paths[LOWER_STREET]}
        className="stroke-on-deep-line"
        strokeWidth="1.65"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Proof() {
  const study = site.caseStudy;
  const [conversion, response] = site.metrics;

  return (
    <section id="sonuclar" className="relative isolate overflow-hidden bg-primary-deep">
      <MapBackdrop className="proof-backdrop" grid={false} omit={[LOWER_STREET]} />

      {/* Section.tsx ile aynı ölçü: dolgu dışta, max-w-5xl içte. */}
      <div className="px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/*
            Kapak, portfolyoda göründüğü gibi: müşterinin logosu sol üstte,
            fotoğrafın her yerinde okunsun diye hafif bir karartmanın üstünde.
          */}
          <a
            href={study.href}
            className="group relative block aspect-[1000/760] overflow-hidden rounded-md border border-on-deep-line"
          >
            <Image
              src={cover}
              alt={`${study.client} için kurulan servis noktası platformunun yönetim paneli ve mobil uygulaması`}
              fill
              sizes="(min-width: 1024px) 34rem, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            />
            <span
              className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent"
              aria-hidden
            />
            {/* `unoptimized`: iyileştirici SVG'yi işlemiyor (bkz. Logo.tsx). */}
            <Image
              src={logo}
              alt={study.client}
              unoptimized
              className="absolute top-5 left-5 h-6 w-auto sm:top-6 sm:left-6 sm:h-8"
            />
          </a>

          <div>
            <h2 className="text-[26px] font-bold leading-[1.15] tracking-[-0.025em] text-balance text-on-deep sm:text-[32px]">
              Daha Hızlı Servis Noktası Geri Dönüşü, Daha Yüksek Satış
            </h2>
            {/* "%32'ye" eki rakama bağlı; rakam değişirse ek de kontrol edilir. */}
            <p className="mt-6 text-[16px] leading-[1.65] text-on-deep-muted sm:text-[17px]">
              {study.client}, servis noktası ağı için kurulan bu platformla web
              sitesinde oluşan ilgiyi satışa taşıdı: talepten satışa dönüşüm
              oranı {conversion.value}&apos;ye ulaştı, servis noktaları dijital
              taleplere {response.value} daha hızlı yanıt vermeye başladı.
            </p>

            <a
              href={study.href}
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-on-deep/40 px-6 py-3 text-[15px] font-semibold text-on-deep transition-colors hover:border-on-deep hover:bg-on-deep/10"
            >
              Detayları inceleyin
              <svg
                viewBox="0 0 24 24"
                className="size-4 transition-transform group-hover:translate-x-1"
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
        </div>

        {/*
          Bölümün arkasındaki ızgara bu satırdan kesiliyor: çizgileri satırın
          üst çizgisine, sol kenarına ve rakamlar arasındaki her ayraca denk
          geliyor (globals.css, `.proof-grid`). Alt yatay sokak arka plandan
          çıkarılıp bu satırın hemen üstüne ve altına konuyor; rakamların
          arasından geçmiyor.

          Telefonda iki sütun, `lg`'den itibaren tek satırda dört; kenarlık
          sınıflarının sıraya göre hesaplanmasının sebebi bu.
        */}
        <div className="@container relative mt-10 sm:mt-12">
          <div className="proof-grid" aria-hidden />
          <StreetStrip className="bottom-[calc(100%+0.75rem)]" />
          <StreetStrip className="top-[calc(100%+0.75rem)]" />
          <dl className="grid grid-cols-2 border-t border-on-deep-line lg:grid-cols-4">
            {site.metrics.map((metric, index) => (
              <div
                key={metric.label}
                className={[
                  "border-on-deep-line py-6",
                  index % 2 === 1 && "border-l pl-5",
                  index >= 2 && "border-t lg:border-t-0",
                  index % 2 === 0 && "pr-5",
                  index === 2 && "lg:border-l lg:pl-5",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <dt className="text-[26px] font-bold leading-none tracking-[-0.02em] text-on-deep tabular-nums sm:text-[30px]">
                  {metric.value}
                </dt>
                <dd className="mt-3 text-[13px] leading-5 text-on-deep-muted">
                  {metric.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      </div>
    </section>
  );
}
