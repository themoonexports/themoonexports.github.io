import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NewsletterForm } from "@components/NewsletterForm";

/**
 * Newsletter Entry Point
 * Hydrates the existing newsletter form with React
 * Looks for element with data-react="newsletter"
 */

function initNewsletter() {
  const container = document.querySelector<HTMLElement>('[data-react="newsletter"]');
  
  if (!container) {
    console.warn('Newsletter: No container found with data-react="newsletter"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <NewsletterForm />
      </StrictMode>
    );
    console.log('Newsletter: React component hydrated successfully');
  } catch (error) {
    console.error('Newsletter: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initNewsletter);
} else {
  initNewsletter();
}
