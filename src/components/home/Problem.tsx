import { Section, SectionHeading } from "@/components/Section";

/**
 * Çerçeve CLAUDE.md'nin "Değer önerisi" bölümünden geliyor: trafiğin parası
 * ödenmiş, kayıp ziyaretçi siteye girdikten sonra başlıyor. Üç kart bu kaybın
 * üç biçimi — ziyaretçi tarafı, marka tarafı, ölçüm tarafı.
 */
const failures = [
  {
    title: "Ziyaretçi kendi başına kalıyor",
    body: "Aradığı ürünü sitede bulur; o ürünün hangi servis noktasından bulabileceğini kendisi araştırmak zorunda kalır.",
  },
  {
    title: "Talebin gerçek sahibi olmuyor",
    body: "Müşterinin doldurduğu iletişim formu ortak bir gelen kutusuna düşer. Müşteriyi kimin ne zaman arayacağı belli değildir.",
  },
  {
    title: "Sonuç görünür değil",
    body: "Kaç talep geldiği, bunlardan kaçının satışa döndüğü hiçbir zaman bilinmiyor.",
  },
];

export function Problem() {
  return (
    <Section id="sorun">
      <SectionHeading
        eyebrow="Bugünkü durum"
        title="Ziyaretçiler web sitenize karar vermeye hazır geliyor, %95'i ürünü nereden alacağını bulamadan çıkıyor."
        lead="Montaj gerektiren ürünlerde satış sepette değil, servis noktasında tamamlanır. Müşteriyi web sitesine getirmek için yatırım yapılır; ancak satın alma niyeti oluştuğunda onu doğru servis noktasına taşıyan bağlantı çoğu zaman kopar. Karar vermeye hazır müşteri ya eski tip bir iletişim formuyla karşılaşır ya da uygun servis noktasını kendi başına aramak zorunda kalır."
      />

      <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-outline-variant bg-outline-variant lg:grid-cols-3">
        {failures.map((failure, index) => (
          <div key={failure.title} className="bg-surface-lowest p-6">
            <span
              className="text-[13px] font-bold text-outline tabular-nums"
              aria-hidden
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[17px] font-semibold tracking-[-0.01em] text-ink">
              {failure.title}
            </h3>
            <p className="mt-2 text-[15px] leading-6 text-ink-muted">
              {failure.body}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-8 border-l-2 border-primary pl-5 text-[17px] leading-7 font-medium text-ink sm:text-lg">
        Peşine düşen olmadığı için o ziyaretçi büyük olasılıkla bir rakiple
        konuşuyor — genellikle yerelde daha hızlı yanıt verenle.
      </p>
    </Section>
  );
}
