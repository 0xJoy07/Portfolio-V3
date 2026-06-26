"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ClassValue, clsx } from "clsx";
import * as Color from "color-bits";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to convert any CSS color to rgba
export const getRGBA = (
  cssColor: React.CSSProperties["color"],
  fallback: string = "rgba(180, 180, 180)",
): string => {
  if (typeof window === "undefined") return fallback;
  if (!cssColor) return fallback;

  try {
    // Handle CSS variables
    if (typeof cssColor === "string" && cssColor.startsWith("var(")) {
      const element = document.createElement("div");
      element.style.color = cssColor;
      document.body.appendChild(element);
      const computedColor = window.getComputedStyle(element).color;
      document.body.removeChild(element);
      return Color.formatRGBA(Color.parse(computedColor));
    }

    return Color.formatRGBA(Color.parse(cssColor));
  } catch (e) {
    console.error("Color parsing failed:", e);
    return fallback;
  }
};

// Helper function to add opacity to an RGB color string
export const colorWithOpacity = (color: string, opacity: number): string => {
  if (!color.startsWith("rgb")) return color;
  return Color.formatRGBA(Color.alpha(Color.parse(color), opacity));
};

// Tremor Raw focusInput [v0.0.1]

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 focus:dark:ring-blue-700/30",
  // border color
  "focus:border-blue-500 focus:dark:border-blue-700",
];

// Tremor Raw focusRing [v0.0.1]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
];

// Tremor Raw hasErrorInput [v0.0.1]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
];

// ============================================================================
// Flickering Grid
// ============================================================================

interface FlickeringGridProps {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: React.CSSProperties["color"];
  maxOpacity?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
}

function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.3,
  color,
  maxOpacity = 0.3,
  width = "100%",
  height = "100%",
  className,
}: FlickeringGridProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  const memoizedColor = useMemo(() => {
    return getRGBA(color, "rgba(180, 180, 180)");
  }, [color]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setCanvasSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvasSize.width * dpr;
    canvas.height = canvasSize.height * dpr;
    ctx.scale(dpr, dpr);

    const cols = Math.ceil(canvasSize.width / (squareSize + gridGap)) + 1;
    const rows = Math.ceil(canvasSize.height / (squareSize + gridGap)) + 1;

    const squares = Array.from({ length: cols * rows }, () => Math.random() * maxOpacity);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const index = i * rows + j;
          if (Math.random() < flickerChance) {
            squares[index] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = colorWithOpacity(memoizedColor, squares[index]);
          ctx.fillRect(
            i * (squareSize + gridGap),
            j * (squareSize + gridGap),
            squareSize,
            squareSize,
          );
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [canvasSize, squareSize, gridGap, flickerChance, memoizedColor, maxOpacity]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      style={{ width, height }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: canvasSize.width,
          height: canvasSize.height,
        }}
      />
    </div>
  );
}

// ============================================================================
// Footer Types
// ============================================================================

interface LinkItem {
  label: string;
  href: string;
  external?: boolean;
}

interface LinkGroup {
  title: string;
  links: LinkItem[];
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface FooterProps {
  logo?: React.ReactNode;
  brandName?: string;
  description?: string;
  socialLinks?: SocialLink[];
  linkGroups?: LinkGroup[];
  bottomLinks?: LinkItem[];
  copyright?: string;
  showNewsletter?: boolean;
  className?: string;
  gridColor?: string;
  gridMaxOpacity?: number;
}

// ============================================================================
// Dock Components
// ============================================================================

function DockItem({ link, mouseX }: { link: SocialLink; mouseX: any }) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.4, 1]);
  const scale = useSpring(scaleSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const marginSync = useTransform(distance, [-150, 0, 150], [0, 10, 0]);
  const marginInline = useSpring(marginSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div style={{ scale, marginInline }} className="flex items-center justify-center relative origin-bottom">
      <motion.a
        ref={ref}
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={link.label}
        className="flex size-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground backdrop-blur-md transition-colors hover:bg-accent hover:text-foreground shadow-sm"
        whileTap={{ scale: 0.95 }}
      >
        {link.icon}
      </motion.a>
    </motion.div>
  );
}

function SocialDock({ links }: { links: SocialLink[] }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      className="flex items-end gap-2 pt-4 pb-2"
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
    >
      {links.map((link, i) => (
        <DockItem key={i} link={link} mouseX={mouseX} />
      ))}
    </div>
  );
}

// ============================================================================
// Footer Component
// ============================================================================

export function Footer({
  logo,
  brandName = "Acme",
  description = "Making the world a better place through innovative technology solutions.",
  socialLinks = [],
  linkGroups = [],
  bottomLinks = [],
  copyright,
  showNewsletter = true,
  className,
  gridColor,
  gridMaxOpacity = 0.3,
}: FooterProps) {
  const [email, setEmail] = useState("");
  const currentYear = new Date().getFullYear();
  const copyrightText = copyright || `© ${currentYear} ${brandName}. All rights reserved.`;

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log("Newsletter signup:", email);
      setEmail("");
    },
    [email],
  );

  return (
    <footer className={cn("relative overflow-hidden bg-background", className)}>
      {/* Flickering Grid Background */}
      <div className="absolute inset-0">
        <FlickeringGrid
          className="absolute inset-0 size-full"
          squareSize={4}
          gridGap={6}
          color={gridColor || "var(--muted-foreground)"}
          maxOpacity={gridMaxOpacity}
          flickerChance={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/60" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Brand Section */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              {logo}
              <span className="text-xl font-bold text-foreground">{brandName}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>

            {/* Social Links Dock */}
            {socialLinks.length > 0 && (
              <div className="mt-4">
                <SocialDock links={socialLinks} />
              </div>
            )}
          </div>

          {/* Link Groups */}
          {linkGroups.length > 0 && (
            <div className="w-full lg:w-2/3 flex flex-row justify-between gap-2 sm:justify-end sm:gap-16 md:gap-24">
              {linkGroups.map((group, i) => (
                <div key={i} className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
                  <ul className="space-y-3">
                    {group.links.map((link, j) => (
                      <li key={j}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                            <ChevronRightIcon className="size-3 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          >
                            {link.label}
                            <ChevronRightIcon className="size-3 opacity-0 -translate-x-1 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Section */}
        {showNewsletter && (
          <div className="mt-12 rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Stay updated</h3>
                <p className="text-sm text-muted-foreground">
                  Get the latest updates delivered to your inbox.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <motion.button
                  type="submit"
                  className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">{copyrightText}</p>
          {bottomLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {bottomLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
