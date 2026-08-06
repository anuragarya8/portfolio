"use client";

import Script from "next/script";
import { Suspense, useEffect } from "react";

import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { usePageTracking } from "@/hooks/usePageTracking";
import { seoConfig } from "@/config/seo";
import {
  applyConsentDefaults,
  bootstrapConsent,
  isGaEnabled,
  isGaConfigured,
} from "@/lib/analytics";
import { analyticsWarn } from "@/lib/analytics/logger";

function PageTracking() {
  usePageTracking();
  return null;
}

function ConsentBootstrap() {
  useEffect(() => {
    if (!isGaConfigured()) {
      analyticsWarn(
        "NEXT_PUBLIC_GA_MEASUREMENT_ID is missing — GA4 disabled",
      );
      return;
    }
    if (!isGaEnabled()) return;
    applyConsentDefaults();
    bootstrapConsent();
  }, []);
  return null;
}

/** Future: Microsoft Clarity when NEXT_PUBLIC_CLARITY_ID is set */
function ClarityStub() {
  const id = seoConfig.analytics.clarity;
  if (!id) return null;
  return (
    <Script id="clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`}
    </Script>
  );
}

/** Future: Plausible when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set */
function PlausibleStub() {
  const domain = seoConfig.analytics.plausible;
  if (!domain) return null;
  return (
    <Script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

/**
 * Mounts Consent Mode bootstrap, GA scripts, SPA pageview tracking,
 * and optional future analytics providers.
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ConsentBootstrap />
      <GoogleAnalytics />
      <Suspense fallback={null}>
        <PageTracking />
      </Suspense>
      <ClarityStub />
      <PlausibleStub />
      {children}
    </>
  );
}
