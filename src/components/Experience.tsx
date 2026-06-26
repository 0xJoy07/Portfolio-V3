"use client";

import { ExperienceItemType, WorkExperience } from "./ui/work-experience";

const EXPERIENCES: ExperienceItemType[] = [
  {
    id: "narula",
    companyName: "Narula Institute of Technology",
    theme: "primary",
    isCurrentEmployer: true,
    positions: [
      {
        id: "btech-aiml",
        title: "B.Tech AIML Student",
        employmentPeriod: "August 2024-Present",
        icon: "business",
        description: "Pursuing Bachelor of Technology in Artificial Intelligence and Machine Learning. Building a strong foundation in computer science principles, advanced mathematics, and modern AI algorithms.",
        skills: ["Artificial Intelligence", "Machine Learning", "Computer Science", "Algorithms", "Mathematics"],
      }
    ],
  },
  {
    id: "ai-wallah",
    companyName: "AI Wallah",
    theme: "yellow",
    positions: [
      {
        id: "ai-wallah-intern",
        title: "Generative AI Intern",
        employmentPeriod: "June 2025 - September 2025",
        icon: "code",
        description: "Worked on building and developing AI-based projects using various types of APIs and testing applications extensively on Postman.",
        skills: ["Generative AI", "APIs", "Postman", "Project Development"],
      }
    ],
  },
  {
    id: "eduskills",
    companyName: "Eduskills Foundation",
    theme: "navy",
    positions: [
      {
        id: "eduskills-intern",
        title: "Student Intern",
        employmentPeriod: "January 2026 - March 2026",
        icon: "code",
        description: "Learned GOOGLE AIML skills and explored machine learning libraries to build foundational models and perform data analysis.",
        skills: ["TensorFlow", "Keras", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      }
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-32 bg-muted/30 border-t border-border">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center flex flex-col items-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider uppercase bg-primary/10 text-primary rounded-full border border-primary/20">
            Professional Journey
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 font-sans tracking-tight">
            Experience & Education
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My academic background, professional journey, internships, and the organizations I've had the opportunity to learn and work with.
          </p>
        </div>

        <WorkExperience experiences={EXPERIENCES} className="mt-8" />
      </div>
    </section>
  );
}
