/**
 * FreeRoom.ae Authentication Configuration
 *
 * All values are read from Vite environment variables at build time.
 * Provide sensible defaults so the site works without auth when the
 * variables are not set (e.g. during local development).
 */

const DEFAULTS = {
  apiBase: "https://freeroom.ae",
  clientId: "",
  redirectUri: typeof window !== "undefined"
    ? `${window.location.origin}/auth/callback`
    : "",
};

export const authConfig = {
  /** Base URL of the FreeRoom.ae API */
  apiBase: import.meta.env.VITE_FREEROOM_API_BASE ?? DEFAULTS.apiBase,

  /** OAuth 2.0 client ID issued by FreeRoom.ae */
  clientId: import.meta.env.VITE_FREEROOM_CLIENT_ID ?? DEFAULTS.clientId,

  /** Where FreeRoom.ae redirects after login */
  redirectUri: import.meta.env.VITE_FREEROOM_REDIRECT_URI ?? DEFAULTS.redirectUri,

  /** FreeRoom.ae endpoint paths */
  endpoints: {
    authorize: "/oauth/authorize",
    token: "/oauth/token",
    userProfile: "/api/user",
    logout: "/api/logout",
    googleLogin: "/auth/google/redirect",
  },

  /** localStorage keys */
  storageKeys: {
    tokens: "tme_auth_tokens",
    codeVerifier: "tme_auth_code_verifier",
  },
} as const;
