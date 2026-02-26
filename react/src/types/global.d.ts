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
      Auth?: {
        login?: () => void;
        loginWithGoogle?: () => void;
        logout?: () => Promise<void>;
        isAuthenticated?: () => boolean;
      };
    };
    // Google Analytics
    ga?: (command: string, ...args: unknown[]) => void;
    // Yandex Metrica
    ym?: (id: number, method: string, ...params: unknown[]) => void;
  }
}

export {};
