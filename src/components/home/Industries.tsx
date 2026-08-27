import { Section, SectionHeading } from "@/components/Section";

const industries = [
  { name: "Lastik ve oto servis", detail: "Ebat uyumu, stok ve randevu" },
  { name: "İklimlendirme", detail: "Yerinde keşif ve montaj" },
  { name: "Mutfak ve banyo", detail: "Ölçü, seçim ve montaj" },
  { name: "Sigorta ve acente ağları", detail: "Teklif ve yerel acente" },
  { name: "Akü ve enerji", detail: "Uyumluluk ve acil servis" },
  { name: "Beyaz eşya ve yapı marketi", detail: "Teslimat ve kurulum" },
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
            <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
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
