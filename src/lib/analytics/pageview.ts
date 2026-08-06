import { getConsentState } from "@/lib/analytics/consent";
import { isGaEnabled } from "@/lib/analytics/config";
import { analyticsLog } from "@/lib/analytics/logger";

let lastTrackedUrl: string | null = null;

function canSend() {
  if (!isGaEnabled()) return false;
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  return getConsentState() === "granted";
}

export function trackPageView(url: string, title?: string) {
  if (!url) return;
  if (lastTrackedUrl === url) {
    analyticsLog("page_view skipped (duplicate)", { page_path: url });
    return;
  }
  lastTrackedUrl = url;

  const pageTitle =
    title ?? (typeof document !== "undefined" ? document.title : undefined);

  analyticsLog("event:page_view", { page_path: url, page_title: pageTitle });

  if (!canSend()) return;

  window.gtag("event", "page_view", {
    page_path: url,
    page_title: pageTitle,
    page_location: `${window.location.origin}${url}`,
  });
}

export function resetPageViewDedupe() {
  lastTrackedUrl = null;
}
