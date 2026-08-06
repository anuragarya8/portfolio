"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { techCategories, techStack } from "@/content/tech";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";
import { cn } from "@/lib/cn";

function YearCounter({ years }: { years: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reducedMotion || !ready) {
      el.textContent = `${years}+ years`;
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !el) return;
      const { gsap } = getGsap();
      const state = { value: 0 };
      ctx = gsap.context(() => {
        gsap.to(state, {
          value: years,
          duration: 1.1,
          ease: EASE.power2,
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true,
          },
          onUpdate: () => {
            const v =
              years % 1 === 0
                ? Math.round(state.value)
                : state.value.toFixed(1);
            el.textContent = `${v}+ years`;
          },
        });
      });
    }

    void run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [years, ready, reducedMotion]);

  return <span ref={ref}>0+ years</span>;
}

export function TechSection() {
  const [active, setActive] = useState<(typeof techCategories)[number] | "All">(
    "All",
  );
  const gridRef = useRef<HTMLUListElement>(null);
  const { ready, reducedMotion } = useAnimation();

  const items = useMemo(() => {
    if (active === "All") return techStack;
    return techStack.filter((item) => item.category === active);
  }, [active]);

  const categories = [
    "All",
    ...techCategories.filter((c) => techStack.some((t) => t.category === c)),
  ] as const;

  useEffect(() => {
    if (!ready || reducedMotion || !gridRef.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !gridRef.current) return;
      const { gsap } = getGsap();
      const cards = gridRef.current.querySelectorAll<HTMLElement>(
        "[data-tech-card]",
      );

      ctx = gsap.context(() => {
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 40, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.04,
            ease: EASE.power3,
            overwrite: true,
          },
        );

        const fine = window.matchMedia("(pointer: fine)").matches;
        if (!fine) return;

        cards.forEach((card) => {
          const onEnter = () => {
            gsap.to(card, {
              y: -4,
              duration: 0.35,
              ease: EASE.power2,
              overwrite: "auto",
            });
          };
          const onLeave = () => {
            gsap.to(card, {
              y: 0,
              duration: 0.35,
              ease: EASE.power2,
              overwrite: "auto",
            });
          };
          card.addEventListener("mouseenter", onEnter);
          card.addEventListener("mouseleave", onLeave);
        });
      }, gridRef);
    }

    void run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [active, items, ready, reducedMotion]);

  return (
    <section
      id="tech"
      className="scroll-mt-24 border-t border-border py-24 sm:py-28"
      aria-labelledby="tech-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup>
          <SectionHeading
            eyebrow="Tech stack"
            title="Tools I use with intent"
            description="Confidence and real project usage — not fake percentage bars."
            titleId="tech-heading"
          />

          <div
            data-reveal="item"
            className="mt-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter tech by category"
          >
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active === category}
                onClick={() => setActive(category)}
                data-cursor="hover"
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition focus-ring",
                  active === category
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </RevealGroup>

        <ul
          ref={gridRef}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <li
              key={`${active}-${item.name}`}
              data-tech-card
              data-cursor="hover"
              className="group h-full rounded-2xl border border-border bg-card p-5 shadow-sm transition-[border-color,box-shadow] hover:border-accent/40 hover:shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.category}
                  </p>
                </div>
                <Badge variant="muted">{item.confidence}</Badge>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                <YearCounter years={item.years} />
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.usedIn.slice(0, 3).map((project) => (
                  <Badge key={project} variant="outline">
                    {project}
                  </Badge>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
