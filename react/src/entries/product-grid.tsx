import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ProductGrid } from "@components/ProductGrid";

/**
 * Product Grid Entry Point
 * Hydrates product category cards
 */

function initProductGrid() {
  const container = document.querySelector<HTMLElement>('[data-react="product-grid"]');
  
  if (!container) {
    console.warn('ProductGrid: No container found with data-react="product-grid"');
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <ProductGrid />
      </StrictMode>
    );
    console.log('ProductGrid: React component hydrated successfully');
  } catch (error) {
    console.error('ProductGrid: Hydration failed', error);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductGrid);
} else {
  initProductGrid();
}
