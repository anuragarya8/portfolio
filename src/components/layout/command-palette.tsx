"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Briefcase, Copy, FolderGit2, Mail, Search } from "lucide-react";
import { navItems, siteConfig, socialLinks } from "@/content/site";
import { projects } from "@/content/projects";
import { cn } from "@/lib/cn";
import { GitHubIcon, LinkedInIcon } from "@/components/shared/brand-icons";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const actions = useMemo(
    () => [
      {
        id: "copy-email",
        label: "Copy email",
        icon: Copy,
        run: async () => {
          await navigator.clipboard.writeText(siteConfig.email);
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        icon: GitHubIcon,
        run: () =>
          window.open(
            socialLinks.find((s) => s.icon === "github")!.href,
            "_blank",
          ),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        icon: LinkedInIcon,
        run: () =>
          window.open(
            socialLinks.find((s) => s.icon === "linkedin")!.href,
            "_blank",
          ),
      },
      {
        id: "email",
        label: "Compose email",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${siteConfig.email}`;
        },
      },
    ],
    [],
  );

  function go(href: string) {
    setOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    router.push(href);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground shadow-sm transition hover:text-foreground md:inline-flex focus-ring"
        aria-label="Open command palette"
      >
        <Search className="size-3.5" />
        <span>Search</span>
        <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
          ⌘K
        </kbd>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-background/70 px-4 pt-[15vh] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <Command
            className={cn(
              "w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-soft",
            )}
          >
            <div className="flex items-center gap-2 border-b border-border px-3">
              <Search className="size-4 text-muted-foreground" />
              <Command.Input
                placeholder="Search sections, projects, actions…"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <Command.List className="max-h-80 overflow-y-auto p-2">
              <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found.
              </Command.Empty>

              <Command.Group
                heading="Sections"
                className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {navItems.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => go(item.href)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm aria-selected:bg-muted"
                  >
                    <Briefcase className="size-4 text-muted-foreground" />
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="Projects"
                className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {projects.map((project) => (
                  <Command.Item
                    key={project.slug}
                    value={`${project.title} ${project.tagline}`}
                    onSelect={() => go(`/projects/${project.slug}`)}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm aria-selected:bg-muted"
                  >
                    <FolderGit2 className="size-4 text-muted-foreground" />
                    {project.title}
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading="Actions"
                className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground"
              >
                {actions.map((action) => (
                  <Command.Item
                    key={action.id}
                    value={action.label}
                    onSelect={() => {
                      void action.run();
                      setOpen(false);
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-sm aria-selected:bg-muted"
                  >
                    <action.icon className="size-4 text-muted-foreground" />
                    {action.label}
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
          </Command>
        </div>
      ) : null}
    </>
  );
}
