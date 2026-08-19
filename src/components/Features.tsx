import { Section, SectionHeading } from "./Section";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

/**
 * Uygulamanın İÇİNDE ne yapıldığı. Talebin nereden geldiği `Journey`'de
 * anlatılıyor — burada tekrar edilmiyor.
 *
 * Hepsi uygulamada gerçekten var olan davranışlar; pazarlama vaadi değil.
 */
const features: Feature[] = [
  {
    title: "Uygulama üzerinden arama",
    body: "Telefon numarası ekranda maskeli görüntülenir, arama işlemiyle birlikte açılır. Telefon uygulamasına ve WhatsApp'a geçiş uygulama içinden yapılır.",
    icon: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
      </>
    ),
  },
  {
    title: "Görüşme sonucunun kaydı",
    body: "Randevu verildi, fiyat verildi, ulaşılamadı, stok yok gibi sonuçlar görüşmenin ardından tek ekrandan seçilir.",
    icon: (
      <>
        <path d="M9 11l3 3 8-8" />
        <path d="M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h9" />
      </>
    ),
  },
  {
    title: "Otomatik yeniden arama",
    body: "Ulaşılamadı sonucu kaydedildiğinde görev kapanmaz; ertesi gün aynı saate otomatik olarak ertelenir. Görev, ikinci denemenin ardından kapatılır.",
    icon: (
      <>
        <path d="M3 12a9 9 0 1 0 3-6.7" />
        <path d="M3 4v5h5" />
      </>
    ),
  },
  {
    title: "Gecikmiş talebin devri",
    body: "Zamanında arama penceresinin kapanmasından 120 dakika sonra talep, sıradaki servis noktasına devredilir. Devir işlemi kayıt altına alınır.",
    icon: (
      <>
        <path d="M4 7h13l-3-3" />
        <path d="M20 17H7l3 3" />
      </>
    ),
  },
  {
    title: "Kişisel veri koruması",
    body: "Telefon numarası varsayılan olarak maskelidir; numaranın tamamına erişim kayıt altına alınır. Açık rızası alınmamış veri servis noktasına iletilmez.",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Performans takibi",
    body: "Tamamlanma oranı, zamanında arama oranı ve dönüşüm oranı uygulamanın özet ekranından izlenir.",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15v-4M12 15V7M17 15v-6" />
      </>
    ),
  },
];

export function Features() {
  return (
    <Section id="ozellikler" className="border-t border-outline-variant">
      <SectionHeading
        eyebrow="Uygulama yetenekleri"
        title="Günlük operasyonun tamamı tek uygulamada"
        lead="Talep listesi, arama, sonuç kaydı ve performans takibi tek arayüzde toplanır; ayrı bir sistem veya kayıt defteri gerekmez."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="bg-surface-lowest p-6">
            <span className="flex size-9 items-center justify-center rounded-DEFAULT bg-primary-fixed">
              <svg
                viewBox="0 0 24 24"
                className="size-[18px] text-primary"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {feature.icon}
              </svg>
            </span>
            <h3 className="mt-4 text-[17px] font-semibold tracking-[-0.01em] text-ink">
              {feature.title}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-muted">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
