import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LanguageSwitcher } from "@components/LanguageSwitcher";

/**
 * Language Switcher Entry Point
 * Hydrates language selection flags
 */

function initLanguageSwitcher() {
  const container = document.querySelector<HTMLElement>('[data-react="language-switcher"]');
  
  if (!container) {
    console.warn('LanguageSwitcher: No container found with data-react="language-switcher"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <LanguageSwitcher />
      </StrictMode>
    );
    console.log('LanguageSwitcher: React component hydrated successfully');
  } catch (error) {
    console.error('LanguageSwitcher: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLanguageSwitcher);
} else {
  initLanguageSwitcher();
}
