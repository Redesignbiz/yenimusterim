import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Sağ kolon görsel değil, işaretlemeyle çizildi.
 *
 * Marka tarafının (dashboard) ekran görüntüsü bu depoda yok; temsilî bir mockup
 * ürünün ne yaptığını bu karttan daha az anlatırdı. Kart tek bir şeyi gösteriyor:
 * izni alınmış, ihtiyacı netleşmiş bir talebin dakikalar içinde belirli bir
 * servis noktasına ulaşması. Gerçek bir dashboard görüntüsü çıktığında yerini alabilir
 * (bkz. docs/gorseller.md).
 *
 * Karttaki değerler temsilî. Servis noktasının adı bilinçli olarak tarif edici:
 * gerçek bir işletme adı yazmak, olmayan bir referansı ima eder.
 */
function LeadCard() {
  const fields = [
    { label: "İhtiyaç", value: "4 × 205/55R16, yazlık" },
    { label: "Araç", value: "2019 binek" },
    { label: "Bölge", value: "Kadıköy, İstanbul" },
    { label: "Alım zamanı", value: "Bu hafta içinde" },
  ];

  return (
    <div className="rounded-lg border border-outline-variant bg-surface-lowest p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-bold text-ink">Gelen talep</span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-fixed px-2.5 py-1 text-[11px] font-bold text-on-accent-fixed">
          <svg
            viewBox="0 0 24 24"
            className="size-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="m5 12 5 5L20 7" />
          </svg>
          İzin alındı
        </span>
      </div>

      <dl className="mt-4 space-y-2.5">
        {fields.map((field) => (
          <div key={field.label} className="flex items-baseline gap-3">
            <dt className="w-24 shrink-0 text-[12px] text-outline">
              {field.label}
            </dt>
            <dd className="text-[13px] font-medium text-ink">{field.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 border-t border-outline-variant pt-4">
        {/* Türkçede `uppercase` yok — etiket ağırlık ve harf aralığıyla ayrışıyor
            (bkz. globals.css, `.eyebrow`). */}
        <p className="eyebrow text-[11px] text-outline">Yönlendirildi</p>
        <div className="mt-2.5 flex items-center gap-3">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-DEFAULT bg-primary text-[12px] font-bold text-white"
            aria-hidden
          >
            KD
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">
              Kadıköy lastik ve oto servis noktası
            </p>
            <p className="text-[12px] text-ink-muted">
              2,1 km · konum ve ebat uyumuna göre
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Bildirim gitti</span>
            <span className="font-semibold text-ink tabular-nums">12:04</span>
          </div>
          <div className="flex items-center justify-between gap-3 text-[12px]">
            <span className="text-ink-muted">Servis noktası aradı</span>
            <span className="font-semibold text-accent tabular-nums">12:08</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="border-b border-outline-variant px-4 pt-12 pb-14 sm:px-6 sm:pt-20 sm:pb-20"
    >
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="eyebrow inline-flex items-start gap-2 rounded-full border border-primary-fixed-dim bg-primary-fixed px-3.5 py-1.5 text-[13px] text-on-primary-fixed">
              <span
                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              Servis noktası ağıyla satış yapan markalar için
            </p>

            <h1 className="mt-6 text-[32px] font-bold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[46px]">
              Potansiyel Müşterileri Doğru Servis Noktasıyla Buluşturun.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {site.name}, web sitesi ve mobil uygulama üzerinden potansiyel müşteri taleplerini yöneten; ihtiyaç ve satın alma niyetini belirleyerek müşterileri en uygun servis noktasıyla buluşturan bir satış çözümüdür.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/iletisim"
                className="rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
              >
                Bize ulaşın
              </Link>
              <Link
                href="/app"
                className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
              >
                Mobil uygulamayı görün
              </Link>
            </div>
          </div>

          <div className="lg:pl-4">
            <LeadCard />
          </div>
        </div>

        {/*
          Burada rakamlar yalnızca hatırlatma. Aynı dördü kanıt bölümünde tam
          etiketiyle ve nefes alacak yerde duruyor; iki yerde de tam boyda
          tekrarlanması dolgu gibi okunuyor.
        */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-outline-variant pt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          {site.metrics.map((metric) => (
            // Telefonda alt alta: yan yana dizildiğinde etiket rakamın altına
            // taşıyor ve şerit tırtıklı okunuyor.
            <p
              key={metric.short}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2"
            >
              <span className="text-[19px] font-bold tracking-[-0.02em] text-primary tabular-nums">
                {metric.value}
              </span>
              <span className="text-[14px] text-ink-muted">{metric.short}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
