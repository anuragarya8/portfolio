"use client";

import { useRef, type ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/cn";

export function Magnetic({
  children,
  className,
  strength = 0.35,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useMagnetic(ref, strength, max);

  return (
    <div ref={ref} className={cn("inline-flex will-change-transform", className)}>
      {children}
    </div>
  );
}
