import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="px-4 pt-12 pb-16 sm:px-6 sm:pt-20 sm:pb-24">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-primary-fixed-dim bg-primary-fixed px-3 py-1.5 text-[13px] text-on-primary-fixed">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
            Servis noktaları için mobil uygulama
          </p>

          <h1 className="mt-6 text-[32px] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[44px]">
            Doğru müşteri, doğru zamanda servis noktanızda
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted sm:text-lg">
            Her talep, daha en baştan doğru bilgiyle gelir: müşterinin ne
            istediği, görüşmeye ne kadar hazır olduğu ve ne zaman aranacağı
            bellidir.
          </p>

        </div>

        <div className="lg:pl-6">
          {/* `priority`: sayfanın en büyük görseli ve ekranın üst kısmında —
              tembel yüklenirse LCP ölçümü gecikir. */}
          <Image
            src="/images/hero.webp"
            alt="Yeni Müşterim uygulamasının özet ekranı: günün talep ve randevu sayıları ile haftalık performans"
            width={1125}
            height={2250}
            priority
            sizes="(min-width: 1024px) 300px, (min-width: 640px) 280px, 70vw"
            className="mx-auto h-auto w-full max-w-[300px]"
          />
        </div>
      </div>
    </section>
  );
}
