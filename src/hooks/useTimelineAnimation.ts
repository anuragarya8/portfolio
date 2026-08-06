"use client";

import { useEffect } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useTimelineAnimation(
  ref: React.RefObject<HTMLElement | null>,
) {
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || !ref.current || reducedMotion) {
      if (reducedMotion && ref.current) {
        ref.current
          .querySelectorAll<HTMLElement>(
            "[data-timeline-line], [data-timeline-marker], [data-timeline-card], [data-timeline-bullet]",
          )
          .forEach((el) => {
            el.style.opacity = "1";
            el.style.transform = "none";
            el.style.visibility = "visible";
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

      const line = root.querySelector<HTMLElement>("[data-timeline-line]");
      const cards = root.querySelectorAll<HTMLElement>("[data-timeline-card]");
      const markers = root.querySelectorAll<HTMLElement>(
        "[data-timeline-marker]",
      );

      ctx = gsap.context(() => {
        if (line) {
          gsap.set(line, { scaleY: 0, transformOrigin: "top center" });
          gsap.to(line, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 75%",
              end: "bottom 55%",
              scrub: 0.5,
            },
          });
        }

        cards.forEach((card, i) => {
          const marker = markers[i];
          const bullets = card.querySelectorAll<HTMLElement>(
            "[data-timeline-bullet]",
          );

          gsap.set(card, { autoAlpha: 0, y: 28 });
          if (marker) {
            gsap.set(marker, {
              autoAlpha: 0,
              scale: 0.6,
              transformOrigin: "50% 50%",
            });
          }
          if (bullets.length) gsap.set(bullets, { autoAlpha: 0, y: 10 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          });

          if (marker) {
            tl.to(marker, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.35,
              ease: EASE.power3,
            });
          }

          tl.to(
            card,
            { autoAlpha: 1, y: 0, duration: 0.65, ease: EASE.power3 },
            marker ? "-=0.15" : 0,
          );

          if (bullets.length) {
            tl.to(
              bullets,
              {
                autoAlpha: 1,
                y: 0,
                stagger: 0.05,
                duration: 0.4,
                ease: EASE.power2,
              },
              "-=0.35",
            );
          }
        });
      }, root);
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref]);
}
