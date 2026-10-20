import { Highlight, Section, SectionHeading } from "@/components/Section";
import { RouteLine, type RouteStep } from "./RouteLine";
import { BrowserIcon, ChartIcon, ChatIcon, StoreIcon } from "./StageIcons";

/**
 * Dört adım, talebin gerçekte izlediği sırayla: ziyaretçi siteye gelir,
 * ihtiyacı netleşir ve izni alınır, servis noktasıyla eşleşip aktarılır,
 * sonucu takip edilir ve ölçülür. Son üçü CLAUDE.md'nin "Değer önerisi"
 * bölümündeki üç aşama; ilki onların üzerine kurulduğu giriş. Buradaki her
 * madde platformun bugün yaptığı bir işi anlatıyor; yol haritası maddesi yok.
 */
const steps: RouteStep[] = [
  {
    title: "Ziyaretçiyi sitenizde karşılayın",
    icon: <BrowserIcon className="size-full" />,
    points: [
      "Chatbot mevcut web sitenize tek satırlık bir kodla eklenir; yeni bir sayfa ya da altyapı değişikliği gerekmez.",
    ],
  },
  {
    title: "İhtiyacı anlayın, izni alın",
    icon: <ChatIcon className="size-full" />,
    points: [
      "Ziyaretçinin ihtiyacı ve satın alma niyeti, önceden kurgulanmış dinamik konuşma akışlarında netleşir.",
      "Bilgiler servis noktasıyla paylaşılmadan önce KVKK uyumlu iletişim izni alınır.",
    ],
  },
  {
    title: "Eşleştirin ve aktarın",
    icon: <StoreIcon className="size-full" />,
    points: [
      "Talep konum, uzmanlık ve müsaitliğe göre en uygun servis noktasıyla eşleştirilir ve müşteriye geri dönüş süresi kısalır.",
    ],
  },
  {
    title: "Takip edin ve ölçün",
    icon: <ChartIcon className="size-full" />,
    points: [
      "Her talebin hangi servis noktasına gittiği ve son durumu görünür.",
      "Huninin işleyişi ve servis noktalarının performansı raporlanır; satın alma niyeti taşıyan hiçbir talep kayıtsız kalmaz.",
    ],
  },
];

export function Steps() {
  return (
    <Section id="nasil-calisir" className="border-t border-outline-variant">
      <SectionHeading
        title={
          <>
            İhtiyacı <Highlight>Anla, Eşleştir ve Takip Et.</Highlight>
          </>
        }
        lead="Her talep önce doğru sorularla netleşir, en uygun servis noktasına yönlendirilir ve sonuçlanana kadar takip edilir."
      />

      <div className="mt-12">
        <RouteLine steps={steps} />
      </div>
    </Section>
  );
}
