import { useConsent } from "./useConsent";

/**
 * Hook for tracking user interactions with analytics
 * Only tracks when user has given consent
 */
export function useTracking() {
  const { analytics } = useConsent();

  const trackEvent = (category: string, action: string, label?: string) => {
    if (!analytics) {
      return;
    }

    // Google Analytics tracking
    if (typeof window.ga === "function") {
      window.ga("send", "event", category, action, label);
    }

    // Yandex Metrica tracking
    if (typeof window.ym === "function") {
      window.ym(52371760, "reachGoal", `${category}_${action}`);
    }
  };

  return { trackEvent, hasConsent: analytics };
}
