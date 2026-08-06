"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;

    let lenis: { destroy: () => void; raf: (t: number) => void } | undefined;
    let frame = 0;
    let cancelled = false;

    async function init() {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;

      lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      });

      document.documentElement.classList.add("lenis", "lenis-smooth");

      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);
    }

    void init();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
      lenis?.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}
