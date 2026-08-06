"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackExternalLink } from "@/lib/analytics";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventLocation?: string;
  linkText?: string;
  trackExternal?: boolean;
};

/**
 * Thin Link wrapper that records external_link for outbound anchors.
 */
export function TrackedLink({
  eventLocation = "unknown",
  linkText,
  trackExternal = true,
  onClick,
  children,
  href,
  ...props
}: TrackedLinkProps) {
  const hrefString = typeof href === "string" ? href : href.toString();
  const isExternal =
    hrefString.startsWith("http://") || hrefString.startsWith("https://");

  return (
    <Link
      href={href}
      onClick={(event) => {
        if (trackExternal && isExternal) {
          const text =
            linkText ??
            (typeof children === "string" ? children : hrefString);
          trackExternalLink(hrefString, text, eventLocation);
        }
        onClick?.(event);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
