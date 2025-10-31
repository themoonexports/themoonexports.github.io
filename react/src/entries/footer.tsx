import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Footer } from "@components/Footer";

/**
 * Footer Entry Point
 * Hydrates footer navigation and copyright
 */

function initFooter() {
  const container = document.querySelector<HTMLElement>('[data-react="footer"]');
  
  if (!container) {
    console.warn('Footer: No container found with data-react="footer"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Footer />
      </StrictMode>
    );
    console.log('Footer: React component hydrated successfully');
  } catch (error) {
    console.error('Footer: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}
