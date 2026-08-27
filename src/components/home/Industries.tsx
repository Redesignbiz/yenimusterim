import { Section, SectionHeading } from "@/components/Section";

/**
 * Belirleyici olan sektör değil, satın almanın biçimi: seyrek alınır, birileri
 * takar ya da kurar, kategoriyi bilmeyen biri araştırır. Bölüm bu çerçeveyle
 * açılıyor, sektörler arkasından geliyor.
 */
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
        lead="Beş on yılda bir alınan, bir profesyonelin takıp kurduğu, kategoriyi iyi bilmeyen birinin araştırdığı ürünler. Bu ziyaretçiler çoğunlukla form doldurmadan çıkar. Onları sayfada tutan şey konuşmak; satışı kapatan taraf ise servis noktası."
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
        Müşteriniz ürününüzü bir başkasının elinden alıyorsa, düzeltilmesi
        gereken yer o el değiştirme anıdır. Belirleyici olan sektör değil,
        ağın nasıl kurulduğu.
      </p>
    </Section>
  );
}
