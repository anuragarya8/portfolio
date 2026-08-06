import type { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "quizverse",
    title: "QuizVerse",
    tagline: "Live trivia for venues — phones as controllers, one screen to host.",
    featured: true,
    year: "2025–2026",
    role: "Full Stack Developer",
    problem:
      "Pubs, cafés, and event spaces still run trivia with paper sheets, buzzers, and a human quizmaster — expensive to staff and hard to scale.",
    solution:
      "A web-first live trivia platform where guests join from their phones, an AI host runs the show, and venues launch nights without dedicated hardware.",
    stack: [
      "React",
      "TypeScript",
      "Next.js",
      "Realtime APIs",
      "Tailwind CSS",
      "Node.js",
    ],
    features: [
      "Phone-join gameplay with room codes",
      "Host screen optimized for TVs and projectors",
      "Themed quiz packs and tournament modes",
      "Rewards integration across the IntelliVerse ecosystem",
    ],
    responsibilities: [
      "Implemented responsive host and player web surfaces",
      "Integrated realtime session flows and API contracts",
      "Polished UI states for join, play, score, and end-of-round moments",
      "Collaborated with product on venue-facing conversion paths",
    ],
    challenges: [
      "Keeping latency-sensitive UI calm under concurrent joins",
      "Designing for TV distance readability and phone thumb reach",
      "Handling flaky venue Wi‑Fi without breaking the night",
    ],
    architecture: [
      "Client apps for host display and player controllers",
      "Session-oriented API for rooms, rounds, and scoring",
      "Shared design tokens for consistent brand across surfaces",
    ],
    tradeoffs: [
      "Web-first over native for zero-install venue onboarding",
      "Progressive enhancement for weak networks instead of offline-first complexity",
    ],
    performance: [
      "Code-split routes for host vs player experiences",
      "Optimistic UI for score updates where safe",
      "Asset budgeting for TV-scale backgrounds",
    ],
    accessibility: [
      "Large type and high-contrast host UI for distance viewing",
      "Keyboard-friendly admin controls",
      "Clear focus states on player join flows",
    ],
    lessons: [
      "Venue products win on reliability and clarity more than novelty",
      "Realtime UX needs explicit empty, reconnect, and late-join states",
    ],
    links: [
      { label: "Live", href: "https://quizverse.world/" },
      {
        label: "GitHub",
        href: "https://github.com/intelli-verse-x/Quizverse-web-frontend",
      },
    ],
    accent: "#38BDF8",
    image: "/images/projects/quizverse.jpg",
  },
  {
    slug: "contentx-studio",
    title: "ContentX Studio",
    tagline: "AI content engine for scripting, rendering, and publishing at production quality.",
    featured: true,
    year: "2025–2026",
    role: "Full Stack Developer",
    problem:
      "Marketing and product teams need consistent video and written content without stitching together five tools and losing brand control.",
    solution:
      "A Next.js studio experience that wraps ContentX’s AI pipeline — from brief to publishable media — with operator-friendly workflows.",
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST APIs",
    ],
    features: [
      "Studio workflows for briefs, drafts, and publish states",
      "Media pipeline integration with production ContentX",
      "Operator UI tuned for iterative content review",
      "Deployable Next.js frontend with environment-based config",
    ],
    responsibilities: [
      "Built and iterated on Next.js studio surfaces",
      "Wired frontend to content generation and status APIs",
      "Improved form UX, loading states, and error recovery",
      "Kept TypeScript models aligned with backend contracts",
    ],
    challenges: [
      "Long-running generation jobs need trustworthy progress UX",
      "Balancing rich previews with bundle and bandwidth budgets",
      "Making AI outputs editable without fighting the pipeline",
    ],
    architecture: [
      "App Router pages for studio modules",
      "API client layer with typed responses",
      "Server/client boundary for auth-sensitive actions",
    ],
    tradeoffs: [
      "Server Components by default; client islands for interactive studio controls",
      "Polling/status patterns over websockets for simpler ops initially",
    ],
    performance: [
      "Route-level code splitting for studio modules",
      "Deferred heavy preview components",
      "Cached static marketing adjacent pages where applicable",
    ],
    accessibility: [
      "Labeled forms and status announcements for generation jobs",
      "Keyboard operable dialogs and editors",
    ],
    lessons: [
      "AI products need exceptional empty and failure states",
      "Typed API boundaries save more time than clever UI shortcuts",
    ],
    links: [
      { label: "Live", href: "https://content-x.ai/" },
      {
        label: "GitHub",
        href: "https://github.com/intelli-verse-x/contentx-studio-next",
      },
    ],
    accent: "#0EA5E9",
    image: "/images/projects/contentx-studio.jpg",
  },
  {
    slug: "toba-tech",
    title: "ToBa Tech Website",
    tagline: "Company marketing site for an AI-native studio and product ecosystem.",
    featured: true,
    year: "2026",
    role: "Full Stack Developer",
    problem:
      "ToBa Tech / Intelli-Verse needed a credible web presence that explains the studio, products, and SDK without feeling like a generic agency template.",
    solution:
      "A polished marketing site that presents Discovery Sprint / Build Partner offerings, live product proof, and clear CTAs for builders and clients.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Hero and narrative sections for the Intelliverse story",
      "Product proof links (QuizVerse, ContentX, QuestX)",
      "Pricing packages and conversion CTAs",
      "SEO-ready structure for organic discovery",
    ],
    responsibilities: [
      "Implemented responsive marketing sections and navigation",
      "Ensured consistent typography, spacing, and motion restraint",
      "Wired CTAs to booking and product destinations",
      "Optimized assets and metadata for shareability",
    ],
    challenges: [
      "Communicating a multi-product ecosystem without overwhelming the first viewport",
      "Keeping animation subtle while still feeling premium",
    ],
    architecture: [
      "Section-based page composition",
      "Shared layout chrome and design tokens",
      "Static generation for marketing performance",
    ],
    tradeoffs: [
      "Narrative clarity over dense feature grids",
      "Static-first rendering for LCP over heavy client interactivity",
    ],
    performance: [
      "Optimized hero media and font loading",
      "Minimal client JS on marketing routes",
    ],
    accessibility: [
      "Semantic landmarks and skip-friendly structure",
      "Contrast-checked CTAs and body copy",
    ],
    lessons: [
      "Company sites convert when proof and pricing are honest and scannable",
      "Whitespace and hierarchy beat decorative chrome",
    ],
    links: [
      { label: "Live", href: "https://intelli-verse-x.ai/" },
      {
        label: "GitHub",
        href: "https://github.com/intelli-verse-x/toba-tech-website",
      },
    ],
    accent: "#0284C7",
    image: "/images/projects/toba-tech.jpg",
  },
  {
    slug: "chhavva",
    title: "Chhavva",
    tagline: "MERN e-commerce for culturally rooted fashion — browse, cart, checkout, admin.",
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    problem:
      "Independent fashion brands need a storefront that feels on-brand while supporting real commerce flows: catalog, cart, auth, and order ops.",
    solution:
      "A full-stack clothing platform with customer shopping UX and an admin dashboard for products and orders — built on the MERN stack.",
    stack: [
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "Node.js",
      "Express",
      "MongoDB",
      "JWT",
    ],
    features: [
      "Category browsing and product filters",
      "Cart and checkout with responsive UI",
      "JWT authentication and order management",
      "Admin dashboard for catalog and orders",
    ],
    responsibilities: [
      "Designed and built frontend shopping flows",
      "Implemented Express APIs and Mongoose models",
      "Wired Redux Toolkit for cart and auth state",
      "Built admin surfaces for product and order control",
    ],
    challenges: [
      "Keeping cart state consistent across refresh and auth boundaries",
      "Structuring admin vs customer routes without duplication",
      "Balancing aesthetic brand UI with form usability",
    ],
    architecture: [
      "Separate frontend, backend, and admin packages",
      "JWT-protected routes for user and admin roles",
      "MongoDB collections for products, users, and orders",
    ],
    tradeoffs: [
      "Monorepo-style folders over microservices for a solo-built MVP",
      "Redux Toolkit for predictable cart/auth over lighter local state",
    ],
    performance: [
      "Paginated catalog queries",
      "Lazy-loaded route chunks on the client",
    ],
    accessibility: [
      "Labeled form controls across auth and checkout",
      "Keyboard-reachable primary commerce actions",
    ],
    lessons: [
      "E-commerce is an exercise in state machines and edge cases",
      "Admin UX is as important as the customer storefront",
    ],
    links: [
      { label: "Live", href: "https://chhavva.vercel.app" },
      {
        label: "GitHub",
        href: "https://github.com/anuragarya8/Chhavva",
      },
    ],
    accent: "#F97316",
    image: "/images/projects/chhavva.jpg",
  },
  {
    slug: "restaurant",
    title: "Restaurant Website",
    tagline: "Frontend experience for a restaurant brand presence.",
    featured: false,
    year: "2025",
    role: "Frontend Developer",
    problem:
      "Restaurants need a modern web presence that showcases the menu and atmosphere and converts visitors into diners.",
    solution:
      "A responsive React frontend with clear sections for menu, story, and contact — tuned for mobile-first discovery.",
    stack: ["React", "JavaScript", "CSS", "Responsive UI"],
    features: [
      "Responsive marketing layout",
      "Menu and brand storytelling sections",
      "Contact and visit CTAs",
    ],
    responsibilities: [
      "Implemented frontend UI and responsive layouts",
      "Collaborated on visual polish and section structure",
    ],
    challenges: [
      "Mobile-first readability for menu content",
      "Keeping media-heavy sections performant",
    ],
    architecture: ["Component-driven React frontend"],
    tradeoffs: ["Static content structure for fast iteration"],
    performance: ["Image-conscious layout patterns"],
    accessibility: ["Semantic sectioning and readable type scales"],
    lessons: ["Hospitality sites convert on clarity and trust cues"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/intelli-verse-x/Restaurant-website-frontend",
      },
    ],
    accent: "#14B8A6",
  },
  {
    slug: "marketx",
    title: "marketX",
    tagline: "Personal full-stack experiment in marketplace-style product flows.",
    featured: false,
    year: "2024",
    role: "Full Stack Developer",
    problem:
      "Marketplace UIs demand listing discovery, detail pages, and transactional flows that stay coherent as features grow.",
    solution:
      "A personal project exploring marketplace patterns with a modern JavaScript stack.",
    stack: ["JavaScript", "React", "Node.js"],
    features: ["Listing-oriented UI patterns", "Full-stack experiment scaffolding"],
    responsibilities: [
      "Owned end-to-end implementation as a learning and portfolio build",
    ],
    challenges: ["Scoping MVP features without overbuilding"],
    architecture: ["Client + API separation"],
    tradeoffs: ["Learning velocity over production polish"],
    performance: ["Lean client bundles for core routes"],
    accessibility: ["Basic semantic HTML structure"],
    lessons: ["Marketplace domains teach composition and data modeling quickly"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/anuragarya8/marketX",
      },
    ],
    accent: "#6366F1",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs() {
  return projects.map((p) => p.slug);
}
