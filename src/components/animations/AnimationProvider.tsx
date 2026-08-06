"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { getPrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type LenisInstance = {
  destroy: () => void;
  raf: (time: number) => void;
  on: (event: string, cb: () => void) => void;
  off: (event: string, cb: () => void) => void;
  scroll: number;
  resize: () => void;
};

type AnimationContextValue = {
  ready: boolean;
  reducedMotion: boolean;
  lenis: LenisInstance | null;
};

const AnimationContext = createContext<AnimationContextValue>({
  ready: false,
  reducedMotion: false,
  lenis: null,
});

export function useAnimation() {
  return useContext(AnimationContext);
}

export function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [lenis, setLenis] = useState<LenisInstance | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const markReady = useCallback(() => {
    document.documentElement.classList.add("motion-ready");
    setReady(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) {
        document.documentElement.classList.add("motion-ready");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      cleanupRef.current?.();
      cleanupRef.current = null;
      setReady(false);
      document.documentElement.classList.remove("motion-ready");

      const reduced = getPrefersReducedMotion();
      setReducedMotion(reduced);

      if (reduced) {
        document.documentElement.classList.add("prefers-reduced");
        markReady();
        setLenis(null);
        return;
      }

      document.documentElement.classList.remove("prefers-reduced");

      const [{ default: Lenis }, { getGsap }] = await Promise.all([
        import("lenis"),
        import("@/lib/gsap/client"),
      ]);

      if (cancelled) return;

      const { gsap, ScrollTrigger } = getGsap();
      const { setupLenisProxy } = await import("@/lib/gsap/lenis-bridge");

      const instance = new Lenis({
        duration: 1.1,
        smoothWheel: true,
      }) as unknown as LenisInstance;

      document.documentElement.classList.add("lenis", "lenis-smooth");

      const teardownProxy = setupLenisProxy(instance, gsap, ScrollTrigger);
      setLenis(instance);

      const fontsReady =
        "fonts" in document
          ? document.fonts.ready.catch(() => undefined)
          : Promise.resolve();

      await fontsReady;
      if (cancelled) return;

      ScrollTrigger.refresh();
      markReady();

      cleanupRef.current = () => {
        teardownProxy();
        instance.destroy();
        document.documentElement.classList.remove("lenis", "lenis-smooth");
        ScrollTrigger.getAll().forEach((t) => t.kill());
        setLenis(null);
      };
    }

    void init();

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, [pathname, markReady]);

  const value = useMemo(
    () => ({ ready, reducedMotion, lenis }),
    [ready, reducedMotion, lenis],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
