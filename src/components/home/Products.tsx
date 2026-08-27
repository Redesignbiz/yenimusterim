import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";

/**
 * Üç parça, CLAUDE.md'nin "Ürün ne" bölümündeki sırayla: chatbot, servis
 * noktası uygulaması, marka dashboard'u. Her kart farklı bir tarafa ait —
 * ziyaretçi, saha, merkez — ve ikinci kart kendi sayfasına (/app) gidiyor.
 */
const products = [
  {
    audience: "Sitenizdeki ziyaretçi",
    title: "Web sitenizde çalışan chatbot",
    points: [
      "Ziyaretçinin ne aradığını soran hazır konuşma akışları",
      "İhtiyaç ve satın alma niyeti konuşma içinde netleşir",
      "Veri paylaşılmadan önce KVKK uyumlu iletişim izni",
      "Form doldurma zorunluluğu yok",
    ],
    icon: (
      <>
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5H9l-4 3v-4.2A7.5 7.5 0 0 1 9 4.5h3.5A7.5 7.5 0 0 1 20 11.5Z" />
      </>
    ),
    href: null,
  },
  {
    audience: "Servis noktası ağınız",
    title: "Servis noktası için mobil uygulama",
    points: [
      "Günün talepleri tek listede",
      "Yeni talep düştüğünde bildirim",
      "Uygulama içinden tek dokunuşla arama veya WhatsApp",
      "Görüşme sonucu tek dokunuşla işaretlenir",
    ],
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="2.5" />
        <path d="M11 18.5h2" />
      </>
    ),
    href: "/app",
  },
  {
    audience: "Merkez ekibiniz",
    title: "Marka için dashboard",
    points: [
      "Talep hacmi ve dönüşüm hunisi",
      "Her servis noktasının yanıt süresi ve dönüşümü",
      "Bölge ve kanal kırılımı",
      "Hangi kanalın gerçekten talep getirdiğini gösteren rapor",
    ],
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15v-4M12 15V7M17 15v-6" />
      </>
    ),
    href: null,
  },
];

export function Products() {
  return (
    <Section id="platform" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Platform"
        title="Bir konuşma, bir mobil uygulama, bir dashboard"
        lead="Üçü aynı sistemin parçası. Ziyaretçiyle konuşan taraf, onu arayan taraf ve sonucu ölçen taraf aynı veriye bakıyor; bir talebin ne zaman geldiği ve sonunda ne olduğu tek yerde görünüyor."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.title}
            className="flex flex-col bg-surface-lowest p-6 sm:p-7"
          >
            <span className="flex size-10 items-center justify-center rounded-DEFAULT bg-primary-fixed">
              <svg
                viewBox="0 0 24 24"
                className="size-5 text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {product.icon}
              </svg>
            </span>

            <p className="eyebrow mt-5 text-[13px] text-outline">
              {product.audience}
            </p>
            <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.015em] text-ink">
              {product.title}
            </h3>

            <ul className="mt-4 space-y-2 border-t border-outline-variant pt-4">
              {product.points.map((point) => (
                <li key={point} className="text-[14px] leading-6 text-ink-muted">
                  {point}
                </li>
              ))}
            </ul>

            {product.href && (
              <Link
                href={product.href}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-primary transition-colors hover:text-primary-bright"
              >
                Mobil uygulamaya bakın
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
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
