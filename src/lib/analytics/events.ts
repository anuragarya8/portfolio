import { trackEvent } from "@/lib/analytics/gtag";
import type { EventParams } from "@/lib/analytics/types";

export function trackButtonClick(buttonName: string, location: string) {
  trackEvent("button_click", { button_name: buttonName, location });
}

export function trackHireMeClick(location: string) {
  trackEvent("hire_me_click", { location });
}

export function trackResumeDownload(location: string) {
  trackEvent("resume_download", { location });
}

export function trackProjectView(projectSlug: string, projectName: string) {
  trackEvent("project_view", {
    project_slug: projectSlug,
    project_name: projectName,
  });
}

export function trackCaseStudyOpen(projectSlug: string) {
  trackEvent("case_study_open", { project_slug: projectSlug });
}

export function trackDemoClick(projectSlug: string, url: string) {
  trackEvent("demo_click", { project_slug: projectSlug, url });
}

export function trackGitHubClick(location: string, url: string) {
  trackEvent("github_click", { location, url });
}

export function trackLinkedInClick(location: string) {
  trackEvent("linkedin_click", { location });
}

export function trackExternalLink(
  url: string,
  linkText: string,
  location: string,
) {
  trackEvent("external_link", {
    url,
    link_text: linkText,
    location,
  });
}

export function trackContactFormSubmit(
  status: "success" | "error" | "fallback",
) {
  trackEvent("contact_form_submit", { status });
}

export function trackEmailCopy(location: string) {
  trackEvent("email_copy", { location });
}

export function trackThemeChange(theme: string) {
  trackEvent("theme_change", { theme });
}

export function trackNavClick(label: string, href: string) {
  trackEvent("nav_click", { label, href });
}

export function trackServiceInquiry(serviceId: string) {
  trackEvent("service_inquiry", { service_id: serviceId });
}

/** Reserved for future blog section */
export function trackBlogRead(blogSlug: string, extra?: EventParams) {
  trackEvent("blog_read", { blog_slug: blogSlug, ...extra });
}
