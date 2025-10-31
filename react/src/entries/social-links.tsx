import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SocialLinks } from "@components/SocialLinks";

/**
 * Social Links Entry Point
 * Hydrates social media icons with tracking
 */

function initSocialLinks() {
  const container = document.querySelector<HTMLElement>('[data-react="social-links"]');
  
  if (!container) {
    console.warn('SocialLinks: No container found with data-react="social-links"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <SocialLinks />
      </StrictMode>
    );
    console.log('SocialLinks: React component hydrated successfully');
  } catch (error) {
    console.error('SocialLinks: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSocialLinks);
} else {
  initSocialLinks();
}
