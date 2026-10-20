import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/home/Hero";
import { Problem } from "@/components/home/Problem";
import { Steps } from "@/components/home/Steps";
import { Products } from "@/components/home/Products";
import { Proof } from "@/components/home/Proof";
import { Industries } from "@/components/home/Industries";
import { Closing } from "@/components/home/Closing";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

/**
 * Ana sayfa markaya, /app servis noktasına anlatıyor. Bu yüzden başlık
 * layout.tsx'teki varsayılanı (uygulama odaklı `site.tagline`) kullanmıyor;
 * `absolute` ile kendi başlığını veriyor. /app varsayılanı kullanmaya devam eder.
 */
export const metadata: Metadata = {
  title: {
    absolute: `${site.name} — Servis noktası ağı için talep yönetimi ve dağıtımı`,
  },
  description:
    "Sitenizdeki konuşmada ziyaretçinin ihtiyacı netleşir, KVKK uyumlu iletişim izni alınır ve talep doğru servis noktasına eşleştirilir. Web sitenizde chatbot, servis noktası için mobil uygulama, merkez ekibiniz için dashboard.",
  alternates: { canonical: "/" },
};

/**
 * Bölüm sırası özellik listesini değil alıcının sorusunu izliyor: ürün ne
 * yapıyor (Hero — animasyonlu hikâye), nerede kopuyor (Problem), onun yerine
 * ne oluyor (Steps — dört adım), ekosistemin parçaları ne (Products —
 * chatbot, uygulama, dashboard), çalıştığının kanıtı ne (Proof), bana uygun
 * mu (Industries), sonra istek (Closing).
 *
 * Hero, Problem, Steps, Proof, Industries ve Closing'in tasarımı LeadHanger
 * landing'inden uyarlandı; ikisi aynı ürünü iki dilde anlatıyor.
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Problem />
        <Steps />
        <Products />
        <Proof />
        <Industries />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
