"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects } from "@/content/projects";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { GitHubIcon } from "@/components/shared/brand-icons";
import { useProjectsAnimation } from "@/hooks/useProjectsAnimation";
import {
  trackCaseStudyOpen,
  trackDemoClick,
  trackGitHubClick,
} from "@/lib/analytics";

export function ProjectsSection() {
  const listRef = useRef<HTMLDivElement>(null);
  useProjectsAnimation(listRef);

  return (
    <section
      id="projects"
      className="scroll-mt-24 border-t border-border bg-muted/30 py-24 sm:py-28"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup>
          <SectionHeading
            eyebrow="Featured work"
            title="Projects that prove the craft"
            description="Production products and full-stack builds — each with an engineering case study."
            titleId="projects-heading"
          />
        </RevealGroup>

        <div ref={listRef} className="mt-14 space-y-8">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              data-project-card
              className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
            >
              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                <div
                  data-project-media
                  className="relative min-h-[240px] overflow-hidden sm:min-h-[320px]"
                >
                  <div
                    data-project-media-inner
                    className="absolute inset-0 origin-center will-change-transform"
                  >
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} landing page screenshot`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover object-top"
                        priority={project.slug === "quizverse"}
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(145deg, ${project.accent}33, transparent 55%), linear-gradient(180deg, var(--muted), var(--card))`,
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  </div>
                  <div className="relative flex h-full min-h-[240px] flex-col justify-between p-8 sm:min-h-[320px] sm:p-10">
                    <Badge
                      variant="outline"
                      className="w-fit border-border/60 bg-card/80 backdrop-blur"
                    >
                      {project.year}
                    </Badge>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {project.role}
                      </p>
                      <h3 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        {project.title}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between p-8 sm:p-10">
                  <div>
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {project.tagline}
                    </p>
                    <div className="mt-6 space-y-4">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Problem
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Solution
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                          {project.solution}
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.stack.slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="muted">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Button asChild data-cursor="hover">
                      <Link
                        href={`/projects/${project.slug}`}
                        onClick={() => trackCaseStudyOpen(project.slug)}
                      >
                        Case study
                        <ArrowUpRight
                          data-project-arrow
                          className="size-4"
                        />
                      </Link>
                    </Button>
                    {project.links.map((link) => (
                      <Button
                        key={link.href}
                        asChild
                        variant="outline"
                        data-cursor="hover"
                      >
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            if (link.label === "GitHub") {
                              trackGitHubClick(
                                `projects:${project.slug}`,
                                link.href,
                              );
                            } else {
                              trackDemoClick(project.slug, link.href);
                            }
                          }}
                        >
                          {link.label === "GitHub" ? (
                            <GitHubIcon className="size-4" />
                          ) : null}
                          {link.label}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
