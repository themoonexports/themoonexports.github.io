import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Carousel } from "@components/Carousel";

/**
 * Carousel Entry Point
 * Hydrates hero image slider
 */

function initCarousel() {
  const container = document.querySelector<HTMLElement>('[data-react="carousel"]');
  
  if (!container) {
    console.warn('Carousel: No container found with data-react="carousel"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <Carousel />
      </StrictMode>
    );
    console.log('Carousel: React component hydrated successfully');
  } catch (error) {
    console.error('Carousel: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}
