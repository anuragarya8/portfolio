export const seoConfig = {
  name: "Anurag Arya",
  shortName: "Anurag Arya",
  title: "Anurag Arya — Full Stack Software Engineer",
  titleTemplate: "%s · Anurag Arya",
  description:
    "Full Stack Software Engineer specializing in Next.js, React, TypeScript, Node.js, Express.js, MongoDB, PostgreSQL and scalable web applications. View my portfolio, projects, case studies, and engineering work.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://anuragarya.io",
  locale: "en_IN",
  language: "en",
  category: "technology",
  occupation: "Full Stack Software Engineer",
  location: {
    country: "India",
    countryCode: "IN",
    timezone: "Asia/Kolkata",
  },
  email: "kumaranurag296@gmail.com",
  avatar: "/images/avatar.png",
  ogImage: "/opengraph-image",
  twitterHandle: "", // add @handle when available
  keywords: [
    "Anurag Arya",
    "Anurag Arya Developer",
    "Anurag Arya Portfolio",
    "Software Engineer",
    "Full Stack Developer",
    "Full Stack Software Engineer",
    "Next.js Developer",
    "React Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "JavaScript Engineer",
    "MERN Stack Developer",
    "Web Developer India",
    "Freelance Developer",
    "Freelance Software Engineer",
  ],
  social: {
    github: "https://github.com/anuragarya8",
    linkedin: "https://www.linkedin.com/in/anuragarya8/",
    leetcode: "https://www.leetcode.com/u/anuragarya8/",
    twitter: "",
    instagram: "",
    youtube: "",
    devto: "",
    hashnode: "",
    medium: "",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "",
    bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
    pinterest: process.env.NEXT_PUBLIC_PINTEREST_VERIFICATION ?? "",
  },
  analytics: {
    ga4: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "",
    gtm: process.env.NEXT_PUBLIC_GTM_ID ?? "",
    clarity: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
    plausible: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  },
} as const;

export type SeoConfig = typeof seoConfig;

export function absoluteUrl(path = "/") {
  const base = seoConfig.url.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function sameAsLinks() {
  return Object.values(seoConfig.social).filter(Boolean) as string[];
}
