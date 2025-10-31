import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "@components/Header";

/**
 * Header Entry Point
 * Hydrates the existing header markup with React
 * Looks for element with data-react="header"
 */

function initHeader() {
  const container = document.querySelector<HTMLElement>('[data-react="header"]');
  
  if (!container) {
    console.warn('Header: No container found with data-react="header"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Header />
      </StrictMode>
    );
    console.log('Header: React component hydrated successfully');
  } catch (error) {
    console.error('Header: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}
