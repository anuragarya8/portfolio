"use client";

import { useEffect, useRef } from "react";

export function HeroSpotlight({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    const glow = glowRef.current;
    if (!target || !glow) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    function onMove(e: MouseEvent) {
      const rect = target!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glow!.style.setProperty("--spot-x", `${x}px`);
      glow!.style.setProperty("--spot-y", `${y}px`);
    }

    target.addEventListener("mousemove", onMove);
    return () => target.removeEventListener("mousemove", onMove);
  }, [targetRef]);

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden md:block"
      style={{
        background:
          "radial-gradient(500px circle at var(--spot-x, 50%) var(--spot-y, 30%), var(--glow), transparent 45%)",
      }}
    />
  );
}
