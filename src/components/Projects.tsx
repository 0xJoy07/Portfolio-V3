"use client"

import * as React from "react"
import { ContainerScroll, CardSticky } from "@/components/ui/cards-stack"
import { ExternalLink } from "lucide-react"
import projectsData from "../../projects/projects.json"

const GithubIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
)

export function Projects() {
  const [projectsList, setProjectsList] = React.useState(() =>
    projectsData.projects.map((p) => ({ ...p, id: p.name }))
  );

  const handleCardTap = (projectId: string) => {
    setProjectsList((prev) => {
      const idx = prev.findIndex(p => p.id === projectId);
      if (idx === prev.length - 1) return prev; // Already at the front

      const newList = [...prev];
      const [tapped] = newList.splice(idx, 1);
      newList.push(tapped);
      return newList;
    });
  };

  return (
    <section id="projects" className="min-h-screen place-content-center bg-background px-6 py-24 text-foreground xl:px-12 mx-auto">
      <div className="container mx-auto text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 pb-2">
          Get a glimpse of my work
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl font-medium">
          From sophisticated AI agents to full-stack platforms, building fully responsive and functional applications that solve real-world problems.
        </p>
      </div>
      <ContainerScroll className="py-12 max-w-5xl mx-auto relative pb-32">
        {projectsList.map((project, index) => (
          <CardSticky
            key={project.id}
            index={index}
            onClick={() => handleCardTap(project.id)}
            className="w-full rounded-2xl border border-border bg-card shadow-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[450px] mb-24 cursor-pointer"
            incrementY={40}
            incrementZ={0}
            offsetTop="10vh"
            style={{
              zIndex: index
            }}
            animate={{
              z: index * 10,
              scale: index === projectsList.length - 1 ? 1.02 : 1
            }}
            transition={{
              layout: { type: "spring", stiffness: 350, damping: 30 },
              z: { type: "spring", stiffness: 350, damping: 30 },
              scale: { type: "spring", stiffness: 350, damping: 30 }
            }}
            whileHover={{
              scale: 1.04,
              y: -10,
              boxShadow: "0 30px 60px -15px rgba(var(--primary), 0.15)"
            }}
          >
            <div className="p-6 md:p-8 md:w-1/3 flex flex-col gap-6 justify-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-bold tracking-tight">
                    {project.name}
                  </h2>
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                        <GithubIcon size={20} />
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" onClick={(e) => e.stopPropagation()} onPointerDown={(e) => e.stopPropagation()}>
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {project["Tech Stack"]?.map((tech) => (
                  <div
                    key={tech}
                    className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1"
                  >
                    <span className="text-xs font-semibold tracking-wide text-primary">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-2/3 border-t md:border-t-0 md:border-l border-border bg-muted/10 relative min-h-[300px] p-4 flex items-center justify-center overflow-hidden">
              {project.live || project.github ? (
                <a 
                  href={project.live || project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="w-full h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()} 
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  <img
                    className="w-full h-full object-contain drop-shadow-2xl"
                    src={project.image.replace('./', '/')}
                    alt={project.name}
                  />
                </a>
              ) : (
                <img
                  className="w-full h-full object-contain drop-shadow-2xl"
                  src={project.image.replace('./', '/')}
                  alt={project.name}
                />
              )}
            </div>
          </CardSticky>
        ))}
      </ContainerScroll>
    </section>
  )
}
