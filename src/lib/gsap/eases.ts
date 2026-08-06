export const EASE = {
  power2: "power2.out",
  power3: "power3.out",
  expo: "expo.out",
  circ: "circ.out",
  sine: "sine.inOut",
} as const;

export type EaseName = (typeof EASE)[keyof typeof EASE];
