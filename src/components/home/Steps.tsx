import { Section, SectionHeading } from "@/components/Section";

/**
 * Üç aşama, CLAUDE.md'nin "Değer önerisi" bölümündeki sırayla: konuşma ve izin
 * → eşleştirme ve aktarım → takip ve ölçüm. Buradaki her madde platformun bugün
 * yaptığı bir işi anlatıyor; yol haritası maddesi yok.
 */
const steps = [
  {
    title: "Konuşma, niteleme ve izin",
    points: [
      "Ziyaretçi bir formla karşılaşmaz; sitenizdeki konuşmada ne aradığını anlatır.",
      "İhtiyaç ve satın alma niyeti, önceden kurulmuş konuşma akışlarında netleşir.",
      "Veri servis noktasıyla paylaşılmadan önce KVKK uyumlu iletişim izni alınır.",
    ],
  },
  {
    title: "Eşleştirme ve aktarım",
    points: [
      "Talep konum, uzmanlık ve müsaitliğe göre doğru servis noktasına eşleştirilir.",
      "Atama il, ilçe ve marka kurallarıyla yapılır; kimse elle dağıtmaz.",
      "Servis noktasına bildirim gider; arama ya da WhatsApp uygulama içinden tek dokunuşla başlar.",
      "Numara uygulamada gizli durur; görüntülendiğinde bu kayda geçer.",
    ],
  },
  {
    title: "Takip ve ölçüm",
    points: [
      "Görüşme sonucu işaretlenir: randevu verildi, fiyat verildi, ulaşılamadı, yanlış numara, stok yok.",
      "Ulaşılamadıysa görev kapanmaz; ertesi gün aynı saate ötelenir ve ikinci deneme de kayda geçer.",
      "Arama saati kaçırılırsa talep sıradaki servis noktasına geçer.",
      "Her talebin hangi servis noktasına gittiği ve son durumu markanın dashboard'unda görünür.",
    ],
  },
];

export function Steps() {
  return (
    <Section id="nasil-calisir" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Nasıl çalışır"
        title="Sitenizdeki konuşmadan merkez ekibinizin okuduğu rapora kadar üç aşama"
        lead="Sıra önemli. Talebi bir yere göndermek yeterli değil: ihtiyacı netleşmiş ve izni alınmış talep, onu arayacak servis noktasına gider — ve o aramanın yapılıp yapılmadığı ölçülür."
      />

      <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant lg:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="bg-surface-lowest p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white tabular-nums">
                {index + 1}
              </span>
              <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-ink">
                {step.title}
              </h3>
            </div>

            <ul className="mt-4 space-y-2.5">
              {step.points.map((point) => (
                <li key={point} className="flex gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    className="mt-[5px] size-3.5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  <span className="text-[15px] leading-6 text-ink-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
