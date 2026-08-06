"use client";

import { useEffect } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useFloating(
  ref: React.RefObject<HTMLElement | null>,
  amplitude = 12,
  duration = 12,
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
          y: amplitude,
          duration,
          ease: EASE.sine,
          yoyo: true,
          repeat: -1,
        });
      }, ref);
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref, amplitude, duration]);
}
