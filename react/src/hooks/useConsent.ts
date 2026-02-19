import { useEffect, useState } from "react";
import type { ConsentState } from "../types/consent";

const defaultState: ConsentState = {
  analytics: false,
  timestamp: 0
};

export function useConsent(): ConsentState {
  const [state, setState] = useState<ConsentState>(defaultState);

  useEffect(() => {
    const consentApi = window.TheMoonExports?.Consent;
    if (consentApi?.onReady) {
      consentApi.onReady((next) => {
        setState({ analytics: Boolean(next.analytics), timestamp: next.timestamp });
      });
    }
  }, []);

  return state;
}
