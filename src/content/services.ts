import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "web-apps",
    title: "Website & Web App Development",
    description:
      "Production-ready React and Next.js applications with clean architecture and strong UX.",
    icon: "globe",
  },
  {
    id: "saas",
    title: "SaaS & Dashboards",
    description:
      "Authenticated product surfaces, admin panels, and data-dense UIs that stay fast.",
    icon: "layout",
  },
  {
    id: "apis",
    title: "Backend APIs",
    description:
      "Node/Express REST APIs with auth, validation, and MongoDB data models.",
    icon: "server",
  },
  {
    id: "landing",
    title: "Landing Pages",
    description:
      "High-converting marketing sites with motion restraint and Core Web Vitals focus.",
    icon: "sparkles",
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description:
      "Image, bundle, and rendering audits that turn sluggish apps into snappy ones.",
    icon: "zap",
  },
  {
    id: "ui",
    title: "UI Development",
    description:
      "Pixel-aware implementation of design systems with accessible components.",
    icon: "palette",
  },
  {
    id: "consulting",
    title: "Consulting",
    description:
      "Architecture reviews, stack decisions, and hands-on pairing for your team.",
    icon: "message",
  },
];
