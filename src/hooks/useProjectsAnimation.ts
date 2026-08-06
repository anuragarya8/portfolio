"use client";

import { useEffect } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useProjectsAnimation(
  ref: React.RefObject<HTMLElement | null>,
) {
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || !ref.current || reducedMotion) {
      if (reducedMotion && ref.current) {
        ref.current
          .querySelectorAll<HTMLElement>(
            "[data-project-card], [data-project-media]",
          )
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
      const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");
      const fine = window.matchMedia("(pointer: fine)").matches;

      ctx = gsap.context(() => {
        cards.forEach((card) => {
          const media = card.querySelector<HTMLElement>("[data-project-media]");
          const mediaInner = card.querySelector<HTMLElement>(
            "[data-project-media-inner]",
          );
          const arrow = card.querySelector<HTMLElement>("[data-project-arrow]");

          gsap.set(card, { autoAlpha: 0, y: 80, scale: 0.97 });
          if (mediaInner) gsap.set(mediaInner, { scale: 1.12 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              once: true,
            },
          });

          tl.to(card, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: EASE.power3,
          });
          if (mediaInner) {
            tl.to(
              mediaInner,
              { scale: 1, duration: 1, ease: EASE.power3 },
              "-=0.7",
            );
          }

          if (fine) {
            card.addEventListener("mouseenter", () => {
              gsap.to(card, {
                y: -6,
                duration: 0.4,
                ease: EASE.power2,
                overwrite: "auto",
              });
              if (mediaInner) {
                gsap.to(mediaInner, {
                  scale: 1.05,
                  duration: 0.5,
                  ease: EASE.power2,
                  overwrite: "auto",
                });
              }
              if (arrow) {
                gsap.to(arrow, {
                  x: 4,
                  duration: 0.35,
                  ease: EASE.power2,
                  overwrite: "auto",
                });
              }
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(card, {
                y: 0,
                duration: 0.4,
                ease: EASE.power2,
                overwrite: "auto",
              });
              if (mediaInner) {
                gsap.to(mediaInner, {
                  scale: 1,
                  duration: 0.5,
                  ease: EASE.power2,
                  overwrite: "auto",
                });
              }
              if (arrow) {
                gsap.to(arrow, {
                  x: 0,
                  duration: 0.35,
                  ease: EASE.power2,
                  overwrite: "auto",
                });
              }
            });
          }

          void media;
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
