import { useEffect } from "react";

export interface BackgroundProps {
  /**
   * Background theme variant
   * - 'default': Standard dark background (#191919)
   * - 'gradient': Subtle gradient from ink-900 to ink-800
   * - 'image': Optional background image with overlay
   */
  variant?: "default" | "gradient" | "image";
  
  /**
   * Optional background image URL (only used when variant="image")
   */
  imageUrl?: string;
  
  /**
   * Opacity of the image overlay (0-1)
   */
  overlayOpacity?: number;
  
  /**
   * Custom background color (overrides variant)
   */
  customColor?: string;
}

export function Background({
  variant = "default",
  imageUrl,
  overlayOpacity = 0.85,
  customColor
}: BackgroundProps): JSX.Element {
  useEffect(() => {
    const body = document.body;
    
    // Reset any existing background styles
    body.style.backgroundImage = "";
    body.style.backgroundColor = "";
    body.style.backgroundSize = "";
    body.style.backgroundPosition = "";
    body.style.backgroundAttachment = "";
    body.style.backgroundRepeat = "";
    
    // Apply custom color if provided
    if (customColor) {
      body.style.backgroundColor = customColor;
      return;
    }
    
    // Apply variant-specific styles
    switch (variant) {
      case "gradient":
        body.style.background = "linear-gradient(to bottom, var(--tmx-ink-900, #0F0F0F), var(--tmx-ink-800, #1A1A1A))";
        break;
        
      case "image":
        if (imageUrl) {
          body.style.backgroundImage = `
            linear-gradient(
              rgba(25, 25, 25, ${overlayOpacity}),
              rgba(25, 25, 25, ${overlayOpacity})
            ),
            url(${imageUrl})
          `;
          body.style.backgroundSize = "cover";
          body.style.backgroundPosition = "center";
          body.style.backgroundAttachment = "fixed";
          body.style.backgroundRepeat = "no-repeat";
        } else {
          body.style.backgroundColor = "#191919";
        }
        break;
        
      case "default":
      default:
        body.style.backgroundColor = "#191919";
        break;
    }
    
    // Cleanup: reset to default on unmount
    return () => {
      body.style.backgroundColor = "#191919";
      body.style.backgroundImage = "";
    };
  }, [variant, imageUrl, overlayOpacity, customColor]);
  
  // This component doesn't render anything visible
  return <></>;
}
