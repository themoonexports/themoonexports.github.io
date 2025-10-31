import { hydrateRoot } from "react-dom/client";
import { Background, BackgroundProps } from "@components/Background";

/**
 * Hydrate the Background component into the document
 * Can be configured via data attributes or window object
 */
function initBackground() {
  // Check if background component should be mounted
  const mountPoint = document.querySelector('[data-react="background"]');
  
  if (mountPoint) {
    // Read configuration from data attributes
    const variant = (mountPoint.getAttribute("data-variant") || "default") as BackgroundProps["variant"];
    const imageUrl = mountPoint.getAttribute("data-image-url") || undefined;
    const overlayOpacity = parseFloat(mountPoint.getAttribute("data-overlay-opacity") || "0.85");
    const customColor = mountPoint.getAttribute("data-custom-color") || undefined;
    
    hydrateRoot(
      mountPoint,
      <Background
        variant={variant}
        imageUrl={imageUrl}
        overlayOpacity={overlayOpacity}
        customColor={customColor}
      />
    );
  } else {
    // No mount point found, create one and append to body
    const container = document.createElement("div");
    container.setAttribute("data-react", "background");
    container.style.display = "none"; // Component manages body styles, no need to display
    document.body.appendChild(container);
    
    // Use default configuration or read from window object
    const config = (window as any).TheMoonExports?.backgroundConfig || {};
    
    hydrateRoot(
      container,
      <Background
        variant={config.variant || "default"}
        imageUrl={config.imageUrl}
        overlayOpacity={config.overlayOpacity}
        customColor={config.customColor}
      />
    );
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBackground);
} else {
  initBackground();
}

export { Background };
