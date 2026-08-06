import { GA_MEASUREMENT_ID, isDev, isGaEnabled } from "@/lib/analytics/config";
import { getConsentState } from "@/lib/analytics/consent";
import { analyticsLog, analyticsWarn, logEvent } from "@/lib/analytics/logger";
import type { EventName, EventParams } from "@/lib/analytics/types";

function canSend() {
  if (!isGaEnabled()) return false;
  if (typeof window === "undefined") return false;
  if (typeof window.gtag !== "function") return false;
  return getConsentState() === "granted";
}

export function initGtagConfig() {
  if (!isGaEnabled() || typeof window === "undefined") {
    if (isDev && !GA_MEASUREMENT_ID) {
      analyticsWarn(
        "NEXT_PUBLIC_GA_MEASUREMENT_ID is missing — GA4 disabled",
      );
    }
    return;
  }

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    } as Window["gtag"];
  }

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
    debug_mode: isDev,
  });
  analyticsLog("gtag config ready", { id: GA_MEASUREMENT_ID });
}

export function trackEvent(name: EventName, params: EventParams = {}) {
  logEvent(name, params);
  if (!canSend()) return;

  const cleaned = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined),
  );

  window.gtag("event", name, cleaned);
}
