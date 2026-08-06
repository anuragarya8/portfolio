export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "email" | "twitter" | "leetcode";
};

export type NavItem = {
  label: string;
  href: string;
};

export type ExperienceItem = {
  id: string;
  company: string;
  role: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  achievements: string[];
  tech: string[];
};

export type AboutBlock = {
  id: string;
  title: string;
  body: string;
};

export type Confidence = "Familiar" | "Proficient" | "Expert";

export type TechItem = {
  name: string;
  category:
    | "Frontend"
    | "Backend"
    | "Database"
    | "Cloud"
    | "DevOps"
    | "UI"
    | "State"
    | "Tools"
    | "Testing"
    | "Animations";
  years: number;
  confidence: Confidence;
  usedIn: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  year: string;
  role: string;
  problem: string;
  solution: string;
  stack: string[];
  features: string[];
  responsibilities: string[];
  challenges: string[];
  architecture: string[];
  tradeoffs: string[];
  performance: string[];
  accessibility: string[];
  lessons: string[];
  links: ProjectLink[];
  accent: string;
  image?: string;
};

export type ProcessStep = {
  id: string;
  title: string;
  description: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
};
