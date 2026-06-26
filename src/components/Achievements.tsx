"use client";

import React from "react";
import { AchievementList } from "@/components/ui/achievement-list";

const achievementsData = [
  {
    id: "sih",
    name: "1X SIH Internal Hackathon Nominated Team",
    description: "Top 15/50 teams",
    progress: 100,
    achievedAt: "2025-09-01T00:00:00Z",
  },
  {
    id: "innovexa",
    name: "Innovexa 2026 (SurTech) Finalist",
    description: "Scored 88/100",
    progress: 100,
    achievedAt: "2026-05-01T00:00:00Z",
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Milestones
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-sans tracking-tight">
            Achievements
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Recognitions and milestones I've achieved along my journey.
          </p>
        </div>

        <AchievementList achievements={achievementsData} />
      </div>
    </section>
  );
}
