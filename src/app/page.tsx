import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { Features } from "@/components/Features";
import { Appointments } from "@/components/Appointments";
import { TeamLocations } from "@/components/TeamLocations";
import { ComingSoon } from "@/components/ComingSoon";
import { Contact } from "@/components/Contact";
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
        <TeamLocations />
        <ComingSoon />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
