import type { Metadata } from "next";
import { HeroSection } from "@/sections/hero";
import { ExperienceSection } from "@/sections/experience";
import { AboutSection } from "@/sections/about";
import { TechSection } from "@/sections/tech";
import { ProjectsSection } from "@/sections/projects";
import { ProcessSection } from "@/sections/process";
import { ServicesSection } from "@/sections/services";
import { ContactSection } from "@/sections/contact";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  path: "/",
  type: "website",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ExperienceSection />
      <AboutSection />
      <TechSection />
      <ProjectsSection />
      <ProcessSection />
      <ServicesSection />
      <ContactSection />
    </>
  );
}
