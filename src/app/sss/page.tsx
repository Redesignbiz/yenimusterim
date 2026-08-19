import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sık Sorulan Sorular",
  description: `${site.name} uygulamasına erişim, cihaz desteği, bildirimler ve müşteri verisinin korunmasıyla ilgili sık sorulan sorular.`,
  alternates: { canonical: "/sss" },
};

const faqs = [
  {
    q: "Uygulamaya nasıl erişilir?",
    a: `${site.name} yakında App Store ve Google Play'de yayınlanacaktır. Uygulamada kayıt adımı bulunmamaktadır; hesaplar merkez tarafından tanımlanır ve giriş bilgileri servis noktasına iletilir.`,
  },
  {
    q: "Uygulama için ücret alınıyor mu?",
    a: "Servis noktaları için ek bir ücret alınmamaktadır. Uygulama, servis noktasının dâhil olduğu program kapsamında sunulur.",
  },
  {
    q: "Hangi cihazlarda kullanılabilir?",
    a: "Güncel Android ve iOS sürümlerine sahip telefonlarda kullanılabilir. Tablet için ayrı bir sürüm bulunmamaktadır; arayüz telefon ekranı için tasarlanmıştır.",
  },
  {
    q: "Bildirim iletilmediğinde talep kaybolur mu?",
    a: "Hayır. Talep listesi bildirimden bağımsız çalışır; uygulama açıldığında günün talepleri ve aranması gereken müşteriler her durumda görüntülenir. Bildirim yalnızca hatırlatma amaçlıdır.",
  },
  {
    q: "Müşteri telefon numaralarına kimler erişebilir?",
    a: "Yalnızca talebin atandığı servis noktasının kullanıcıları erişebilir. Numara ekranda maskeli görüntülenir ve tam numaraya erişim kayıt altına alınır. Başka bir servis noktasına devredilen talebin numarasına erişim kalıcı olarak kapatılır.",
  },
  {
    q: "Uygulamaya fiyat veya stok bilgisi giriliyor mu?",
    a: "Hayır. Fiyat bilgisi müşteriyle telefon görüşmesinde paylaşılır. Uygulamaya yalnızca görüşmenin sonucu ve randevu verilmesi hâlinde randevu saati kaydedilir.",
  },
];

export default function Faq() {
  return (
    <>
      <Header />

      <main className="flex-1 px-4 py-14 sm:px-6 sm:py-20">
        <article className="mx-auto w-full max-w-3xl">
          <p className="eyebrow text-sm text-primary">Destek</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
            Sık sorulan sorular
          </h1>
          <p className="mt-5 text-[16px] leading-7 text-ink-muted">
            Uygulamaya erişim, cihaz desteği, bildirimler ve müşteri verisinin
            korunmasıyla ilgili en sık iletilen sorular.
          </p>

          <div className="mt-10 divide-y divide-outline-variant overflow-hidden rounded-lg border border-outline-variant bg-surface-lowest">
            {faqs.map((faq) => (
              <details key={faq.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-[16px] font-semibold text-ink transition-colors hover:bg-surface-low">
                  {faq.q}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 shrink-0 text-outline transition-transform group-open:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    aria-hidden
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <p className="px-5 pb-5 text-[15px] leading-6 text-ink-muted">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-outline-variant bg-surface-low p-6">
            <h2 className="text-[17px] font-semibold text-ink">
              Yanıtı burada olmayan sorular
            </h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-muted">
              Aşağıdaki destek adresine iletilebilir.
            </p>
            <a
              href={`mailto:${site.contact.support}`}
              className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-primary-bright"
            >
              {site.contact.support}
            </a>
          </div>

          <div className="mt-16 border-t border-outline-variant pt-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink-muted transition-colors hover:text-ink"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ana sayfaya dön
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
