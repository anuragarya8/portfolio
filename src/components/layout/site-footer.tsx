"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { navItems, siteConfig, socialLinks } from "@/content/site";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/brand-icons";
import { RevealGroup } from "@/components/animations/RevealGroup";
import {
  trackExternalLink,
  trackGitHubClick,
  trackLinkedInClick,
  trackNavClick,
} from "@/lib/analytics";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  twitter: GitHubIcon,
  leetcode: GitHubIcon,
};

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <RevealGroup
        stagger={0.06}
        y={32}
        className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]"
      >
        <div data-reveal="item">
          <p className="text-lg font-semibold tracking-tight">
            {siteConfig.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {siteConfig.role} based in {siteConfig.location}. Building premium
            full-stack products with clarity and care.
          </p>
        </div>

        <div data-reveal="item">
          <p className="text-sm font-medium text-foreground">Navigate</p>
          <ul className="mt-3 space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-muted-foreground transition hover:text-foreground focus-ring rounded"
                  data-cursor="hover"
                  onClick={() => trackNavClick(item.label, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/projects"
                className="text-sm text-muted-foreground transition hover:text-foreground focus-ring rounded"
                data-cursor="hover"
                onClick={() => trackNavClick("All projects", "/projects")}
              >
                All projects
              </Link>
            </li>
          </ul>
        </div>

        <div data-reveal="item">
          <p className="text-sm font-medium text-foreground">Connect</p>
          <ul className="mt-3 space-y-2">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon] ?? GitHubIcon;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.icon === "email" ? undefined : "_blank"}
                    rel={
                      link.icon === "email" ? undefined : "noopener noreferrer"
                    }
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground focus-ring rounded"
                    data-cursor="hover"
                    onClick={() => {
                      if (link.icon === "github") {
                        trackGitHubClick("footer", link.href);
                      } else if (link.icon === "linkedin") {
                        trackLinkedInClick("footer");
                      } else if (link.icon !== "email") {
                        trackExternalLink(link.href, link.label, "footer");
                      }
                    }}
                  >
                    <Icon className="size-4" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </RevealGroup>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p>
            {siteConfig.location} · {siteConfig.timezone}
          </p>
        </div>
      </div>
    </footer>
  );
}
