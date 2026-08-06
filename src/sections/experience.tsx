"use client";

import { useRef } from "react";
import { experience } from "@/content/experience";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { useTimelineAnimation } from "@/hooks/useTimelineAnimation";
import { cn } from "@/lib/cn";

export function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  useTimelineAnimation(timelineRef);

  return (
    <section
      id="experience"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup>
          <SectionHeading
            eyebrow="Experience"
            title="Where I’ve built and shipped"
            description="A focused timeline of roles across product and client delivery."
            titleId="experience-heading"
          />
        </RevealGroup>

        <div ref={timelineRef} className="relative mt-14 max-w-3xl">
          <div
            data-timeline-line
            className="absolute bottom-3 left-[7px] top-3 w-px -translate-x-1/2 bg-border"
            aria-hidden
          />

          <ol className="relative space-y-6">
            {experience.map((item) => (
              <li key={item.id} className="relative pl-10 sm:pl-11">
                <span
                  data-timeline-marker
                  className={cn(
                    "absolute left-0 top-7 z-10 size-3.5 rounded-full border-2 border-accent bg-background",
                    "origin-center",
                    item.current && "bg-accent ring-4 ring-accent/20",
                  )}
                  aria-hidden
                />

                <article
                  data-timeline-card
                  className={cn(
                    "rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6",
                    item.current && "border-accent/25",
                  )}
                >
                  <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {item.company}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {item.location}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2 sm:justify-end">
                      <p className="text-sm text-muted-foreground">
                        {item.start} — {item.end}
                      </p>
                      {item.current ? (
                        <Badge variant="success" className="h-5 px-2 py-0">
                          Current
                        </Badge>
                      ) : null}
                    </div>
                  </header>

                  <ul className="mt-4 space-y-2.5 border-t border-border/70 pt-4">
                    {item.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        data-timeline-bullet
                        className="grid grid-cols-[0.75rem_1fr] gap-x-2 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1.5 rounded-full bg-accent/80" aria-hidden />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <Badge key={tech} variant="muted">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
