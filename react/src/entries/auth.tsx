import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthButton } from "@components/AuthButton";

/**
 * Auth Entry Point
 * Hydrates the auth button / user-menu area in the header.
 * Looks for element with data-react="auth"
 */

function initAuth() {
  const container = document.querySelector<HTMLElement>('[data-react="auth"]');

  if (!container) {
    // Auth mount point is optional – pages without it simply skip hydration
    return;
  }

  try {
    const root = createRoot(container);
    root.render(
      <StrictMode>
        <AuthButton />
      </StrictMode>
    );
    console.log("Auth: React component hydrated successfully");
  } catch (error) {
    console.error("Auth: Hydration failed", error);
  }
}

// Expose login helpers on the global namespace for legacy pages
window.TheMoonExports = window.TheMoonExports ?? {};
window.TheMoonExports.Auth = {
  login: async () => {
    const { startLogin } = await import("../services/auth");
    startLogin();
  },
  loginWithGoogle: async () => {
    const { startGoogleLogin } = await import("../services/auth");
    startGoogleLogin();
  },
  logout: async () => {
    const { logout } = await import("../services/auth");
    await logout();
    window.location.reload();
  },
  isAuthenticated: () => {
    // Synchronous check – returns boolean
    try {
      const raw = localStorage.getItem("tme_auth_tokens");
      if (!raw) return false;
      const tokens = JSON.parse(raw);
      return tokens.expiresAt > Date.now();
    } catch {
      return false;
    }
  },
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAuth);
} else {
  initAuth();
}
