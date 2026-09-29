import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Features } from "@/components/Features";
import { Appointments } from "@/components/Appointments";
import { StoreLinks } from "@/components/StoreLinks";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Features />
        <Appointments />
        <StoreLinks />
      </main>
      <Footer />
    </>
  );
}
