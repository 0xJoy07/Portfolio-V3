"use client";

import React from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, Code, Laptop } from "lucide-react";
import { cn } from "@/lib/utils";

export type PositionType = {
  id: string;
  title: string;
  employmentPeriod: string;
  employmentType?: string;
  icon?: string;
  description: string;
  skills?: string[];
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  id: string;
  companyName: string;
  companyLogo?: string;
  positions: PositionType[];
  isCurrentEmployer?: boolean;
  theme?: "yellow" | "navy" | "primary";
};

const getThemeStyles = (theme?: string) => {
  switch (theme) {
    case "yellow":
      return {
        dot: "bg-yellow-500",
        iconContainer: "bg-yellow-500/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-white",
        skillBadge: "bg-yellow-500/5 text-yellow-600 border-yellow-500/20 hover:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/10 dark:hover:bg-yellow-500/20",
      };
    case "navy":
      return {
        dot: "bg-blue-800 dark:bg-blue-400",
        iconContainer: "bg-blue-800/10 text-blue-800 group-hover:bg-blue-800 group-hover:text-white dark:bg-blue-400/10 dark:text-blue-400 dark:group-hover:bg-blue-400 dark:group-hover:text-blue-950",
        skillBadge: "bg-blue-800/5 text-blue-800 border-blue-800/20 hover:bg-blue-800/10 dark:bg-blue-400/5 dark:text-blue-400 dark:border-blue-400/10 dark:hover:bg-blue-400/20",
      };
    case "primary":
    default:
      return {
        dot: "bg-primary",
        iconContainer: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
        skillBadge: "bg-primary/5 text-primary border-primary/10 hover:bg-primary/10",
      };
  }
};

const getIcon = (iconName?: string) => {
  switch (iconName?.toLowerCase()) {
    case "code": return <Code className="w-4 h-4" />;
    case "design": return <Laptop className="w-4 h-4" />;
    case "business": return <Briefcase className="w-4 h-4" />;
    default: return <Briefcase className="w-4 h-4" />;
  }
};

export function WorkExperience({
  experiences,
  className,
}: {
  experiences: ExperienceItemType[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-12", className)}>
      {experiences.map((exp, expIdx) => {
        const styles = getThemeStyles(exp.theme);
        return (
        <div key={exp.id} className="relative flex flex-col md:flex-row gap-6 md:gap-12">
          {/* Company Side */}
          <div className="md:w-1/3 flex flex-col md:items-end text-left md:text-right relative">
            <div className="md:sticky md:top-24">
              <div className="flex items-center md:justify-end gap-4 mb-2">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                  {exp.companyName}
                </h3>
              </div>
              {exp.isCurrentEmployer && (
                <span className="inline-block px-3 py-1 mt-2 text-xs font-semibold text-green-600 bg-green-500/10 border border-green-500/20 rounded-full">
                  Current Student
                </span>
              )}
            </div>
          </div>
          
          {/* Timeline Divider */}
          <div className="hidden md:flex flex-col items-center">
            <div className={cn("w-5 h-5 rounded-full z-10 border-[4px] border-background shadow-sm", styles.dot)} />
            <div className="w-0.5 h-full bg-border -mt-2 rounded-full" />
          </div>

          {/* Positions Side */}
          <div className="md:w-2/3 flex flex-col gap-8 pb-8 md:pl-0 pl-6 border-l-2 md:border-l-0 border-border md:border-none relative">
            {exp.positions.map((pos, posIdx) => (
              <motion.div 
                key={pos.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { duration: 0.5, delay: posIdx * 0.1 }
                }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{
                  scale: 1.02,
                  y: -8,
                  transition: { type: "spring", stiffness: 400, damping: 25 }
                }}
                className="relative bg-card border border-border p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                {/* Mobile timeline dot */}
                <div className={cn("absolute left-[-31px] top-8 w-3 h-3 rounded-full md:hidden border-2 border-background shadow-sm", styles.dot)} />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <h4 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                    <span className={cn("p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110", styles.iconContainer)}>
                      {getIcon(pos.icon)}
                    </span>
                    {pos.title}
                  </h4>
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-muted/50 border border-border/50 px-4 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4" />
                    <span>{pos.employmentPeriod}</span>
                  </div>
                </div>
                
                <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground whitespace-pre-wrap leading-relaxed text-base">
                  {pos.description}
                </div>

                {pos.skills && pos.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-border/50">
                    {pos.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className={cn("px-3 py-1 text-sm font-medium rounded-full border transition-colors", styles.skillBadge)}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )})}
    </div>
  );
}
