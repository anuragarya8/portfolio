"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

type Options = {
  stagger?: number;
  y?: number;
  scale?: number;
  start?: string;
};

export function useSectionReveal(
  ref: React.RefObject<HTMLElement | null>,
  options: Options = {},
) {
  const { ready, reducedMotion } = useAnimation();
  const {
    stagger = 0.08,
    y = 48,
    scale,
    start = "top 80%",
  } = options;
  const ran = useRef(false);

  useEffect(() => {
    if (!ready || !ref.current || reducedMotion || ran.current) {
      if (reducedMotion && ref.current) {
        ref.current
          .querySelectorAll<HTMLElement>("[data-reveal]")
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

      const eyebrow = root.querySelectorAll<HTMLElement>(
        '[data-reveal="eyebrow"]',
      );
      const heading = root.querySelectorAll<HTMLElement>(
        '[data-reveal="heading"]',
      );
      const description = root.querySelectorAll<HTMLElement>(
        '[data-reveal="description"]',
      );
      const items = root.querySelectorAll<HTMLElement>(
        '[data-reveal="item"]',
      );
      const ctas = root.querySelectorAll<HTMLElement>('[data-reveal="cta"]');

      const all = [...eyebrow, ...heading, ...description, ...items, ...ctas];
      if (!all.length) return;

      gsap.set(all, {
        autoAlpha: 0,
        y,
        ...(scale != null ? { scale } : {}),
      });

      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start,
            once: true,
          },
          defaults: { ease: EASE.power3, duration: 0.7 },
          onComplete: () => {
            gsap.set(all, { clearProps: "willChange" });
          },
        });

        if (eyebrow.length) {
          tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.55 }, 0);
        }
        if (heading.length) {
          tl.to(heading, { autoAlpha: 1, y: 0 }, "-=0.35");
        }
        if (description.length) {
          tl.to(description, { autoAlpha: 1, y: 0 }, "-=0.4");
        }
        if (items.length) {
          tl.to(
            items,
            {
              autoAlpha: 1,
              y: 0,
              ...(scale != null ? { scale: 1 } : {}),
              stagger,
              onStart() {
                gsap.set(items, { willChange: "transform, opacity" });
              },
            },
            "-=0.35",
          );
        }
        if (ctas.length) {
          tl.to(ctas, { autoAlpha: 1, y: 0, stagger: 0.08 }, "-=0.4");
        }
      }, root);

      ran.current = true;
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref, stagger, y, scale, start]);
}
