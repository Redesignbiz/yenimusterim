import { Section, SectionHeading } from "@/components/Section";

/**
 * Çerçeve CLAUDE.md'nin "Değer önerisi" bölümünden geliyor: trafiğin parası
 * ödenmiş, kayıp ziyaretçi siteye girdikten sonra başlıyor. Üç kart bu kaybın
 * üç biçimi — ziyaretçi tarafı, marka tarafı, ölçüm tarafı.
 */
const failures = [
  {
    title: "Ziyaretçi kendi başına kalıyor",
    body: "Aradığı ürünü sitede bulur; o ürünü kimin takacağını ya da hangi servis noktasında bulacağını bulamaz. Karşısına çıkan tek şey bir iletişim formudur.",
  },
  {
    title: "Form kaydının sahibi olmuyor",
    body: "Kayıt ortak bir gelen kutusuna e-posta olarak gelir. Kimin arayacağı ve hangi talebin hâlâ açık olduğu belli değildir; yanıt süresi günlerle ölçülür.",
  },
  {
    title: "Aktarımdan sonrası görünmüyor",
    body: "Pazarlama kaç talep ürettiğini gösterebilir. Servis noktasının o talebe ne yaptığını kimse gösteremez; tartışma her seferinde burada tıkanır.",
  },
];

export function Problem() {
  return (
    <Section id="sorun">
      <SectionHeading
        eyebrow="Bugünkü durum"
        title="Ziyaretçi karar vermeye hazır geliyor, ürünü nereden alacağını bulamadan çıkıyor."
        lead="Takılması ya da montajı gereken bir ürün sepetten satın alınamaz; o satışı servis noktası yapar. Ziyaretçiyi siteye getirmenin parası çoktan ödenmiştir, ama sitede onu servis noktasına ulaştıran bir şey yoktur. Karar vermeye hazır gelen kişi ya eski bir iletişim formuna yönlendirilir ya da kendi başına servis noktası aramaya bırakılır."
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
