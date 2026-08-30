"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Maximum dots to render regardless of viewport size
const MAX_DOTS = 1200;
const SPACING = 28;
const RADIUS = 1;
const MOUSE_RADIUS = 120;
const SCATTER_DIST = 45;
const SPRING = 0.07;
const IDLE_TIMEOUT = 150;

export function ScatterDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  // Keep a ref to the current theme so the rAF loop can read it
  // without the entire effect needing to re-run on theme change.
  const themeRef = useRef(resolvedTheme);
  useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let isRunning = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const mouse = { x: -1000, y: -1000 };

    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
    }

    let dots: Dot[] = [];

    const init = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const all: Dot[] = [];
      for (let x = 0; x < width; x += SPACING) {
        for (let y = 0; y < height; y += SPACING) {
          all.push({ x, y, baseX: x, baseY: y });
        }
      }

      if (all.length <= MAX_DOTS) {
        dots = all;
      } else {
        for (let i = 0; i < MAX_DOTS; i++) {
          const j = i + Math.floor(Math.random() * (all.length - i));
          [all[i], all[j]] = [all[j], all[i]];
        }
        dots = all.slice(0, MAX_DOTS);
      }
    };

    const getDotColor = () =>
      themeRef.current === "dark"
        ? "rgba(255, 255, 255, 0.15)"
        : "rgba(0, 0, 0, 0.25)";

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getDotColor();

      let allSettled = true;

      dots.forEach((dot) => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (dist < MOUSE_RADIUS) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          targetX -= Math.cos(angle) * force * SCATTER_DIST;
          targetY -= Math.sin(angle) * force * SCATTER_DIST;
        }

        const moveX = (targetX - dot.x) * SPRING;
        const moveY = (targetY - dot.y) * SPRING;

        if (Math.abs(moveX) > 0.05 || Math.abs(moveY) > 0.05) {
          allSettled = false;
        }

        dot.x += moveX;
        dot.y += moveY;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      });

      if (allSettled && mouse.x === -1000) {
        isRunning = false;
        return;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      animationFrameId = requestAnimationFrame(draw);
    };

    const scheduleIdle = () => {
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        mouse.x = -1000;
        mouse.y = -1000;
      }, IDLE_TIMEOUT);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      startLoop();
      scheduleIdle();
    };

    const handleMouseLeave = () => {
      if (idleTimer) clearTimeout(idleTimer);
      mouse.x = -1000;
      mouse.y = -1000;
    };

    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        init();
        startLoop();
      }, 150);
    };

    init();
    // Paint one static frame immediately so dots are visible without mouse activity
    ctx.fillStyle = getDotColor();
    dots.forEach((dot) => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2);
      ctx.fill();
    });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (idleTimer) clearTimeout(idleTimer);
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  // Intentionally no resolvedTheme in deps — theme changes are handled
  // via themeRef so the canvas doesn't tear down and reinitialize.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
