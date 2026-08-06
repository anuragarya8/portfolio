"use client";

import { useRef, type ReactNode } from "react";
import { useSectionReveal } from "@/hooks/useSectionReveal";

export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  y = 48,
  scale,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  scale?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useSectionReveal(ref, { stagger, y, scale });

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
