"use client";

import { useEffect, useRef } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function useNavAnimation(ref: React.RefObject<HTMLElement | null>) {
  const { ready, reducedMotion } = useAnimation();
  const played = useRef(false);

  useEffect(() => {
    if (!ready || !ref.current) return;

    const nav = ref.current;

    if (reducedMotion) {
      nav.style.opacity = "1";
      return;
    }

    if (played.current) return;

    let cancelled = false;
    let revertCtx: (() => void) | undefined;

    async function run() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !ref.current) return;
      const { gsap } = getGsap();

      gsap.fromTo(
        nav,
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          duration: 0.5,
          ease: EASE.power3,
          onComplete: () => {
            gsap.set(nav, { clearProps: "opacity,visibility" });
          },
        },
      );

      const onScroll = () => {
        if (window.scrollY > 24) {
          nav.classList.add("nav-scrolled");
        } else {
          nav.classList.remove("nav-scrolled");
        }
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });

      played.current = true;
      revertCtx = () => {
        window.removeEventListener("scroll", onScroll);
        gsap.killTweensOf(nav);
      };
    }

    void run();

    return () => {
      cancelled = true;
      revertCtx?.();
    };
  }, [ready, reducedMotion, ref]);
}
