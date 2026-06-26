"use client";

import React from "react";
import { motion } from "motion/react";
import { Check, Lock, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

export type AchievementType = {
  id: string;
  name: string;
  description: string;
  trigger?: string;
  achievedAt?: string | null;
  progress?: number;
};

export function AchievementList({
  achievements,
  className,
}: {
  achievements: AchievementType[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {achievements.map((achievement, idx) => {
        const isUnlocked = !!achievement.achievedAt || (achievement.progress !== undefined && achievement.progress >= 100);
        
        return (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.5, delay: idx * 0.1 }
            }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ 
              scale: 1.02, 
              y: -5, 
              transition: { type: "spring", stiffness: 400, damping: 25 } 
            }}
            className={cn(
              "relative bg-card border p-6 md:p-8 rounded-2xl shadow-sm transition-all overflow-hidden flex items-start gap-5",
              isUnlocked ? "border-primary/20 shadow-primary/5 hover:shadow-primary/10" : "border-border opacity-80 hover:opacity-100"
            )}
          >
            {/* Background progress fill if partially completed */}
            {achievement.progress !== undefined && achievement.progress > 0 && !isUnlocked && (
              <div 
                className="absolute inset-0 bg-primary/5 -z-10 transition-all duration-1000 ease-out" 
                style={{ width: `${achievement.progress}%` }} 
              />
            )}
            
            {/* Icon Container */}
            <div className={cn(
              "p-3.5 rounded-2xl shrink-0 flex items-center justify-center transition-colors",
              isUnlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            )}>
              {isUnlocked ? <Trophy className="w-7 h-7" /> : <Lock className="w-7 h-7" />}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col gap-1.5 z-10 h-full">
              <div className="flex items-start justify-between gap-4">
                <h4 className={cn("font-bold text-xl leading-tight", isUnlocked ? "text-foreground" : "text-muted-foreground")}>
                  {achievement.name}
                </h4>
                {isUnlocked && (
                  <div className="flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-green-500/10 text-green-500">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>
              
              <p className="text-base text-muted-foreground mb-3 leading-relaxed">
                {achievement.description}
              </p>

              {/* Progress Bar (if applicable and not completed) */}
              {achievement.progress !== undefined && !isUnlocked && (
                <div className="mt-auto pt-4">
                  <div className="flex justify-between text-xs font-semibold text-muted-foreground mb-1.5">
                    <span>Progress</span>
                    <span>{achievement.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-primary rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${achievement.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 + idx * 0.1 }}
                    />
                  </div>
                </div>
              )}
              
              {/* Date Unlocked */}
              {isUnlocked && achievement.achievedAt && (
                <div className="mt-auto pt-4 text-xs font-semibold uppercase tracking-wider text-primary/80">
                  Unlocked • {new Date(achievement.achievedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
