"use client";

import Script from "next/script";

import { GA_MEASUREMENT_ID, isDev, isGaEnabled } from "@/lib/analytics";
import { useAnalyticsConsent } from "@/hooks/useAnalyticsConsent";

/**
 * Loads gtag.js only when GA is configured and analytics consent is granted
 * (or auto-granted). Consent Mode v2 defaults are inlined before the remote script.
 */
export function GoogleAnalytics() {
  const consent = useAnalyticsConsent();

  if (!isGaEnabled() || consent !== "granted") {
    return null;
  }

  const debugMode = isDev ? ", debug_mode: true" : "";

  return (
    <>
      <Script
        id="ga-consent-and-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
            gtag('consent', 'update', { analytics_storage: 'granted' });
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              anonymize_ip: true${debugMode}
            });
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
