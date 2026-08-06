"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimation } from "@/components/animations/AnimationProvider";

export function CustomCursor() {
  const { ready, reducedMotion } = useAnimation();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!ready || reducedMotion) {
      setEnabled(false);
      return;
    }

    const fine = window.matchMedia("(pointer: fine)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setEnabled(fine && wide);
  }, [ready, reducedMotion]);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let cancelled = false;
    let raf = 0;
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let hovering = false;

    document.documentElement.classList.add("has-custom-cursor");

    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
    }

    function onOver(e: MouseEvent) {
      const t = e.target as HTMLElement | null;
      hovering = Boolean(
        t?.closest("a, button, [data-cursor='hover'], input, textarea"),
      );
    }

    async function loop() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled) return;
      const { gsap } = getGsap();

      const tick = () => {
        rx += (mx - rx) * 0.18;
        ry += (my - ry) * 0.18;
        gsap.set(dot, { x: mx, y: my });
        gsap.set(ring, {
          x: rx,
          y: ry,
          scale: hovering ? 1.8 : 1,
          opacity: hovering ? 0.35 : 0.55,
        });
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    void loop();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent mix-blend-difference"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] size-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/50"
      />
    </>
  );
}
