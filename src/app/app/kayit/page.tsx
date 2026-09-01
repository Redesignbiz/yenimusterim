import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Section, SectionHeading } from "@/components/Section";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  /* Sekmede "Servis noktası ağına katılın · Yeni Müşterim" olarak çıkıyor:
     marka adı layout'taki şablondan geliyor (bkz. layout.tsx `title.template`),
     buraya ikinci kez yazılmıyor. */
  title: "Servis noktası ağına katılın",
  description:
    "Başvuru formunu servis noktanıza ait bilgilerle doldurun. Başvuru değerlendirildikten sonra sizinle iletişime geçeceğiz.",
  alternates: { canonical: "/app/kayit" },
};

/**
 * Kayıt başvurusu sayfası. Hedef kitle /app sayfasıyla aynı: servis noktası
 * sahibi ve personeli.
 *
 * Uygulamanın kendi içinde kayıt adımı YOK; hesaplar merkez tarafından
 * tanımlanıyor (bkz. /gizlilik bölüm 7). Bu sayfa o gerçeği değiştirmiyor,
 * yalnızca başvurunun web üzerinden alınmasını sağlıyor — sayfa metni de kayıt
 * değil başvuru dili kullanıyor ki servis noktası formu doldurunca hesabının
 * anında açıldığını sanmasın.
 */
export default function Kayit() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Section>
          <SectionHeading
            as="h1"
            eyebrow="Kayıt formu"
            title="Yeni Müşterim servis noktası ağına katılın"
            lead={`Başvuru formunu servis noktanıza ait bilgilerle doldurun. Başvuru değerlendirildikten sonra sizinle iletişime geçeceğiz.`}
          />
          <div className="max-w-2xl">
            <SignupForm />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
