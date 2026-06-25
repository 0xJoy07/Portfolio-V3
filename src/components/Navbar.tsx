import Link from "next/link";

import { Button } from "./ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-50">
      <div className="flex items-center justify-between px-6 py-4 bg-background/80 backdrop-blur-md border border-border shadow-sm rounded-full">
        {/* Logo / Brand */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          JS<span className="text-primary">.</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
          <Link href="#projects" className="text-muted-foreground hover:text-foreground transition-colors">Projects</Link>
          <Link href="#experience" className="text-muted-foreground hover:text-foreground transition-colors">Experience</Link>
          <Link href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Button variant="default" className="rounded-full px-6">
            Let's Talk
          </Button>
        </div>
      </div>
    </nav>
  );
}
