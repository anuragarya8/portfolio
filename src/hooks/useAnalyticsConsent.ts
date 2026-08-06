"use client";

import { useEffect, useState } from "react";

import {
  getConsentState,
  subscribeConsent,
  type ConsentState,
} from "@/lib/analytics";

export function useAnalyticsConsent() {
  const [consent, setConsent] = useState<ConsentState>(() => getConsentState());

  useEffect(() => {
    setConsent(getConsentState());
    return subscribeConsent(setConsent);
  }, []);

  return consent;
}
