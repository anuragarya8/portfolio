"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";
import { splitLines, revertSplit } from "@/lib/gsap/split-lines";

export function useHeroAnimation(ref: React.RefObject<HTMLElement | null>) {
  const { ready, reducedMotion } = useAnimation();
  const played = useRef(false);

  useEffect(() => {
    if (!ready || !ref.current) return;

    const root = ref.current;

    if (reducedMotion) {
      root
        .querySelectorAll<HTMLElement>(
          "[data-hero], [data-hero-item], .split-line-inner",
        )
        .forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "none";
          el.style.filter = "none";
        });
      return;
    }

    if (played.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    const headline = root.querySelector<HTMLElement>("[data-hero='headline']");

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !ref.current) return;
      const { gsap } = getGsap();

      let lineInners: HTMLElement[] = [];
      if (headline) {
        lineInners = splitLines(headline);
      }

      const badge = root.querySelector<HTMLElement>("[data-hero='badge']");
      const identity = root.querySelector<HTMLElement>(
        "[data-hero='identity']",
      );
      const description = root.querySelector<HTMLElement>(
        "[data-hero='description']",
      );
      const buttons = root.querySelectorAll<HTMLElement>(
        "[data-hero='button']",
      );
      const social = root.querySelector<HTMLElement>("[data-hero='social']");
      const card = root.querySelector<HTMLElement>("[data-hero='card']");
      const scrollCue = root.querySelector<HTMLElement>(
        "[data-hero='scroll-cue']",
      );
      const avatar = root.querySelector<HTMLElement>("[data-hero='avatar']");
      const blobs = root.querySelectorAll<HTMLElement>("[data-hero-blob]");

      ctx = gsap.context(() => {
        if (badge) gsap.set(badge, { autoAlpha: 0, y: 24 });
        if (identity) gsap.set(identity, { autoAlpha: 0, y: 24 });
        // Animate avatar with identity — nested autoAlpha on child can leave it stuck hidden
        if (avatar) gsap.set(avatar, { scale: 1.08, rotate: -2 });
        if (lineInners.length) {
          gsap.set(lineInners, {
            autoAlpha: 0,
            y: 80,
            rotateX: 12,
            transformPerspective: 800,
          });
        }
        if (description) gsap.set(description, { autoAlpha: 0, y: 30 });
        if (buttons.length) {
          gsap.set(buttons, { autoAlpha: 0, y: 25, scale: 0.94 });
        }
        if (social) gsap.set(social, { autoAlpha: 0, y: 20 });
        if (card) gsap.set(card, { autoAlpha: 0, y: 30 });
        if (scrollCue) gsap.set(scrollCue, { autoAlpha: 0, y: 12 });

        const tl = gsap.timeline({
          defaults: { ease: EASE.power3 },
          delay: 0.05,
        });

        if (badge) tl.to(badge, { autoAlpha: 1, y: 0, duration: 0.55 }, 0);
        if (identity) {
          tl.to(identity, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.25");
        }
        if (avatar) {
          tl.to(
            avatar,
            { scale: 1, rotate: 0, duration: 0.75 },
            "-=0.55",
          );
        }
        if (lineInners.length) {
          tl.to(
            lineInners,
            {
              autoAlpha: 1,
              y: 0,
              rotateX: 0,
              duration: 0.85,
              stagger: 0.08,
            },
            "-=0.35",
          );
        }
        if (description) {
          tl.to(description, { autoAlpha: 1, y: 0, duration: 0.65 }, "-=0.45");
        }
        if (buttons.length) {
          tl.to(
            buttons,
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              stagger: 0.1,
            },
            "-=0.35",
          );
        }
        if (social) {
          tl.to(social, { autoAlpha: 1, y: 0, duration: 0.55 }, "-=0.35");
        }
        if (blobs.length) {
          blobs.forEach((blob, i) => {
            gsap.to(blob, {
              y: i % 2 === 0 ? 12 : -10,
              x: i % 2 === 0 ? 8 : -6,
              duration: 10 + i * 2,
              ease: EASE.sine,
              yoyo: true,
              repeat: -1,
            });
          });
        }
        if (card) {
          tl.to(card, { autoAlpha: 1, y: 0, duration: 0.7 }, "-=0.45");
        }
        if (scrollCue) {
          tl.to(scrollCue, { autoAlpha: 1, y: 0, duration: 0.5 }, "-=0.3");
          gsap.to(scrollCue.querySelector("[data-scroll-arrow]"), {
            y: 6,
            duration: 1.4,
            ease: EASE.sine,
            yoyo: true,
            repeat: -1,
          });
          gsap.to(scrollCue, {
            opacity: 0.45,
            duration: 1.6,
            ease: EASE.sine,
            yoyo: true,
            repeat: -1,
          });
        }
      }, root);

      played.current = true;
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
      if (headline) revertSplit(headline);
      played.current = false;
    };
  }, [ready, reducedMotion, ref]);
}
