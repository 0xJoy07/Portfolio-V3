"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { ReactNode } from "react";

type TimelineContentProps = {
  as?: string | React.ElementType;
  animationNum: number;
  timelineRef?: any;
  customVariants: any;
  children: ReactNode;
  className?: string;
  [key: string]: any; // Allow arbitrary props like href, target, rel
};

export function TimelineContent({
  as = "div",
  animationNum,
  customVariants,
  children,
  className,
  timelineRef, // extracted but unused directly by framer-motion here
  ...props
}: TimelineContentProps) {
  const MotionComponent = motion.create(as as any) as any;
  return (
    <MotionComponent
      custom={animationNum}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={customVariants}
      className={className}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
