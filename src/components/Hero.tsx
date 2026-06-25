"use client";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);
import Link from "next/link";
import { MeshGradientSVG } from "./ui/shader-svg";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-between px-8 md:px-16 overflow-hidden pt-24">
      {/* Background radial gradient to give a subtle glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      {/* Left side: Name & Title */}
      <div className="flex flex-col z-10 max-w-xl">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
          Joy Sengupta
        </h1>
        <div className="flex flex-col gap-2 text-xl md:text-2xl text-muted-foreground font-medium">
          <span>Full Stack Web Developer</span>
          <span className="text-primary/80">Vibe Coder</span>
          <span>AI Explorer</span>
        </div>
      </div>

      {/* Center: Mesh Gradient SVG Component */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
        <MeshGradientSVG />
      </div>

      {/* Right side: Social Links */}
      <div className="flex flex-col gap-6 z-10 items-end">
        <Link
          href="https://github.com/joysengupta"
          target="_blank"
          className="group flex flex-col items-center gap-2 p-3 rounded-full hover:bg-secondary transition-all"
        >
          <GithubIcon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
        
        <Link
          href="https://linkedin.com/in/joysengupta"
          target="_blank"
          className="group flex flex-col items-center gap-2 p-3 rounded-full hover:bg-secondary transition-all"
        >
          <LinkedinIcon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </Link>
      </div>

      {/* Mobile view Mesh Gradient (if screen is small) */}
      <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-0 opacity-50">
        <div className="scale-75">
          <MeshGradientSVG />
        </div>
      </div>
    </section>
  );
}
