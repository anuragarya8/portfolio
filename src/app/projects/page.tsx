import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  breadcrumbJsonLd,
  buildMetadata,
  jsonLdScript,
  webPageJsonLd,
} from "@/lib/seo";
import { seoConfig } from "@/config/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects & Case Studies",
  description:
    "Featured projects and engineering case studies by Anurag Arya — QuizVerse, ContentX Studio, ToBa Tech, Chhavva, and more full-stack work.",
  path: "/projects",
  keywords: [
    "Anurag Arya Projects",
    "Case Studies",
    "Next.js Portfolio",
    "Full Stack Projects",
    ...seoConfig.keywords.slice(0, 8),
  ],
});

export default function ProjectsIndexPage() {
  return (
    <div className="pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            name: "Projects & Case Studies",
            description:
              "Portfolio projects and engineering case studies by Anurag Arya.",
            path: "/projects",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
          ]),
        ])}
      />

      <div className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <p className="text-sm font-medium text-accent">Projects</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Work & case studies
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Production products and full-stack builds — each with problem,
            solution, architecture, and tradeoffs.
          </p>
          <nav aria-label="Breadcrumb" className="mt-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground focus-ring rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li className="text-foreground">Projects</li>
            </ol>
          </nav>
        </div>
      </div>

      <ul className="mx-auto mt-12 grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.slug}>
            <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition hover:border-accent/40 hover:shadow-soft">
              <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} landing page screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(145deg, ${project.accent}44, transparent 60%), var(--muted)`,
                    }}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{project.year}</Badge>
                  {project.featured ? (
                    <Badge variant="default">Featured</Badge>
                  ) : null}
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight">
                  {project.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {project.tagline}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="muted">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild>
                    <Link href={`/projects/${project.slug}`}>
                      Case study
                      <ArrowUpRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
