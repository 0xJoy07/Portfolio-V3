"use client";

import { useRef } from "react";
import { Zap } from "lucide-react";
import { TextGradientScroll } from "./ui/text-gradient-scroll";
import { TimelineContent } from "./ui/timeline-animation";

export function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  
  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.5,
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
        delay: i * 0.2,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section id="about" className="py-24 md:py-32 px-4 min-h-[80vh] flex flex-col justify-center border-t border-border">
      <div className="max-w-5xl mx-auto w-full" ref={heroRef}>
        
        <div className="bg-muted/10 border border-border rounded-[2rem] p-8 md:p-14 shadow-sm flex flex-col">
          <TimelineContent
            as="h2"
            animationNum={0}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="text-xl md:text-2xl lg:text-3xl !leading-[160%] font-semibold text-foreground mb-12 font-[family-name:var(--font-playfair)]"
          >
            I am a{" "}
            <TimelineContent
              as="span"
              animationNum={1}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="text-blue-500 border-2 border-blue-500/50 inline-block xl:h-auto border-dotted px-3 rounded-xl mx-1 bg-blue-500/5"
            >
              MERN + Next.js Developer
            </TimelineContent>{" "}
            and B.Tech AIML Student at Narula Institute of Technology. Passionate about automating web experiences, I am currently exploring the frontiers of{" "}
            <TimelineContent
              as="span"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="text-orange-500 border-2 border-orange-500/50 inline-block xl:h-auto border-dotted px-3 rounded-xl mx-1 bg-orange-500/5"
            >
              Web Development
            </TimelineContent>{" "}
            and the{" "}
            <TimelineContent
              as="span"
              animationNum={3}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="text-green-500 border-2 border-green-500/50 inline-block xl:h-auto border-dotted px-3 rounded-xl mx-1 bg-green-500/5"
            >
              MERN Stack
            </TimelineContent>{" "}
            while advancing my skills in{" "}
            <TimelineContent
              as="span"
              animationNum={4}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="text-purple-500 border-2 border-purple-500/50 inline-block xl:h-auto border-dotted px-3 rounded-xl mx-1 bg-purple-500/5"
            >
              Python & AI
            </TimelineContent>
            . Always eager to learn, innovate, and grow.
          </TimelineContent>

          <div className="flex flex-col sm:flex-row gap-6 sm:justify-between items-start sm:items-end mt-8 pt-8 border-t border-border/50">
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="font-[family-name:var(--font-outfit)]"
            >
              <div className="font-medium text-foreground mb-1 capitalize text-lg">
                Data Analysis • Flask • Java
              </div>
              <div className="text-muted-foreground font-semibold uppercase tracking-wider text-xs mt-2">
                Computer Science Student
              </div>
            </TimelineContent>

            <TimelineContent
              as="a"
              href="https://linkedin.com/in/beinggojo"
              target="_blank"
              rel="noopener noreferrer"
              animationNum={6}
              timelineRef={heroRef}
              customVariants={textVariants}
              className="bg-primary gap-2 font-medium shadow-xl shadow-primary/20 text-primary-foreground h-14 px-8 rounded-full text-sm inline-flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
            >
              <Zap fill="currentColor" size={18} />
              Connect on LinkedIn
            </TimelineContent>
          </div>
        </div>

      </div>
    </section>
  );
}
