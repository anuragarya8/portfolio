export type ConsentState = "pending" | "granted" | "denied";

export type EventName =
  | "button_click"
  | "hire_me_click"
  | "resume_download"
  | "project_view"
  | "case_study_open"
  | "demo_click"
  | "github_click"
  | "linkedin_click"
  | "external_link"
  | "contact_form_submit"
  | "email_copy"
  | "theme_change"
  | "nav_click"
  | "service_inquiry"
  | "blog_read"
  | "page_view";

export type EventParams = {
  button_name?: string;
  location?: string;
  project_slug?: string;
  project_name?: string;
  url?: string;
  link_text?: string;
  status?: "success" | "error" | "fallback";
  theme?: string;
  label?: string;
  href?: string;
  service_id?: string;
  blog_slug?: string;
  page_path?: string;
  page_title?: string;
  [key: string]: string | number | boolean | undefined;
};

export type GtagCommand = "config" | "event" | "consent" | "js" | "set";

export type GtagFunction = (
  command: GtagCommand | string,
  targetOrAction: string | Date,
  params?: Record<string, unknown>,
) => void;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GtagFunction;
  }
}

export {};
