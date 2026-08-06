import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description:
      "Clarify goals, users, constraints, and success metrics before writing code.",
  },
  {
    id: "planning",
    title: "Planning",
    description:
      "Map information architecture, API contracts, and a realistic delivery sequence.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Align on visual direction, component patterns, and responsive behavior.",
  },
  {
    id: "development",
    title: "Development",
    description:
      "Ship in vertical slices — typed, reviewable, and demoable every few days.",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Validate critical paths, accessibility, and performance on real devices.",
  },
  {
    id: "deployment",
    title: "Deployment",
    description:
      "Ship with previews, env hygiene, analytics, and a rollback path.",
  },
  {
    id: "maintenance",
    title: "Maintenance",
    description:
      "Monitor, iterate, and keep dependencies and DX healthy after launch.",
  },
];
