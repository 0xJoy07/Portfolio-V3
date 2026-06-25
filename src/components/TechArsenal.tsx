"use client";

import React from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { Code2, Globe, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";

// Generate an organic "S" curve from center (0,0) to target (x,y)
function getCurvedPath(x: number, y: number) {
  const d = Math.sqrt(x * x + y * y);
  const a = Math.atan2(y, x);
  
  // Bow out control points to make wavy, organic lines
  const cp1x = (Math.cos(a - 0.4) * (d * 0.4)).toFixed(2);
  const cp1y = (Math.sin(a - 0.4) * (d * 0.4)).toFixed(2);
  
  const cp2x = (x - Math.cos(a + 0.4) * (d * 0.4)).toFixed(2);
  const cp2y = (y - Math.sin(a + 0.4) * (d * 0.4)).toFixed(2);
  
  return `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x.toFixed(2)} ${y.toFixed(2)}`;
}

const categories = [
  {
    title: "Web Dev",
    color: "#3b82f6", // Blue
    icon: Globe,
    skills: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs", darkSlug: "nextdotjs/white", lightSlug: "nextdotjs" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "Express", slug: "express", darkSlug: "express/white", lightSlug: "express" },
      { name: "MongoDB", slug: "mongodb" },
      { name: "Firebase", slug: "firebase" },
      { name: "Vercel", slug: "vercel", darkSlug: "vercel/white", lightSlug: "vercel" },
    ]
  },
  {
    title: "Languages",
    color: "#f59e0b",
    icon: Code2,
    skills: [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openjdk/ED8B00" },
      { name: "C++", slug: "cplusplus" },
      { name: "HTML5", slug: "html5" },
      { name: "CSS3", slug: "css" },
    ]
  },
  {
    title: "AI & Tools",
    color: "#10b981",
    icon: Cpu,
    skills: [
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Claude", slug: "anthropic", darkSlug: "anthropic/white", lightSlug: "anthropic" },
      { name: "GitHub", slug: "github", darkSlug: "github/white", lightSlug: "github" },
      { name: "Git", slug: "git" },
      { name: "Linux", slug: "linux" },
      { name: "Docker", slug: "docker" },
      { name: "Figma", slug: "figma" },
    ]
  }
];

function DockSkillNode({ skill, category, mx, my, x, y, delay }: any) {
  const ref = React.useRef<HTMLDivElement>(null);

  const dist = useTransform([mx, my], ([valX, valY]) => {
    if (valX === Infinity || valY === Infinity) return 150;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const nodeX = bounds.x + bounds.width / 2;
    const nodeY = bounds.y + bounds.height / 2;
    return Math.sqrt(Math.pow(valX - nodeX, 2) + Math.pow(valY - nodeY, 2));
  });

  const sizeSync = useTransform(dist, [0, 150], [80, 48]); // 48 is w-12, 80 is zoomed in
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <div
      className="absolute top-1/2 left-1/2 z-10"
      style={{ transform: `translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))` }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 200 }}
        style={{ width: size, height: size }}
        className="group cursor-pointer hover:z-50"
      >
        <motion.div
          className="w-full h-full bg-white dark:bg-neutral-900 border border-black/10 dark:border-white/10 rounded-xl flex items-center justify-center shadow-md dark:shadow-2xl transition-colors duration-300"
          title={skill.name}
          whileHover={{ 
            borderColor: `${category.color}80`,
            transition: { duration: 0.05, ease: "easeOut" }
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {skill.darkSlug && skill.lightSlug ? (
            <>
              <img 
                src={`https://cdn.simpleicons.org/${skill.lightSlug}`} 
                alt={skill.name}
                className="w-[50%] h-[50%] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm dark:hidden"
                loading="lazy"
              />
              <img 
                src={`https://cdn.simpleicons.org/${skill.darkSlug}`} 
                alt={skill.name}
                className="w-[50%] h-[50%] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md hidden dark:block"
                loading="lazy"
              />
            </>
          ) : (
            <img 
              src={`https://cdn.simpleicons.org/${skill.slug}`} 
              alt={skill.name}
              className="w-[50%] h-[50%] object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm dark:drop-shadow-md"
              loading="lazy"
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

function DockCenterNode({ category, mx, my, index }: any) {
  const ref = React.useRef<HTMLDivElement>(null);

  const dist = useTransform([mx, my], ([valX, valY]) => {
    if (valX === Infinity || valY === Infinity) return 150;
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, y: 0, width: 0, height: 0 };
    const nodeX = bounds.x + bounds.width / 2;
    const nodeY = bounds.y + bounds.height / 2;
    return Math.sqrt(Math.pow(valX - nodeX, 2) + Math.pow(valY - nodeY, 2));
  });

  const sizeSync = useTransform(dist, [0, 150], [150, 112]); // 112 base, 150 zoomed
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.3, type: "spring", stiffness: 200 }}
      style={{ width: size, height: size }}
      className="relative z-20 cursor-pointer group"
    >
      <motion.div 
        className="w-full h-full bg-white dark:bg-neutral-900 border-2 rounded-2xl flex flex-col items-center justify-center shadow-lg dark:shadow-2xl transition-colors duration-300"
        style={{ borderColor: category.color }}
        whileHover={{
          borderColor: category.color,
          transition: { duration: 0.05, ease: "easeOut" }
        }}
      >
        <category.icon className="w-[30%] h-[30%] mb-2 drop-shadow-sm dark:drop-shadow-[0_0_8px_currentColor] opacity-70 group-hover:opacity-100 transition-opacity duration-300" style={{ color: category.color }} />
        <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-neutral-800 dark:text-white drop-shadow-sm dark:drop-shadow-md text-center leading-tight opacity-70 group-hover:opacity-100 transition-opacity duration-300">
          {category.title}
        </span>
      </motion.div>
    </motion.div>
  );
}

function SkillHub({ category, index }: { category: typeof categories[0], index: number }) {
  const radius = 130; // Radius for spokes
  const mx = useMotionValue(Infinity);
  const my = useMotionValue(Infinity);

  return (
    <div 
      className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] mx-auto"
      onMouseMove={(e) => {
        mx.set(e.clientX);
        my.set(e.clientY);
      }}
      onMouseLeave={() => {
        mx.set(Infinity);
        my.set(Infinity);
      }}
    >
      {/* SVG Connections Layer */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
        <g style={{ transform: 'translate(50%, 50%)' }}>
          {category.skills.map((skill, i) => {
            const angle = (i * (360 / category.skills.length) - 90) * (Math.PI / 180);
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <motion.path
                key={skill.name}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: index * 0.3 + i * 0.1, ease: "easeOut" }}
                d={getCurvedPath(x, y)}
                fill="transparent"
                stroke={category.color}
                strokeWidth={2}
                className="drop-shadow-lg"
              />
            );
          })}
        </g>
      </svg>
      
      {/* Skill Nodes (Spokes) */}
      {category.skills.map((skill, i) => {
        const angle = (i * (360 / category.skills.length) - 90) * (Math.PI / 180);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <DockSkillNode 
            key={skill.name}
            skill={skill}
            category={category}
            mx={mx}
            my={my}
            x={x}
            y={y}
            delay={index * 0.3 + 0.5 + i * 0.1}
          />
        );
      })}

      {/* Center Node (Hub) */}
      <DockCenterNode category={category} mx={mx} my={my} index={index} />
    </div>
  );
}

export function TechArsenal() {
  return (
    <section id="tech" className="relative min-h-screen py-24 overflow-hidden bg-background flex flex-col items-center justify-center">
      <div className="container relative z-10 mx-auto px-4 text-center mb-16">
        <h2 className="text-sm md:text-base font-semibold tracking-[0.3em] text-primary uppercase mb-3">
          Tech Stack
        </h2>
        <h3 className="text-4xl md:text-5xl font-bold font-sans text-foreground mb-4">
          Tools I used
        </h3>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-8 mt-12">
        {categories.map((category, index) => (
          <SkillHub key={category.title} category={category} index={index} />
        ))}
      </div>
    </section>
  );
}
