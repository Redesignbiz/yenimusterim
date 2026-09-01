import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bize ulaşın",
  description:
    "Uygulama, kayıt başvurusu ve katılım koşulları hakkındaki sorular aşağıdaki kanallardan iletilebilir.",
  alternates: { canonical: "/iletisim" },
};

/**
 * İletişim bölümü landing'den (src/app/app/page.tsx) çıkarılıp buraya taşındı.
 * İçerik `Contact` bileşeninin kendisi; sayfa yalnızca çerçeveyi kuruyor.
 */
export default function Iletisim() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </>
  );
}
