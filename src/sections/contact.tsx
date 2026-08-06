"use client";

import { siteConfig, socialLinks } from "@/content/site";
import { SectionHeading } from "@/components/shared/section-heading";
import { StatusBadge } from "@/components/shared/status-badge";
import { CopyButton } from "@/components/shared/copy-button";
import { SocialLinks } from "@/components/shared/social-links";
import { ContactForm } from "@/sections/contact-form";
import { RevealGroup } from "@/components/animations/RevealGroup";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup>
          <SectionHeading
            eyebrow="Contact"
            title="Let’s build something sharp"
            description="Recruiters, founders, and agencies — reach out with context and I’ll reply quickly."
            titleId="contact-heading"
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div
              data-reveal="item"
              className="rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <StatusBadge label={siteConfig.availability.label} />
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Direct channels
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Prefer email? Copy it in one click. Prefer social? LinkedIn and
                GitHub are linked below.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-sm font-medium text-foreground underline-offset-4 hover:underline focus-ring rounded"
                  data-cursor="hover"
                >
                  {siteConfig.email}
                </a>
                <CopyButton value={siteConfig.email} label="Copy email" />
              </div>

              <SocialLinks links={socialLinks} className="mt-8" />

              <div className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
                <p>{siteConfig.location}</p>
                <p className="mt-1">{siteConfig.timezone}</p>
                {siteConfig.calendar ? (
                  <a
                    href={siteConfig.calendar}
                    className="mt-4 inline-block text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Book a call
                  </a>
                ) : (
                  <p className="mt-4 text-xs">
                    Calendar booking link coming soon — email works best for now.
                  </p>
                )}
              </div>
            </div>

            <div
              data-reveal="item"
              className="rounded-3xl border border-border bg-card p-8 shadow-soft"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                Send a message
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Share a short brief. I’ll respond with availability and next
                steps.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
