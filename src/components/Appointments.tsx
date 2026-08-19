import { Section, SectionHeading } from "./Section";

export function Appointments() {
  return (
    <Section id="randevular" className="border-t border-outline-variant">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Randevular"
            title="Günlük randevu planı"
            lead="Günün randevuları tek listede, saat sırasına göre görüntülenir."
          />

          <ul className="mt-8 space-y-4">
            {[
              "Müşteri, lastik ölçüsü ve adet bilgisi randevu satırında görünür.",
              "Geçmiş ve yaklaşan randevular ayrı ayrı listelenir.",
              "Hizmet tamamlandıktan sonra sonuç kaydedilir.",
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <svg
                  viewBox="0 0 24 24"
                  className="mt-1 size-4 shrink-0 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="m5 12 5 5L20 7" />
                </svg>
                <span className="text-[15px] leading-6 text-ink-muted">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Randevu listesinin küçük bir kesiti */}
        <div className="rounded-lg border border-outline-variant bg-surface-lowest p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-[17px] font-bold tracking-[-0.01em] text-ink">
              Bugün
            </h3>
            <span className="text-[13px] font-semibold text-ink-muted tabular-nums">
              4 randevu
            </span>
          </div>

          <div className="mt-4 space-y-2">
            {/* Tümü lastik randevusu — bakım ve yedek parça kapsam dışı.
                Rozet lastik tipini gösterir; hepsinde aynı olan bir "Lastik"
                etiketi hiçbir bilgi taşımazdı. */}
            {[
              {
                time: "09:30",
                name: "Kemal A.",
                detail: "195/65 R15 · 4 adet",
                tag: "Yazlık",
              },
              {
                time: "11:00",
                name: "Zeynep T.",
                detail: "205/55 R16 · 4 adet",
                tag: "Kışlık",
              },
              {
                time: "14:15",
                name: "Serkan B.",
                detail: "225/45 R17 · 2 adet",
                tag: "4 Mevsim",
              },
              {
                time: "16:45",
                name: "Ayşe M.",
                detail: "215/60 R16 · 4 adet",
                tag: "Kışlık",
              },
            ].map((row) => (
              <div
                key={row.time}
                className="flex items-center gap-3 rounded-md border border-outline-variant p-3"
              >
                <span className="w-11 shrink-0 text-[13px] font-bold text-ink tabular-nums">
                  {row.time}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-ink">
                    {row.name}
                  </p>
                  <p className="truncate text-[12px] leading-4 text-ink-muted">
                    {row.detail}
                  </p>
                </div>
                <span className="shrink-0 rounded-sm bg-surface-container px-2 py-0.5 text-[11px] font-semibold text-ink-muted">
                  {row.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
