import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
/* Static import — gerekçesi home/Hero.tsx'in başında. */
import heroScreen from "@/assets/hero.webp";

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

          {/*
            Birincil düğme kayıt başvurusu (/app/kayit): hero'yu okuyan servis
            noktasının çoğunun henüz hesabı yok, indirme tek başına işine
            yaramıyor. İndirme bağlantısı ikincil ve yalnızca adresi tanımlı
            mağaza için basılıyor (bkz. site.stores, StoreLinks.tsx).
          */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/app/kayit"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
            >
              Kayıt olun
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>

            {site.stores.googlePlay && (
              <a
                href={site.stores.googlePlay}
                target="_blank"
                rel="noopener"
                className="rounded-full border border-outline-variant bg-surface-lowest px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:bg-surface-low"
              >
                Google Play&apos;den indirin
              </a>
            )}
          </div>
        </div>

        <div className="lg:pl-6">
          {/* `priority`: sayfanın en büyük görseli ve ekranın üst kısmında —
              tembel yüklenirse LCP ölçümü gecikir. */}
          <Image
            src={heroScreen}
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
