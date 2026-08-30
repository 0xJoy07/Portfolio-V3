import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

// Below-fold sections — code-split so they don't bloat the initial JS bundle.
// ssr:false is not allowed in Server Components (Next.js 16+), so we omit it.
// These are all "use client" components and will hydrate normally on the client.
const About = dynamic(() => import("@/components/About").then(m => ({ default: m.About })));
const TechArsenal = dynamic(() => import("@/components/TechArsenal").then(m => ({ default: m.TechArsenal })));
const Experience = dynamic(() => import("@/components/Experience").then(m => ({ default: m.Experience })));
const Achievements = dynamic(() => import("@/components/Achievements").then(m => ({ default: m.Achievements })));
const Projects = dynamic(() => import("@/components/Projects").then(m => ({ default: m.Projects })));
const Contact = dynamic(() => import("@/components/Contact").then(m => ({ default: m.Contact })));
const SiteFooter = dynamic(() => import("@/components/Footer").then(m => ({ default: m.SiteFooter })));

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
