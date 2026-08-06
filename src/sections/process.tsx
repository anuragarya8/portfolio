"use client";

import { processSteps } from "@/content/process";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup } from "@/components/animations/RevealGroup";

export function ProcessSection() {
  return (
    <section
      id="process"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28"
      aria-labelledby="process-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup stagger={0.06}>
          <SectionHeading
            eyebrow="Process"
            title="How engagements actually run"
            description="A clear path from discovery to maintenance — built for clients who value predictability."
            titleId="process-heading"
          />

          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                key={step.id}
                data-reveal="item"
                className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <p className="font-mono text-xs text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </RevealGroup>
      </div>
    </section>
  );
}
