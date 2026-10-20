import Image from "next/image";
import { Highlight, Section, SectionHeading } from "@/components/Section";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import appliances from "@/assets/industries/appliances.webp";
import batteries from "@/assets/industries/batteries.webp";
import hvac from "@/assets/industries/hvac.webp";
import insurance from "@/assets/industries/insurance.webp";
import kitchenBath from "@/assets/industries/kitchen-bath.webp";
import tires from "@/assets/industries/tires.webp";

/**
 * Her kart kategorinin yatay bir fotoğrafıyla açılıyor, kartın tam
 * genişliğinde; altı kart bir bakışta altı farklı satın alma türü olarak
 * okunuyor. Fotoğrafların kaynağı docs/gorseller.md'de.
 */
const industries = [
  {
    name: "Lastik ve oto servis",
    photo: tires,
    detail: "Ebat uyumu, stok ve randevu",
  },
  {
    name: "İklimlendirme",
    photo: hvac,
    detail: "Yerinde keşif ve montaj",
  },
  {
    name: "Mutfak ve banyo",
    photo: kitchenBath,
    detail: "Ölçü, seçim ve montaj",
  },
  {
    name: "Sigorta ve acente ağları",
    photo: insurance,
    detail: "Teklif ve yerel acente",
  },
  {
    name: "Akü ve enerji",
    photo: batteries,
    detail: "Uyumluluk ve acil servis",
  },
  {
    name: "Beyaz eşya ve yapı marketi",
    photo: appliances,
    detail: "Teslimat ve kurulum",
  },
];

export function Industries() {
  return (
    <Section id="sektorler" className="border-t border-outline-variant">
      <SectionHeading
        title={
          <>
            Servis ağıyla <Highlight>fark yarattığımız sektörler</Highlight>
          </>
        }
        lead="Karar sürecinde uzman görüşü, ölçü ya da yerinde hizmet gereken sektörlerde, satışı servis noktanız tamamlar."
      />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((industry) => (
          <li key={industry.name} className="group bg-surface-lowest">
            <div className="relative aspect-[2/1] overflow-hidden">
              <Image
                src={industry.photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 21rem, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-ink">
                {industry.name}
              </p>
              <p className="mt-1.5 text-[14px] text-ink-muted">
                {industry.detail}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
