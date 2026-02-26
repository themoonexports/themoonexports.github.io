import { useCallback, useEffect, useState } from "react";
import type { AuthState, AuthUser } from "../types/auth";
import {
  fetchUser,
  handleCallback,
  isAuthenticated,
  logout as logoutService,
  startLogin,
  startGoogleLogin,
} from "../services/auth";

/**
 * useAuth – React hook that exposes the FreeRoom.ae authentication state.
 *
 * On mount it checks for an existing token in localStorage and, if present,
 * fetches the user profile.  It also handles the OAuth callback when the
 * URL contains a `code` query parameter.
 */
export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  /* -- bootstrap: check token or handle callback -------------------- */
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");

        if (code) {
          await handleCallback(code);
          // Clean the URL so the code isn't re-used on refresh
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          url.searchParams.delete("state");
          window.history.replaceState({}, document.title, url.pathname + url.search);
        }

        if (isAuthenticated()) {
          const user = await fetchUser();
          if (!cancelled) setState({ user, loading: false, error: null });
        } else {
          if (!cancelled) setState({ user: null, loading: false, error: null });
        }
      } catch (err) {
        if (!cancelled) {
          setState({
            user: null,
            loading: false,
            error: err instanceof Error ? err.message : "Authentication failed",
          });
        }
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  /* -- actions ------------------------------------------------------ */
  const login = useCallback(() => { startLogin(); }, []);
  const loginWithGoogle = useCallback(() => { startGoogleLogin(); }, []);

  const logout = useCallback(async () => {
    await logoutService();
    setState({ user: null, loading: false, error: null });
  }, []);

  return { ...state, login, loginWithGoogle, logout } as const;
}

export type UseAuth = ReturnType<typeof useAuth>;
