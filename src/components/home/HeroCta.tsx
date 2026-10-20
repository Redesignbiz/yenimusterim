import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Hero hikâyesinin bittiği çağrı (Mosey hero'sunun kapanış kartından
 * uyarlandı). Üçüncü sahne bitince hikâyenin olduğu yere, ortaya gelir:
 * soru, tek cümle ve iki eylem.
 *
 * `clock` hikâyenin bu sahne için kullandığı görünmez saat; süresi dolunca
 * hikâye başa döner. İmleç kartın üstündeyken ya da odak içindeyken saat
 * durur; düğmeye uzanan kimse onu elinden kaçırmaz.
 *
 * Birincil düğme iletişim sayfasına, ikincisi servis noktası uygulamasına
 * gidiyor; sitenin geri kalanındaki çağrılarla aynı iki hedef.
 */
export function HeroCta({ clock }: { clock: ReactNode }) {
  return (
    <div className="story-cta relative w-full max-w-[40rem] rounded-lg border border-outline-variant bg-surface-lowest p-6 text-center sm:p-8 lg:p-12">
      {clock}
      <h2 className="text-[24px] font-bold leading-[1.15] tracking-[-0.025em] text-balance text-ink sm:text-[30px]">
        Ziyaretçilerinizi servis noktası müşterisine dönüştürmeye hazır mısınız?
      </h2>
      <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-ink-muted">
        Yeni Müşterim&apos;in sitenizdeki her ziyaretçinin ihtiyacını nasıl
        netleştirdiğini ve talebi satışı tamamlayabilecek servis noktasına
        nasıl ilettiğini görün.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
  );
}
