import type { ConsentState } from "./consent";

declare global {
  interface Window {
    TheMoonExports?: {
      Utils?: {
        loadScript?: (src: string, options?: { onLoad?: () => void; onError?: (error: Event) => void }) => void;
        domReady?: (callback: () => void) => void;
      };
      Consent?: {
        onReady?: (callback: (state: ConsentState) => void) => void;
      };
      Navigation?: {
        init?: (config?: Record<string, unknown>) => unknown;
      };
      Forms?: {
        initNewsletterForm?: () => void;
        initContactForm?: () => void;
      };
    };
  }
}

export {};
