"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function CaseStudyMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || !ref.current || reducedMotion) {
      if (reducedMotion && ref.current) {
        ref.current
          .querySelectorAll<HTMLElement>("[data-case]")
          .forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
          });
      }
      return;
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !ref.current) return;
      const { gsap } = getGsap();
      const root = ref.current;
      const blocks = root.querySelectorAll<HTMLElement>("[data-case]");

      ctx = gsap.context(() => {
        blocks.forEach((block) => {
          gsap.fromTo(
            block,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: EASE.power3,
              scrollTrigger: {
                trigger: block,
                start: "top 88%",
                once: true,
              },
            },
          );
        });
      }, root);
    }

    void run();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion]);

  return <div ref={ref}>{children}</div>;
}
