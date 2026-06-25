"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function ScatterDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width;
    let height = canvas.height;

    const spacing = 20; // grid spacing
    const radius = 1; // dot radius
    const mouseRadius = 140; // repel radius

    let mouse = { x: -1000, y: -1000 };

    interface Dot {
      x: number;
      y: number;
      baseX: number;
      baseY: number;
    }

    let dots: Dot[] = [];

    const init = () => {
      // Need to use the parent container's size if it's absolute inset-0
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
      } else {
        width = window.innerWidth;
        height = window.innerHeight;
      }
      canvas.width = width;
      canvas.height = height;
      
      dots = [];
      for (let x = 0; x < width; x += spacing) {
        for (let y = 0; y < height; y += spacing) {
          dots.push({ x, y, baseX: x, baseY: y });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Determine dot color based on theme. Fallbacks provided.
      const dotColor = resolvedTheme === "dark" 
        ? "rgba(255, 255, 255, 0.15)" 
        : "rgba(0, 0, 0, 0.25)";
        
      ctx.fillStyle = dotColor;
      
      dots.forEach(dot => {
        const dx = mouse.x - dot.baseX;
        const dy = mouse.y - dot.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = dot.baseX;
        let targetY = dot.baseY;

        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius;
          const angle = Math.atan2(dy, dx);
          const scatterDist = force * 50; // max displacement
          targetX -= Math.cos(angle) * scatterDist;
          targetY -= Math.sin(angle) * scatterDist;
        }

        // Spring back to base
        dot.x += (targetX - dot.x) * 0.08;
        dot.y += (targetY - dot.y) * 0.08;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      init();
    };

    init();
    draw();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseout", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseout", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
