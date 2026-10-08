"use client";
import * as React from "react";
import { CircularThemeReveal } from "@/components/ui/circular-theme-reveal";

export default function Demo() {
  return (
    <CircularThemeReveal>
      <main className="ctr-content flex flex-col items-center gap-6">
        <h1 className="ctr-title">LET THE LIGHT<br/>CHANGE YOUR VIEW.</h1>
        <div className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
            alt="Abstract Art" 
            className="w-full h-auto object-cover aspect-video"
          />
        </div>
      </main>
    </CircularThemeReveal>
  );
}
