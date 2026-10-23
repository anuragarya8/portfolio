# Anurag Arya — Portfolio

Personal portfolio site for job hunting: projects, experience, and contact. Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

**Live:** [portfolio-orpin-sigma-37.vercel.app](https://portfolio-orpin-sigma-37.vercel.app)  
**LinkedIn:** [linkedin.com/in/anuragarya8](https://www.linkedin.com/in/anuragarya8/)

## Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP + Lenis
- shadcn-style UI primitives
- Vercel Analytics + Speed Insights

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content

Edit typed modules in `src/content/`:

- `site.ts` — identity, links, availability
- `experience.ts` — timeline
- `projects.ts` — featured work + case studies
- `tech.ts`, `about.ts`, `process.ts`, `services.ts`

Add screenshots under `public/images/projects/` and resume at `public/resume.pdf`.

## Contact API

`POST /api/contact` validates with Zod, then notifies you and auto-replies to the visitor.
