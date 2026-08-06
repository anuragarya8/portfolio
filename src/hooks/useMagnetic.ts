"use client";

import { useEffect } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useMagnetic(
  ref: React.RefObject<HTMLElement | null>,
  strength = 0.35,
  max = 6,
) {
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    const el = ref.current;
    if (!ready || !el || reducedMotion) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !el) return;
      const { gsap } = getGsap();

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: EASE.power3 });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: EASE.power3 });

      function onMove(e: MouseEvent) {
        const rect = el!.getBoundingClientRect();
        const relX = e.clientX - (rect.left + rect.width / 2);
        const relY = e.clientY - (rect.top + rect.height / 2);
        xTo(Math.max(-max, Math.min(max, relX * strength)));
        yTo(Math.max(-max, Math.min(max, relY * strength)));
      }

      function onLeave() {
        xTo(0);
        yTo(0);
      }

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      ctx = {
        revert: () => {
          el!.removeEventListener("mousemove", onMove);
          el!.removeEventListener("mouseleave", onLeave);
          gsap.set(el!, { x: 0, y: 0 });
        },
      };
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref, strength, max]);
}
