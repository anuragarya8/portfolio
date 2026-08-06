export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const GA_AUTO_CONSENT =
  process.env.NEXT_PUBLIC_GA_AUTO_CONSENT !== "false";

export const isDev = process.env.NODE_ENV === "development";

export function isGaConfigured() {
  return /^G-[A-Z0-9]+$/i.test(GA_MEASUREMENT_ID);
}

export function isGaEnabled() {
  return isGaConfigured();
}
