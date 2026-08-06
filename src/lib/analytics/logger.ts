import { isDev } from "@/lib/analytics/config";
import type { EventName, EventParams } from "@/lib/analytics/types";

export function analyticsLog(
  message: string,
  payload?: EventParams | Record<string, unknown>,
) {
  if (!isDev) return;
  if (payload) {
    console.info(`[analytics] ${message}`, payload);
  } else {
    console.info(`[analytics] ${message}`);
  }
}

export function analyticsWarn(message: string) {
  if (!isDev) return;
  console.warn(`[analytics] ${message}`);
}

export function logEvent(name: EventName, params?: EventParams) {
  analyticsLog(`event:${name}`, params);
}
