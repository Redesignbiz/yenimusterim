import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

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
import heroBg from "@/assets/Hero_BG.webp";
import { LeadCards } from "./LeadCards";

export function Hero() {
  /*
   * Hero ekranın tamamını kaplıyor: `100svh` eksi header (globals.css,
   * `--header-h`). Bu bir alt sınır — içerik sığmazsa section uzar, kesilmez.
   *
   * `svh` bilinçli: `dvh` mobilde adres çubuğu gizlenip görünürken hero'nun
   * yüksekliğini oynatıyor ve sayfa kaydırmada zıplıyor. `svh` en küçük
   * viewport'u baz aldığı için taşma da olmuyor.
   */
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden border-b border-outline-variant px-4 pt-12 pb-14 sm:px-6 sm:pt-20 sm:pb-20"
    >
      {/*
        Arka plan yalnızca hero'yu kaplıyor: `relative` + `fill` ikilisi katmanı
        section'ın sınırlarına bağlıyor, `overflow-hidden` de kırpılan tarafın
        alt bölümlere sızmasını engelliyor.

        Görsel 3548×1774 (2:1), hero ise ekran oranını takip ediyor; bu yüzden
        `cover` ile ölçekleniyor. Hero her zaman görselden daha dar oranlı
        olduğu için kırpma yatayda oluyor: `object-right` desenin yoğun tarafını
        sağda tutuyor, kırpılan sol kenar da görselin boş tarafı.

        `priority`: ana sayfanın en büyük görseli bu — tembel yüklenirse LCP
        ölçümü gecikir.
      */}
      <Image
        src={heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right"
      />

      {/*
        Ekran yüksekliği içerikten fazla olduğunda artan boşluğun nereye
        gideceği belirli olsun diye dikey eksen flex'e bırakıldı: ana blok
        (`flex-1` + `content-center`) kalan alanı alıp içeriğini ortalıyor,
        metrik şeridi de kendiliğinden alta oturuyor. `content-center`
        olmadan grid satırları gerilip aralarında ölçüsüz boşluk açılıyor.
      */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
        <div className="grid flex-1 content-center items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <p className="eyebrow inline-flex items-start gap-2 rounded-full border border-primary-fixed-dim bg-primary-fixed px-3.5 py-1.5 text-[13px] text-on-primary-fixed">
              <span
                className="mt-[7px] size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              Servis noktası ağıyla satış yapan markalar için
            </p>

            <h1 className="mt-6 text-[32px] font-bold leading-[1.1] tracking-[-0.035em] text-ink sm:text-[46px]">
              Potansiyel Müşterilerinizi Yetkili Servis Noktalarıyla Buluşturun.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {site.name}, web sitenizden ve çağrı merkezinden gelen ziyaretçilerin ihtiyaç ve satın alma niyetlerini belirler, potansiyel müşterileri yetkili servis noktalarına anında ulaştırır; talepler satışa dönüşene kadar takip eder.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/iletisim"
                className="rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
              >
                Bize ulaşın
              </Link>
              <Link
                href="/app"
                className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
              >
                Mobil uygulamayı görün
              </Link>
            </div>
          </div>

          {/* Sağ kolon görsel değil, işaretlemeyle çizildi (bkz. LeadCards.tsx). */}
          <div className="lg:pl-4">
            <LeadCards />
          </div>
        </div>

        {/*
          Burada rakamlar yalnızca hatırlatma. Aynı dördü kanıt bölümünde tam
          etiketiyle ve nefes alacak yerde duruyor; iki yerde de tam boyda
          tekrarlanması dolgu gibi okunuyor.
        */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-outline-variant pt-7 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-3">
          {site.metrics.map((metric) => (
            // Telefonda alt alta: yan yana dizildiğinde etiket rakamın altına
            // taşıyor ve şerit tırtıklı okunuyor.
            <p
              key={metric.short}
              className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2"
            >
              <span className="text-[19px] font-bold tracking-[-0.02em] text-primary tabular-nums">
                {metric.value}
              </span>
              <span className="text-[14px] text-ink-muted">{metric.short}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
