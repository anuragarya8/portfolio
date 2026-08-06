import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    id: "toba-tech",
    company: "ToBa Tech",
    role: "Full Stack Developer",
    location: "India",
    start: "Jan 2026",
    end: "Present",
    current: true,
    achievements: [
      "Shipping production frontends across QuizVerse, ContentX Studio, and company marketing surfaces.",
      "Collaborating with product and design to deliver responsive, performance-minded web experiences.",
      "Owning feature delivery end-to-end — UI, API integration, and deployment readiness.",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
  },
  {
    id: "affworld",
    company: "Affworld Technologies",
    role: "Full Stack Developer",
    location: "India",
    start: "Jul 2024",
    end: "Dec 2025",
    achievements: [
      "Built and maintained full-stack features across client and internal products.",
      "Delivered authenticated flows, dashboards, and API-driven UI with measurable reliability.",
      "Partnered with stakeholders to translate requirements into shippable increments.",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    id: "solitaire",
    company: "Solitaire Infosys",
    role: "Software Developer",
    location: "Mohali, India",
    start: "Jan 2024",
    end: "Jun 2024",
    achievements: [
      "Contributed to web application development using the MERN stack.",
      "Implemented UI components and backend endpoints for client deliverables.",
      "Strengthened fundamentals in Git workflows, code review, and production debugging.",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
  },
];
