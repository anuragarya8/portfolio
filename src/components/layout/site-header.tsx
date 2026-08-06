"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { navItems, siteConfig } from "@/content/site";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { CommandPalette } from "@/components/layout/command-palette";
import { Magnetic } from "@/components/animations/Magnetic";
import { useNavAnimation } from "@/hooks/useNavAnimation";
import { cn } from "@/lib/cn";
import { trackHireMeClick, trackNavClick } from "@/lib/analytics";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useNavAnimation(headerRef);

  return (
    <header
      ref={headerRef}
      data-nav
      className="sticky top-0 z-50 border-b-0 bg-background"
    >
      <div className="bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground focus-ring rounded-md"
            data-cursor="hover"
          >
            {siteConfig.name}
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground focus-ring"
                data-cursor="hover"
                onClick={() => trackNavClick(item.label, item.href)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <CommandPalette />
            <ThemeToggle />
            <Magnetic className="hidden sm:inline-flex">
              <Button asChild size="sm" data-cursor="hover">
                <a
                  href="#contact"
                  onClick={() => trackHireMeClick("header")}
                >
                  Hire me
                </a>
              </Button>
            </Magnetic>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            className="overflow-hidden border-b border-border bg-background md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => {
                    trackNavClick(item.label, item.href);
                    setOpen(false);
                  }}
                  className={cn(
                    "rounded-lg px-3 py-3 text-sm text-foreground hover:bg-muted focus-ring",
                  )}
                >
                  {item.label}
                </a>
              ))}
              <Button asChild className="mt-2">
                <a
                  href="#contact"
                  onClick={() => {
                    trackHireMeClick("header_mobile");
                    setOpen(false);
                  }}
                >
                  Hire me
                </a>
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
