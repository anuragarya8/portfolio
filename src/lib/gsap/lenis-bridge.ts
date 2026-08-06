import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";

type LenisLike = {
  on: (event: string, cb: () => void) => void;
  off?: (event: string, cb: () => void) => void;
  raf: (time: number) => void;
};

export function setupLenisProxy(
  lenis: LenisLike,
  gsap: typeof import("gsap").default,
  ScrollTrigger: typeof ScrollTriggerType,
) {
  const onScroll = () => ScrollTrigger.update();
  lenis.on("scroll", onScroll);

  const tickerFn = (time: number) => {
    lenis.raf(time * 1000);
  };
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tickerFn);
    lenis.off?.("scroll", onScroll);
  };
}
