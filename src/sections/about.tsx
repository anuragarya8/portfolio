"use client";

import { useEffect, useRef, useState } from "react";
import { aboutBlocks } from "@/content/about";
import { SectionHeading } from "@/components/shared/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { useAnimation } from "@/components/animations/AnimationProvider";
import { EASE } from "@/lib/gsap/eases";

export function AboutSection() {
  const [value, setValue] = useState(aboutBlocks[0].id);
  const panelRef = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useAnimation();

  useEffect(() => {
    if (!ready || reducedMotion || !panelRef.current) return;

    let cancelled = false;

    async function animate() {
      const { getGsap } = await import("@/lib/gsap/client");
      if (cancelled || !panelRef.current) return;
      const { gsap } = getGsap();
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 16 },
        { autoAlpha: 1, y: 0, duration: 0.45, ease: EASE.power2 },
      );
    }

    void animate();
    return () => {
      cancelled = true;
    };
  }, [value, ready, reducedMotion]);

  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-border bg-muted/30 py-24 sm:py-28"
      aria-labelledby="about-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <RevealGroup>
          <SectionHeading
            eyebrow="About"
            title="How I think and work"
            description="Not a wall of bio text — the operating system behind the work."
            titleId="about-heading"
          />

          <div data-reveal="item" className="mt-12">
            <Tabs value={value} onValueChange={setValue}>
              <TabsList
                className="h-auto w-full flex-wrap justify-start"
                aria-label="About topics"
              >
                {aboutBlocks.map((block) => (
                  <TabsTrigger key={block.id} value={block.id}>
                    {block.title}
                  </TabsTrigger>
                ))}
              </TabsList>

              {aboutBlocks.map((block) => (
                <TabsContent key={block.id} value={block.id}>
                  <div
                    ref={value === block.id ? panelRef : undefined}
                    className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10"
                  >
                    <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                      {block.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                      {block.body}
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}
