export {
  GA_MEASUREMENT_ID,
  GA_AUTO_CONSENT,
  isGaConfigured,
  isGaEnabled,
  isDev,
} from "@/lib/analytics/config";

export {
  applyConsentDefaults,
  bootstrapConsent,
  grantAnalyticsConsent,
  denyAnalyticsConsent,
  getConsentState,
  subscribeConsent,
} from "@/lib/analytics/consent";

export { initGtagConfig, trackEvent } from "@/lib/analytics/gtag";
export { trackPageView, resetPageViewDedupe } from "@/lib/analytics/pageview";

export {
  trackButtonClick,
  trackHireMeClick,
  trackResumeDownload,
  trackProjectView,
  trackCaseStudyOpen,
  trackDemoClick,
  trackGitHubClick,
  trackLinkedInClick,
  trackExternalLink,
  trackContactFormSubmit,
  trackEmailCopy,
  trackThemeChange,
  trackNavClick,
  trackServiceInquiry,
  trackBlogRead,
} from "@/lib/analytics/events";

export type {
  ConsentState,
  EventName,
  EventParams,
} from "@/lib/analytics/types";
