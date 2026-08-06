# Anurag Arya — Portfolio

Premium full-stack developer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP.

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Framer Motion + GSAP
- Lenis smooth scroll
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

`POST /api/contact` validates with Zod, then:

1. **Notifies you** at `CONTACT_TO` (defaults to your site email)
2. **Auto-replies** to the visitor confirming you received their message

### Brevo setup (recommended, free tier)

1. Create an API key in [Brevo](https://app.brevo.com) (leave IP allowlist empty for Vercel)
2. Verify a sender email under **Senders**
3. Add to `.env.local` / Vercel:

```bash
BREVO_API_KEY=your_key
BREVO_SENDER_EMAIL=kumaranurag296@gmail.com
BREVO_SENDER_NAME=Anurag Arya
CONTACT_TO=kumaranurag296@gmail.com
```

`BREVO_SENDER_EMAIL` and `CONTACT_TO` can be the same address. Restart the dev server after changing env vars.

Without Brevo (or Resend), the API falls back to opening a `mailto:` draft in the visitor’s email client.

## Deploy

Deploy to Vercel. Set `NEXT_PUBLIC_SITE_URL=https://anuragarya.io` for canonical URLs, sitemap, and JSON-LD.

### SEO

- Config: `src/config/seo.ts`
- Metadata helpers / JSON-LD: `src/lib/seo.ts`
- Dynamic OG image: `/opengraph-image`
- Sitemap: `/sitemap.xml` · Robots: `/robots.txt` · Manifest: `/manifest.webmanifest`

Optional env vars for verification and analytics are listed in `.env.example`.

## Google Analytics 4

This site uses a modular App Router analytics layer (`src/lib/analytics` + `AnalyticsProvider`) with Consent Mode v2, deduplicated SPA pageviews, and typed custom events. Vercel Analytics and Speed Insights remain separate and always load.

### Setup

1. Create a GA4 property in [Google Analytics](https://analytics.google.com/) and copy the Measurement ID (`G-XXXXXXXX`).
2. Locally, add to `.env.local`:

   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXX
   ```

3. On Vercel: **Project → Settings → Environment Variables** → set `NEXT_PUBLIC_GA_MEASUREMENT_ID` for Production (and Preview if desired), then redeploy.
4. Without the env var, the site ships with **zero** GA network calls.

### Consent

- Consent Mode v2 defaults to `denied` before tags load.
- By default, analytics consent is **auto-granted** so measurement works without a banner.
- When you add a cookie banner, set `NEXT_PUBLIC_GA_AUTO_CONSENT=false` and call `grantAnalyticsConsent()` / `denyAnalyticsConsent()` from `@/lib/analytics`.

### Local / Debug testing

1. Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and run `npm run dev`.
2. Open GA4 **Admin → DebugView** (dev builds send `debug_mode: true`).
3. In DevTools → Network, filter `collect` / `google-analytics` and confirm hits.
4. Navigate with in-app links to `/projects/[slug]` — you should see **one** `page_view` per unique URL (no duplicates on remount).
5. Click CTAs (Hire me, case study, contact submit, theme toggle) and confirm custom events in DebugView / console (`[analytics]` logs in development only).

### Production checklist

- [ ] Measurement ID set on Vercel Production
- [ ] Realtime / DebugView shows traffic after deploy
- [ ] SPA navigations emit a single pageview each
- [ ] Custom events appear under GA4 → Reports → Engagement → Events
- [ ] If using a cookie banner: `NEXT_PUBLIC_GA_AUTO_CONSENT=false` and consent APIs wired

### Event catalog

| Helper | Event name | Key params |
|---|---|---|
| `trackButtonClick` | `button_click` | `button_name`, `location` |
| `trackHireMeClick` | `hire_me_click` | `location` |
| `trackResumeDownload` | `resume_download` | `location` |
| `trackProjectView` | `project_view` | `project_slug`, `project_name` |
| `trackCaseStudyOpen` | `case_study_open` | `project_slug` |
| `trackDemoClick` | `demo_click` | `project_slug`, `url` |
| `trackGitHubClick` | `github_click` | `location`, `url` |
| `trackLinkedInClick` | `linkedin_click` | `location` |
| `trackExternalLink` | `external_link` | `url`, `link_text`, `location` |
| `trackContactFormSubmit` | `contact_form_submit` | `status` |
| `trackEmailCopy` | `email_copy` | `location` |
| `trackThemeChange` | `theme_change` | `theme` |
| `trackNavClick` | `nav_click` | `label`, `href` |
| `trackServiceInquiry` | `service_inquiry` | `service_id` |
| `trackBlogRead` | `blog_read` | reserved for future blog |
| `trackPageView` | `page_view` | `page_path`, `page_title` |

### Future providers

GTM (replace direct GA), Microsoft Clarity, and Plausible remain optional via env hooks. Prefer keeping Vercel Analytics for Web Vitals; add Search Console / ads conversion IDs when needed.
