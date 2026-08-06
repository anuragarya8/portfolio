import { GA_AUTO_CONSENT, isGaConfigured } from "@/lib/analytics/config";
import { analyticsLog, analyticsWarn } from "@/lib/analytics/logger";
import type { ConsentState } from "@/lib/analytics/types";

const STORAGE_KEY = "aa_analytics_consent";

type ConsentListener = (state: ConsentState) => void;

const listeners = new Set<ConsentListener>();

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (value === "granted" || value === "denied" || value === "pending") {
      return value;
    }
  } catch {
    // ignore storage failures
  }
  return null;
}

function writeStoredConsent(state: ConsentState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, state);
  } catch {
    // ignore
  }
}

function notify(state: ConsentState) {
  listeners.forEach((listener) => listener(state));
}

export function getConsentState(): ConsentState {
  const stored = readStoredConsent();
  if (stored) return stored;
  if (!isGaConfigured()) return "denied";
  return GA_AUTO_CONSENT ? "granted" : "pending";
}

export function subscribeConsent(listener: ConsentListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Consent Mode v2 defaults — call before gtag.js loads */
export function applyConsentDefaults() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    // Match official snippet: queue Arguments for gtag.js
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    } as Window["gtag"];
  }

  window.gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
  analyticsLog("consent defaults applied (denied)");
}

export function updateGtagConsent(granted: boolean) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: granted ? "granted" : "denied",
  });
}

export function grantAnalyticsConsent() {
  if (!isGaConfigured()) {
    analyticsWarn("grantAnalyticsConsent called but GA is not configured");
    return;
  }
  writeStoredConsent("granted");
  updateGtagConsent(true);
  notify("granted");
  analyticsLog("consent granted");
}

export function denyAnalyticsConsent() {
  writeStoredConsent("denied");
  updateGtagConsent(false);
  notify("denied");
  analyticsLog("consent denied");
}

/** Bootstrap consent for first visit (auto-grant unless strict mode) */
export function bootstrapConsent() {
  const stored = readStoredConsent();
  if (stored === "granted") {
    updateGtagConsent(true);
    notify("granted");
    return "granted" as const;
  }
  if (stored === "denied") {
    updateGtagConsent(false);
    notify("denied");
    return "denied" as const;
  }
  if (GA_AUTO_CONSENT && isGaConfigured()) {
    grantAnalyticsConsent();
    return "granted" as const;
  }
  notify("pending");
  return "pending" as const;
}
