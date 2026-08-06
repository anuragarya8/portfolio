"use client";

import { useEffect, useRef } from "react";
import {
  Globe,
  LayoutDashboard,
  Server,
  Sparkles,
  Zap,
  Palette,
  MessageSquare,
} from "lucide-react";
import { services } from "@/content/services";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";
import { trackServiceInquiry } from "@/lib/analytics";

const iconMap = {
  globe: Globe,
  layout: LayoutDashboard,
  server: Server,
  sparkles: Sparkles,
  zap: Zap,
  palette: Palette,
  message: MessageSquare,
};

export function ServicesSection() {
  const listRef = useRef<HTMLUListElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || reducedMotion || !listRef.current) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let cancelled = false;
    const cleanups: Array<() => void> = [];

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !listRef.current) return;
      const { gsap } = getGsap();
      const cards = listRef.current.querySelectorAll<HTMLElement>(
        "[data-service-card]",
      );

      cards.forEach((card) => {
        const icon = card.querySelector<HTMLElement>("[data-service-icon]");
        const onEnter = () => {
          gsap.to(card, {
            y: -4,
            duration: 0.35,
            ease: EASE.power2,
            overwrite: "auto",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 5,
              duration: 0.35,
              ease: EASE.power2,
              overwrite: "auto",
            });
          }
        };
        const onLeave = () => {
          gsap.to(card, {
            y: 0,
            duration: 0.35,
            ease: EASE.power2,
            overwrite: "auto",
          });
          if (icon) {
            gsap.to(icon, {
              rotate: 0,
              duration: 0.35,
              ease: EASE.power2,
              overwrite: "auto",
            });
          }
        };
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mouseenter", onEnter);
          card.removeEventListener("mouseleave", onLeave);
        });
      });
    }

    void run();
    return () => {
      cancelled = true;
      cleanups.forEach((fn) => fn());
    };
  }, [ready, reducedMotion]);

  return (
    <section
      id="services"
      className="scroll-mt-24 border-t border-border bg-muted/30 py-24 sm:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup stagger={0.06}>
          <SectionHeading
            eyebrow="Services"
            title="What I can take off your plate"
            description="Freelance and contract work spanning product UI, APIs, and performance."
            titleId="services-heading"
          />

          <ul
            ref={listRef}
            className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {services.map((service) => {
              const Icon =
                iconMap[service.icon as keyof typeof iconMap] ?? Sparkles;
              return (
                <li
                  key={service.id}
                  data-reveal="item"
                  data-service-card
                  data-cursor="hover"
                  className="h-full rounded-2xl border border-border bg-card p-6 shadow-sm transition-[border-color,box-shadow] hover:border-accent/35 hover:shadow-soft"
                >
                  <a
                    href="#contact"
                    className="block h-full focus-ring rounded-xl"
                    onClick={() => trackServiceInquiry(service.id)}
                  >
                    <div
                      data-service-icon
                      className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent will-change-transform"
                    >
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </a>
                </li>
              );
            })}
          </ul>
        </RevealGroup>
      </div>
    </section>
  );
}
