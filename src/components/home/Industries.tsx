import { Section, SectionHeading } from "@/components/Section";

const industries = [
  {
    name: "Lastik ve oto servis",
    detail: "Ebat uyumu, stok ve randevu",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5.2" />
        <circle cx="12" cy="12" r="1.5" />
        <path d="M12 10.5V6.8M13.43 11.54l3.52-1.15M12.88 13.21l2.18 3M11.12 13.21l-2.18 3M10.57 11.54l-3.52-1.15" />
      </>
    ),
  },
  {
    name: "İklimlendirme",
    detail: "Yerinde keşif ve montaj",
    icon: (
      <>
        <rect x="3" y="5" width="18" height="8" rx="2" />
        <path d="M7 9.5h10" />
        <path d="M8 17v3M12 16v4M16 17v3" />
      </>
    ),
  },
  {
    name: "Mutfak ve banyo",
    detail: "Ölçü, seçim ve montaj",
    icon: (
      <>
        <path d="M3 11.5h18" />
        <path d="M5 11.5v4a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4v-4" />
        <path d="M12 11.5V7a3 3 0 0 1 3-3h1" />
      </>
    ),
  },
  {
    name: "Sigorta ve acente ağları",
    detail: "Teklif ve yerel acente",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    name: "Akü ve enerji",
    detail: "Uyumluluk ve acil servis",
    icon: (
      <>
        <rect x="2" y="7" width="16" height="10" rx="2.5" />
        <path d="M21 10.5v3" />
        <path d="m11 9.5-2 3.5h3l-2 3.5" />
      </>
    ),
  },
  {
    name: "Beyaz eşya ve yapı marketi",
    detail: "Teslimat ve kurulum",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2.5" />
        <path d="M4 8h16" />
        <circle cx="12" cy="14.5" r="3.5" />
      </>
    ),
  },
];

export function Industries() {
  return (
    <Section id="sektorler" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Nerede işe yarar"
        title="Sepetten satın alınamayan ürünler için"
        lead="Karar vermenin araştırma, uzman görüşü veya fiziksel hizmet gerektirdiği ürünlerde satış çoğu zaman web sitesinde tamamlanmaz. Ziyaretçi doğru ürünü bulmak, stok durumunu öğrenmek, fiyat almak ya da randevu oluşturmak için bir servis noktasıyla görüşmek ister. Yeni Müşterim bu ilgiyi kaybolmadan yakalar ve müşteriyi satın almaya en yakın noktaya taşır."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name} className="bg-surface-lowest p-6">
            <svg
              viewBox="0 0 24 24"
              className="size-7 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              {industry.icon}
            </svg>

            <p className="mt-4 text-[16px] font-semibold tracking-[-0.01em] text-ink">
              {industry.name}
            </p>
            <p className="mt-1.5 text-[14px] text-ink-muted">
              {industry.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-[15px] leading-6 text-ink-muted">
        Satış web sitesinde tamamlanmıyorsa, kritik olan müşterinin ilgisini
        doğru anda doğru servis noktasına aktarabilmektir. Yeni Müşterim,
        online ilgiyi gerçek satış fırsatına dönüştürür.
      </p>
    </Section>
  );
}
