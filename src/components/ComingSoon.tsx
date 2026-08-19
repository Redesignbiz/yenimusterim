import Image from "next/image";
import { site } from "@/lib/site";

/**
 * Mağaza rozetleri BİLİNÇLİ olarak link değil.
 *
 * Uygulama henüz hiçbir mağazada yayında değil; tıklanabilir bir rozet kullanıcıyı
 * boş bir arama sonucuna götürür. Rozetler `div` olarak duruyor — sonradan
 * yayına çıkınca `a` yapılacak.
 */
export function ComingSoon() {
  return (
    <section id="yakinda" className="border-t border-outline-variant px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto w-full max-w-5xl">
        <div className="rounded-xl border border-outline-variant bg-inverse-surface px-6 py-12 text-center sm:px-12 sm:py-16">
          {/* `unoptimized`: Next'in görsel iyileştiricisi SVG'yi varsayılan olarak
              işlemez; bayrak olmadan istek 400 döner. */}
          <Image
            src="/images/app-icon.svg"
            alt="Yeni Müşterim uygulama simgesi"
            width={96}
            height={96}
            unoptimized
            className="mx-auto mb-8 size-20 sm:size-24"
          />

          <p className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[13px] text-inverse-ink">
            <span className="size-1.5 rounded-full bg-primary-fixed-dim" aria-hidden />
            Yakında yayında
          </p>

          <h2 className="mx-auto mt-6 max-w-2xl text-2xl font-bold leading-tight tracking-[-0.02em] text-inverse-ink sm:text-4xl">
            {site.name} yakında App Store ve Google Play&apos;de yayınlanacak
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-inverse-ink/75">
            Uygulama yayına alındığında servis noktalarına giriş bilgileri
            iletilecektir. Uygulamada kayıt adımı bulunmamaktadır; hesaplar
            merkez tarafından tanımlanır.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <StoreBadge
              store="App Store"
              prefix="Yakında"
              icon={
                <path d="M16.4 12.7c0-2.4 2-3.6 2.1-3.6-1.1-1.7-2.9-1.9-3.6-1.9-1.5-.2-3 .9-3.7.9s-2-.9-3.2-.9c-1.7 0-3.2 1-4 2.5-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.3 1.3-2.6 1.3-2.7 0 0-2.4-.9-2.4-3.6ZM14 5.6c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4Z" />
              }
            />
            <StoreBadge
              store="Google Play"
              prefix="Yakında"
              icon={
                <path d="M3.6 2.3c-.3.3-.5.8-.5 1.4v16.6c0 .6.2 1.1.5 1.4l.1.1 9.3-9.3v-.2L3.6 2.3Zm12.5 6.2L4.8 2.1l8.4 8.4 2.9-2Zm3.5 2c.7.4 1.1.9 1.1 1.5s-.4 1.1-1 1.5l-2.5 1.4-3.1-2.9 3.1-3.1 2.4 1.6ZM4.8 21.9l11.3-6.4-2.9-2.9-8.4 9.3Z" />
              }
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function StoreBadge({
  store,
  prefix,
  icon,
}: {
  store: string;
  prefix: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 rounded-DEFAULT border border-white/20 bg-white/5 px-5 py-3">
      <svg
        viewBox="0 0 24 24"
        className="size-6 text-inverse-ink/60"
        fill="currentColor"
        aria-hidden
      >
        {icon}
      </svg>
      <span className="text-left leading-tight">
        <span className="block text-[11px] text-inverse-ink/55">{prefix}</span>
        <span className="block text-[15px] font-semibold text-inverse-ink/80">
          {store}
        </span>
      </span>
    </div>
  );
}
