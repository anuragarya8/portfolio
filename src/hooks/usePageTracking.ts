"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { trackPageView } from "@/lib/analytics";
import { useAnalyticsConsent } from "@/hooks/useAnalyticsConsent";

export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const consent = useAnalyticsConsent();

  useEffect(() => {
    if (consent !== "granted") return;
    const search = searchParams?.toString();
    const url = search ? `${pathname}?${search}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams, consent]);
}
