"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useCounter(
  ref: React.RefObject<HTMLElement | null>,
  target: number,
  suffix = "+",
) {
  const { ready, reducedMotion } = useAnimation();
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    if (!ready || started.current) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !el) return;
      const { gsap } = getGsap();

      const state = { value: 0 };
      el.textContent = `0${suffix}`;

      ctx = gsap.context(() => {
        gsap.to(state, {
          value: target,
          duration: 1.2,
          ease: EASE.power2,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      });

      started.current = true;
    }

    void run();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [ready, reducedMotion, ref, target, suffix]);
}
