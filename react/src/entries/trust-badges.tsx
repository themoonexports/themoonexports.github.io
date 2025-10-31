import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TrustBadges } from "@components/TrustBadges";

/**
 * Trust Badges Entry Point
 * Hydrates trust and payment badges
 */

function initTrustBadges() {
  const container = document.querySelector<HTMLElement>('[data-react="trust-badges"]');
  
  if (!container) {
    console.warn('TrustBadges: No container found with data-react="trust-badges"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <TrustBadges />
      </StrictMode>
    );
    console.log('TrustBadges: React component hydrated successfully');
  } catch (error) {
    console.error('TrustBadges: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTrustBadges);
} else {
  initTrustBadges();
}
