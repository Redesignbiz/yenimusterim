import { Section, SectionHeading } from "./Section";

/**
 * Talebin bayiye ulaşana kadarki yolu — bayinin bakış açısından.
 *
 * Akış LeadHanger platform konseptinden alındı (nitelendirme → rıza → akıllı
 * eşleştirme → aktarım), ama anlatı bayiye dönük: "senin ekranına düşene kadar
 * ne oluyor ve bu neden senin işine yarıyor".
 */
const steps = [
  {
    title: "Talep nitelendirilir ve rıza alınır",
    points: [
      "Ziyaretçi, bağlama göre yapılandırılmış bir görüşme akışıyla karşılanır.",
      "İhtiyacı ve satın alma niyeti görüşme sırasında belirlenir.",
      "Bilgileri paylaşılmadan önce KVKK uyumlu açık rızası alınır.",
      "Statik iletişim formu yerine, talebi netleştiren yapılandırılmış bir görüşme uygulanır.",
    ],
    visual: "chat",
  },
  {
    title: "Talep servis noktasına yönlendirilir",
    points: [
      "Konum, uzmanlık alanı ve müsaitlik bilgisine göre eşleştirme yapılır.",
      "Aktarım gecikmesiz gerçekleşir; müşteri yönlendirme için beklemez.",
      "Talep, uygulamadaki talep listesine bildirimle iletilir.",
    ],
    visual: "notification",
  },
  {
    title: "Görüşme planlanan saatte gerçekleştirilir",
    points: [
      "Her talep, tanımlı bir arama saatiyle talep listesine düşer.",
      "Belirlenen saatte bildirim iletilir; arama uygulama üzerinden başlatılır.",
      "Görüşme sonucu kaydedilir ve talebin durumu izlenebilir hâle gelir.",
    ],
    visual: "call",
  },
] as const;

function Visual({ kind }: { kind: "chat" | "notification" | "call" }) {
  if (kind === "chat") {
    return (
      <div className="flex h-44 flex-col justify-center gap-2 rounded-md border border-outline-variant bg-surface-low p-4">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-muted">
          <span className="size-1.5 rounded-full bg-green-600" aria-hidden />
          Çevrimiçi
        </span>
        <p className="max-w-[80%] rounded-lg rounded-bl-sm bg-surface-lowest px-3 py-2 text-[12px] leading-4 text-ink">
          Size nasıl yardımcı olabilirim?
        </p>
        <p className="ml-auto max-w-[80%] rounded-lg rounded-br-sm bg-primary px-3 py-2 text-[12px] leading-4 text-white">
          Fiyatlara bakıyorum
        </p>
        <p className="max-w-[85%] rounded-lg rounded-bl-sm bg-surface-lowest px-3 py-2 text-[12px] leading-4 text-ink">
          Aracınız için gereken lastik ölçüsünü biliyor musunuz?
        </p>
      </div>
    );
  }

  if (kind === "notification") {
    return (
      <div className="flex h-44 items-center justify-center rounded-md border border-outline-variant bg-surface-low p-4">
        <div className="w-full rounded-md bg-primary p-3.5">
          <div className="flex items-start gap-2.5">
            <svg
              viewBox="0 0 24 24"
              className="mt-0.5 size-4 shrink-0 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <div>
              <p className="text-[12px] font-semibold text-white">
                Yeni müşteri talebi
              </p>
              <p className="mt-0.5 text-[11px] leading-4 text-white/80">
                Sarıyer bölgesinden yeni bir servis talebiniz var.
              </p>
              <span className="mt-2.5 inline-block rounded-sm bg-white px-2.5 py-1 text-[10px] font-bold text-primary">
                Talebi görüntüle
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-44 flex-col items-center justify-center gap-1.5 rounded-md border border-outline-variant bg-surface-low p-4">
      <span
        className="flex size-11 items-center justify-center rounded-full bg-surface-container text-[14px] font-bold text-ink-muted"
        aria-hidden
      >
        AY
      </span>
      <p className="mt-1 text-[11px] text-ink-muted">Şimdi aranmalı</p>
      <p className="text-[15px] font-bold tracking-[-0.01em] text-ink">
        Ahmet Y.
      </p>
      <span
        className="mt-1.5 flex size-9 items-center justify-center rounded-full bg-green-600"
        aria-hidden
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
        </svg>
      </span>
    </div>
  );
}

export function Journey() {
  return (
    <Section id="nasil-calisir" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Süreç"
        title="Talebin servis noktasına ulaşma süreci"
        lead="Müşteri talebi, servis noktasına iletilmeden önce üç aşamadan geçer. Uygulamaya yalnızca ihtiyacı belirlenmiş ve veri paylaşımına onay vermiş talepler iletilir."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="rounded-lg border border-outline-variant bg-surface-lowest p-5"
          >
            <Visual kind={step.visual} />

            <div className="mt-5 flex items-center gap-2.5">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-[12px] font-bold text-white tabular-nums">
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
                    className="mt-1 size-3.5 shrink-0 text-primary"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                  <span className="text-[14px] leading-5 text-ink-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </Section>
  );
}
