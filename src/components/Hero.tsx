"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { MeshGradientSVG } from "./ui/shader-svg";

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

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4l11.733 16h4.267l-11.733 -16z"/>
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

export function Hero() {
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 1.5,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };
  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-between px-8 md:px-16 overflow-hidden pt-24 bg-background">
      {/* Noise Texture (Darker Dots) Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--dot-color, rgba(0, 0, 0, 0.35)) 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />
      {/* Soft Glow */}
      <div
        className="absolute inset-0 z-0 pointer-events-none hero-glow"
      />

      {/* Left side: Name & Title */}
      <div className="flex flex-col z-10 max-w-3xl -mt-24">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-7xl md:text-4xl font-bold tracking-tighter mb-4 text-foreground font-[family-name:var(--font-changa)] flex flex-wrap"
        >
          {"Hi I'm".split("").map((char, index) => (
            <motion.span
              key={index}
              custom={index * 0.05}
              variants={revealVariants}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-7xl md:text-9xl font-extrabold tracking-tighter mb-4 text-foreground font-[family-name:var(--font-changa)] flex flex-col"
        >
          <div className="flex flex-wrap">
            {"Joy".split("").map((char, index) => (
              <motion.span
                key={index}
                custom={("Hi I'm".length + index) * 0.05}
                variants={revealVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
          <div className="flex flex-wrap">
            {"Sengupta".split("").map((char, index) => (
              <motion.span
                key={index}
                custom={("Hi I'm".length + "Joy".length + index) * 0.05}
                variants={revealVariants}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        </motion.h1>
        
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-2xl md:text-4xl text-foreground/70 font-medium font-[family-name:var(--font-outfit)] min-h-[4rem]"
        >
          <TypeAnimation
            sequence={[
              "MERN + Next.js Developer",
              2000,
              "Vibe Coder",
              2000,
              "Machine Learning Explorer",
              2000,
              "Open Source Enthusiast",
              2000,
              "Always vibing, always building",
              2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          custom={8}
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-lg md:text-xl text-foreground/60 mt-6 max-w-xl font-medium font-[family-name:var(--font-outfit)] leading-relaxed"
        >
          I'm a passionate developer focused on crafting beautiful, interactive web experiences and exploring the frontiers of machine learning.
        </motion.p>
      </div>

      {/* Center: Mesh Gradient SVG Component */}
      <div className="absolute top-1/2 left-[58%] -translate-x-1/2 -translate-y-1/2 z-0 hidden lg:block">
        <MeshGradientSVG />
      </div>

      {/* Right side: Social Links */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="flex flex-col gap-2 z-10 items-end bg-background/60 border border-border backdrop-blur-xl p-2 rounded-full shadow-lg"
      >
        <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href="https://github.com/0xJoy07"
            target="_blank"
            className="flex items-center justify-center p-3 rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/60 hover:text-foreground"
          >
            <GithubIcon className="w-7 h-7" />
          </Link>
        </motion.div>
        
        <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href="https://linkedin.com/in/beinggojo"
            target="_blank"
            className="flex items-center justify-center p-3 rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/60 hover:text-foreground"
          >
            <LinkedinIcon className="w-7 h-7" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href="https://x.com/"
            target="_blank"
            className="flex items-center justify-center p-3 rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/60 hover:text-foreground"
          >
            <TwitterIcon className="w-7 h-7" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href="https://instagram.com/"
            target="_blank"
            className="flex items-center justify-center p-3 rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/60 hover:text-foreground"
          >
            <InstagramIcon className="w-7 h-7" />
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.2, y: -2 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
          <Link
            href="mailto:hello@joysengupta.dev"
            className="flex items-center justify-center p-3 rounded-full hover:bg-foreground/10 transition-colors duration-300 text-foreground/60 hover:text-foreground"
          >
            <MailIcon className="w-7 h-7" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Mobile view Mesh Gradient (if screen is small) */}
      <div className="lg:hidden absolute bottom-10 left-1/2 -translate-x-1/2 z-0 opacity-50 pointer-events-none">
        <div className="scale-75">
          <MeshGradientSVG />
        </div>
      </div>
    </section>
  );
}

