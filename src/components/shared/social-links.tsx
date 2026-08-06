"use client";

import { Mail, Code2 } from "lucide-react";
import type { SocialLink } from "@/types";
import { cn } from "@/lib/cn";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/brand-icons";
import {
  trackExternalLink,
  trackGitHubClick,
  trackLinkedInClick,
} from "@/lib/analytics";

const icons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  twitter: GitHubIcon,
  leetcode: Code2,
};

export function SocialLinks({
  links,
  className,
  location = "hero",
}: {
  links: SocialLink[];
  className?: string;
  location?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {links.map((link) => {
        const Icon = icons[link.icon];
        return (
          <li key={link.href}>
            <a
              href={link.href}
              target={link.icon === "email" ? undefined : "_blank"}
              rel={link.icon === "email" ? undefined : "noopener noreferrer"}
              aria-label={link.label}
              className="inline-flex size-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition hover:border-accent/40 hover:text-foreground focus-ring"
              onClick={() => {
                if (link.icon === "github") {
                  trackGitHubClick(location, link.href);
                } else if (link.icon === "linkedin") {
                  trackLinkedInClick(location);
                } else if (link.icon !== "email") {
                  trackExternalLink(link.href, link.label, location);
                }
              }}
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
