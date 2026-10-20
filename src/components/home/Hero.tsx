/*
 * SİTEDEKİ GÖRSELLERİN KURALI — diğer bileşenler buraya atıf yapıyor.
 *
 * Görseller `src/assets/` altında durur ve `src="/images/..."` yerine static
 * import ile verilir. Sebep önbellek:
 *
 * `public/` altındaki bir dosyaya string yolla bakıldığında URL dosya değişse
 * de sabit kalıyor (`/_next/image?url=/images/Hero_BG.webp`) ve yanıt Next
 * 16'da 4 saat önbelleğe alınıyor — `minimumCacheTTL` varsayılanı 60 saniyeden
 * 4 saate çıktı (bkz. docs/01-app/02-guides/upgrading/version-16.md). Sonuç:
 * görsel aynı adla değiştirildiğinde ne localhost'ta ne de siteyi son 4 saatte
 * açmış ziyaretçide güncelleniyor. Logo'nun bir kez sessizce eski sürümde
 * kalması da bu sınıf bir sorundu (bkz. Logo.tsx).
 *
 * Static import dosya içeriğini hash'leyip URL'e koyuyor: dosya değiştiği an
 * URL de değişiyor. Dev'de HMR görseli kendiliğinden yeniliyor, yayında da
 * `immutable` önbellek kullanılabiliyor. Dosya adını değiştirmek gerekmiyor.
 *
 * `public/` yalnızca sabit URL'e mecbur olan şeyler için kalır.
 */
import { Highlight } from "@/components/Section";
import { HeroStory } from "./HeroStory";

/**
 * Hero hikâyenin kendisi (bkz. HeroStory.tsx). İddia üstte duruyor: solda
 * başlık, sağda açıklama; ilk ekran önce ürünün ne yaptığını söylüyor, sonra
 * gösteriyor. Ekranın altında bir sonraki bölüme inen bağlantı var.
 *
 * Zemin bir görsel değil, iki katman: yumuşak bir primary ışık ve içerik
 * genişliğinden kesilen ince bir ızgara (globals.css, `.measure-grid`).
 * Önceki arka plan görselinin ağ deseni hikâyenin sohbet balonlarının
 * arkasına denk geliyordu.
 */
export function Hero() {
  return (
    <section
      id="top"
      className="measure-grid @container relative isolate overflow-hidden border-b border-outline-variant"
    >
      <div
        className="hero-wash pointer-events-none absolute inset-x-0 top-0 -z-10 h-[48rem]"
        aria-hidden
      />
      <div className="ruled pointer-events-none absolute inset-0 -z-10" aria-hidden />

      {/* Section.tsx ile aynı ölçü: dolgu dışta, max-w-5xl içte. */}
      <div className="px-4 pt-8 pb-8 sm:px-6 sm:pt-12 sm:pb-10">
      <div className="mx-auto w-full max-w-5xl">
        {/*
          İlk ekran: iddia, hikâye ve ekranın altına sabitlenen bağlantı.
          Hikâye iddianın hemen altında duruyor; ekranda artan yükseklik onun
          altında toplanıyor, adımlara ve alt yazıya yer açıyor. Yükseklikten
          sticky header (`--header-h`) ve dikey dolgu düşülüyor.
        */}
        <div className="flex min-h-[calc(100svh-var(--header-h)-4rem)] flex-col sm:min-h-[calc(100svh-var(--header-h)-5.5rem)]">
          <div className="intro grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <h1 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-balance text-ink sm:text-[40px]">
              Potansiyel Müşterilerinizi{" "}
              <Highlight>Yetkili Servis Noktalarıyla</Highlight> Buluşturun.
            </h1>

            <p className="max-w-[21rem] text-[14px] leading-[1.6] text-ink-muted sm:text-[15px] lg:justify-self-end">
              Yeni Müşterim, web sitenizden ve çağrı merkezinden gelen
              ziyaretçilerin ihtiyacını belirler, potansiyel müşterileri uygun
              yetkili servis noktasına anında ulaştırır.
            </p>
          </div>

          <div className="flex flex-1 flex-col justify-start pt-6 sm:pt-8">
            <HeroStory />
          </div>

          <a
            href="#sorun"
            className="group mx-auto flex flex-col items-center gap-1.5 pt-8 pb-2 text-[13px] font-semibold text-ink-muted transition-colors hover:text-ink"
          >
            Devamını görün
            <svg
              viewBox="0 0 24 24"
              className="explore-bob size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </a>
        </div>
      </div>
      </div>
    </section>
  );
}
