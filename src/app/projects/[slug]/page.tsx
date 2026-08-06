import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getAllProjectSlugs,
  getProject,
  projects,
} from "@/content/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ReadingProgress } from "@/components/shared/reading-progress";
import { CaseStudyMotion } from "@/components/animations/CaseStudyMotion";
import { CaseStudyAnalytics } from "@/components/analytics/CaseStudyAnalytics";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  breadcrumbJsonLd,
  jsonLdScript,
  projectJsonLd,
  projectMetadata,
  webPageJsonLd,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return projectMetadata(project);
}

function CaseBlock({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <section data-case>
      <h2 className="text-xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="text-sm leading-relaxed text-muted-foreground"
          >
            <span className="mr-2 text-accent">▹</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript([
          webPageJsonLd({
            name: project.title,
            description: project.tagline,
            path: `/projects/${project.slug}`,
          }),
          projectJsonLd(project),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            {
              name: project.title,
              path: `/projects/${project.slug}`,
            },
          ]),
        ])}
      />
      <ReadingProgress />
      <CaseStudyMotion>
        <article className="pb-24">
          <div
            data-case
            className="border-b border-border"
            style={{
              background: `linear-gradient(160deg, ${project.accent}22, transparent 50%), var(--background)`,
            }}
          >
            <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Projects", href: "/projects" },
                  { label: project.title },
                ]}
              />

              <Button asChild variant="ghost" size="sm" className="-ml-2 mb-8">
                <Link href="/projects">
                  <ArrowLeft className="size-4" />
                  All projects
                </Link>
              </Button>

              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline">{project.year}</Badge>
                <Badge variant="muted">{project.role}</Badge>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                {project.tagline}
              </p>

              <CaseStudyAnalytics
                slug={project.slug}
                title={project.title}
                links={project.links}
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-4xl gap-12 px-4 py-14 sm:px-6">
            <div
              data-case
              className="relative overflow-hidden rounded-3xl border border-border shadow-soft"
            >
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} landing page screenshot showing the product interface`}
                  width={1440}
                  height={900}
                  className="h-auto w-full object-cover object-top"
                  priority
                />
              ) : (
                <div
                  className="flex min-h-[220px] items-end p-8 sm:min-h-[280px]"
                  style={{
                    background: `linear-gradient(145deg, ${project.accent}44, transparent 60%), linear-gradient(180deg, var(--muted), var(--card))`,
                  }}
                >
                  <div className="rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur">
                    <p className="text-xs text-muted-foreground">
                      Visual placeholder
                    </p>
                    <p className="text-sm font-medium">
                      Add screenshots to{" "}
                      <code className="font-mono text-xs">
                        public/images/projects/
                      </code>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div data-case className="grid gap-6 sm:grid-cols-2">
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Problem
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  {project.problem}
                </p>
              </section>
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Solution
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/90">
                  {project.solution}
                </p>
              </section>
            </div>

            <section data-case>
              <h2 className="text-xl font-semibold tracking-tight">
                Tech stack
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>

            <CaseBlock title="Architecture" items={project.architecture} />
            <CaseBlock
              title="Responsibilities"
              items={project.responsibilities}
            />
            <CaseBlock title="Features" items={project.features} />
            <CaseBlock title="Challenges" items={project.challenges} />
            <CaseBlock title="Tradeoffs" items={project.tradeoffs} />
            <CaseBlock title="Performance" items={project.performance} />
            <CaseBlock title="Accessibility" items={project.accessibility} />
            <CaseBlock title="Lessons learned" items={project.lessons} />

            {others.length ? (
              <section data-case className="border-t border-border pt-12">
                <h2 className="text-xl font-semibold tracking-tight">
                  More case studies
                </h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {others.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/projects/${item.slug}`}
                        className="block rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40 focus-ring"
                      >
                        <p className="font-semibold text-foreground">
                          {item.title}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {item.tagline}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </div>
        </article>
      </CaseStudyMotion>
    </>
  );
}
