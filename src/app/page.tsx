import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { TechArsenal } from "@/components/TechArsenal";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { SiteFooter } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <About />
      <TechArsenal />
      <Experience />
      <Achievements />
      <Projects />
      <Contact />
      <SiteFooter />
    </main>
  );
}
