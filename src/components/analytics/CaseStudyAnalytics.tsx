"use client";

import { useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/shared/brand-icons";
import {
  trackCaseStudyOpen,
  trackDemoClick,
  trackGitHubClick,
  trackProjectView,
} from "@/lib/analytics";

type ProjectLink = {
  label: string;
  href: string;
};

export function CaseStudyAnalytics({
  slug,
  title,
  links,
}: {
  slug: string;
  title: string;
  links: ProjectLink[];
}) {
  useEffect(() => {
    trackCaseStudyOpen(slug);
    trackProjectView(slug, title);
  }, [slug, title]);

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {links.map((link) => {
        const isGitHub = link.label === "GitHub";
        return (
          <Button key={link.href} asChild variant="outline">
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (isGitHub) {
                  trackGitHubClick(`case_study:${slug}`, link.href);
                } else {
                  trackDemoClick(slug, link.href);
                }
              }}
            >
              {isGitHub ? (
                <GitHubIcon className="size-4" />
              ) : (
                <ArrowUpRight className="size-4" />
              )}
              {link.label}
            </a>
          </Button>
        );
      })}
    </div>
  );
}
