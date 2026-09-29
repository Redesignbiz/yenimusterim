import { Section, SectionHeading } from "@/components/Section";

/**
 * Üç aşama, CLAUDE.md'nin "Değer önerisi" bölümündeki sırayla: konuşma ve izin
 * → eşleştirme ve aktarım → takip ve ölçüm. Buradaki her madde platformun bugün
 * yaptığı bir işi anlatıyor; yol haritası maddesi yok.
 */
const steps = [
  {
    title: "İhtiyacı anla",
    points: [
      "Web sitenize entegre chatbot, doğru sorularla ziyaretçinin ihtiyacını ve satın alma niyetini anlar.",
    ],
  },
  {
    title: "Eşleştir",
    points: [
      "Yapay zeka destekli algoritma, talebi konum, uzmanlık ve müsaitliğe göre en uygun servis noktasına yönlendirir.",
    ],
  },
  {
    title: "Takip et",
    points: [
      "Talebin son durumu uygulama üzerinden anlık izlenir, sonuçlar raporlanır. Hiçbir talep kayıtsız kalmaz.",
    ],
  },
];

export function Steps() {
  return (
    <Section id="nasil-calisir" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Nasıl çalışır"
        title="Üç adımda: İhtiyacı Anla, Eşleştir ve Takip Et."
        lead="Her talep önce doğru sorularla netleşir, en uygun servis noktasına yönlendirilir ve sonuçlanana kadar takip edilir."
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
