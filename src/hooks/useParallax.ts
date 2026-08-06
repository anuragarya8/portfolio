"use client";

import { useEffect } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";

export function useParallax(
  ref: React.RefObject<HTMLElement | null>,
  yPercent = 10,
) {
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || !ref.current || reducedMotion) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !ref.current) return;
      const { gsap } = getGsap();

      ctx = gsap.context(() => {
        gsap.to(ref.current, {
          yPercent,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }, ref);
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref, yPercent]);
}
