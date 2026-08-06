"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowDownRight, Download } from "lucide-react";
import { siteConfig, socialLinks } from "@/content/site";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/status-badge";
import { SocialLinks } from "@/components/shared/social-links";
import { HeroSpotlight } from "@/components/shared/hero-spotlight";
import { ScrollIndicator } from "@/components/animations/ScrollIndicator";
import { Magnetic } from "@/components/animations/Magnetic";
import { useHeroAnimation } from "@/hooks/useHeroAnimation";
import { useParallax } from "@/hooks/useParallax";
import {
  trackButtonClick,
  trackHireMeClick,
  trackResumeDownload,
} from "@/lib/analytics";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);
  useHeroAnimation(sectionRef);
  useParallax(meshRef, 8);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* <div ref={meshRef} className="pointer-events-none absolute inset-0 gradient-mesh">
        <div
          data-hero-blob
          className="hero-blob left-[8%] top-0 size-64 bg-accent/30"
        />
        <div
          data-hero-blob
          className="hero-blob right-[10%] top-[8%] size-72 bg-sky-400/20"
        />
        <div
          data-hero-blob
          className="hero-blob bottom-[15%] left-[40%] size-48 bg-cyan-400/15"
        />
      </div> */}

      <HeroSpotlight targetRef={sectionRef} />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-4 py-20 sm:px-6 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <div data-hero="badge">
              <StatusBadge label={siteConfig.availability.label} />
            </div>

            <div
              data-hero="identity"
              className="mt-8 flex items-center gap-4 sm:gap-5"
            >
              <div
                data-hero="avatar"
                className="avatar-blob size-32 shrink-0 sm:size-36"
              >
                <Image
                  src={siteConfig.avatar}
                  alt={`${siteConfig.name} profile photo`}
                  width={144}
                  height={144}
                  priority
                  className="size-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-accent">
                  {siteConfig.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {siteConfig.location} · 2+ years
                </p>
              </div>
            </div>

            <h1
              id="hero-heading"
              data-hero="headline"
              className="mt-8 text-5xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl"
            >
              {siteConfig.name}
            </h1>

            <p
              data-hero="description"
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
            >
              {siteConfig.valueProposition}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <span data-hero="button" className="inline-flex">
                  <Button asChild size="lg" data-cursor="hover">
                    <a
                      href="#projects"
                      onClick={() =>
                        trackButtonClick("view_projects", "hero")
                      }
                    >
                      View projects
                      <ArrowDownRight className="size-4" />
                    </a>
                  </Button>
                </span>
              </Magnetic>
              <Magnetic>
                <span data-hero="button" className="inline-flex">
                  <Button asChild size="lg" variant="secondary" data-cursor="hover">
                    <a
                      href="#contact"
                      onClick={() => trackHireMeClick("hero")}
                    >
                      Hire me
                    </a>
                  </Button>
                </span>
              </Magnetic>
              {siteConfig.resume ? (
                <span data-hero="button" className="inline-flex">
                  <Button asChild size="lg" variant="outline">
                    <a
                      href={siteConfig.resume}
                      download
                      onClick={() => trackResumeDownload("hero")}
                    >
                      <Download className="size-4" />
                      Resume
                    </a>
                  </Button>
                </span>
              ) : null}
            </div>

            <div data-hero="social" className="mt-8">
              <SocialLinks links={socialLinks} />
            </div>
          </div>

          <div
            data-hero="card"
            className="hidden w-full max-w-xs rounded-3xl border border-border bg-card/70 p-6 shadow-soft backdrop-blur lg:block"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Currently
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">
              Full Stack Developer
            </p>
            <p className="mt-1 text-sm text-muted-foreground">ToBa Tech</p>
            <div className="mt-6 space-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <p>Shipping QuizVerse, ContentX, and studio marketing sites.</p>
              <p>Open to freelance product builds and full-time roles.</p>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
