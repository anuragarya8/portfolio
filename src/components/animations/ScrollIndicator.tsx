"use client";

import { ChevronDown } from "lucide-react";

export function ScrollIndicator() {
  return (
    <a
      href="#experience"
      data-hero="scroll-cue"
      aria-hidden="true"
      tabIndex={-1}
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground"
    >
      <span className="text-[10px] font-medium uppercase tracking-[0.2em]">
        Scroll
      </span>
      <span
        data-scroll-arrow
        className="flex size-8 items-center justify-center rounded-full border border-border bg-card/60"
      >
        <ChevronDown className="size-4" />
      </span>
    </a>
  );
}
