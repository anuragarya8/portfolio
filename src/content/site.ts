import type { NavItem, SocialLink } from "@/types";
import { seoConfig } from "@/config/seo";

export const siteConfig = {
  name: seoConfig.name,
  role: seoConfig.occupation,
  title: seoConfig.title,
  description: seoConfig.description,
  location: seoConfig.location.country,
  timezone: "IST (UTC+5:30)",
  email: seoConfig.email,
  availability: {
    status: "available" as const,
    label: "Available for hire",
  },
  avatar: seoConfig.avatar,
  resume: null as string | null,
  url: seoConfig.url,
  valueProposition:
    "I build fast, accessible full-stack products — from MERN APIs to Next.js experiences that feel like premium software.",
  calendar: null as string | null,
} as const;

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: seoConfig.social.github,
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: seoConfig.social.linkedin,
    icon: "linkedin",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: "email",
  },
  {
    label: "LeetCode",
    href: seoConfig.social.leetcode,
    icon: "leetcode",
  },
];

/** Absolute hash routes so nav works from case study pages too */
export const navItems: NavItem[] = [
  { label: "Work", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Stack", href: "/#tech" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];
