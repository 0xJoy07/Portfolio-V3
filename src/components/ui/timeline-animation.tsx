"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

type TimelineContentProps = {
  as?: string | React.ElementType;
  animationNum: number;
  timelineRef?: any;
  customVariants: any;
  children: ReactNode;
  className?: string;
};

export function TimelineContent({
  as = "div",
  animationNum,
  customVariants,
  children,
  className,
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
    >
      {children}
    </MotionComponent>
  );
}
