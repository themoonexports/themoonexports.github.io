/**
 * FreeRoom.ae Authentication Service
 *
 * Implements the OAuth 2.0 Authorization-Code + PKCE flow so that a
 * static site (no backend secret) can authenticate against the
 * FreeRoom.ae Laravel Sanctum / JWT API securely.
 */

import { authConfig } from "../config/auth";
import type { AuthTokens, AuthUser } from "../types/auth";

/* ------------------------------------------------------------------ */
/*  PKCE helpers                                                       */
/* ------------------------------------------------------------------ */

function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, length);
}

async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  return crypto.subtle.digest("SHA-256", encoder.encode(plain));
}

function base64UrlEncode(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => { binary += String.fromCharCode(b); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/* ------------------------------------------------------------------ */
/*  Token persistence                                                  */
/* ------------------------------------------------------------------ */

function saveTokens(tokens: AuthTokens): void {
  try {
    localStorage.setItem(authConfig.storageKeys.tokens, JSON.stringify(tokens));
  } catch {
    /* storage full / private mode – tokens live only in memory */
  }
}

function loadTokens(): AuthTokens | null {
  try {
    const raw = localStorage.getItem(authConfig.storageKeys.tokens);
    if (!raw) return null;
    const tokens: AuthTokens = JSON.parse(raw);
    if (tokens.expiresAt <= Date.now()) {
      clearTokens();
      return null;
    }
    return tokens;
  } catch {
    return null;
  }
}

function clearTokens(): void {
  try {
    localStorage.removeItem(authConfig.storageKeys.tokens);
  } catch {
    /* noop */
  }
}

/* ------------------------------------------------------------------ */
/*  OAuth flow                                                         */
/* ------------------------------------------------------------------ */

/**
 * Kick off the OAuth Authorization-Code + PKCE login.
 * Redirects the browser to the FreeRoom.ae authorize endpoint.
 */
export async function startLogin(): Promise<void> {
  const codeVerifier = generateRandomString(64);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64UrlEncode(hashed);

  sessionStorage.setItem(authConfig.storageKeys.codeVerifier, codeVerifier);

  const params = new URLSearchParams({
    client_id: authConfig.clientId,
    redirect_uri: authConfig.redirectUri,
    response_type: "code",
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
    scope: "read",
  });

  window.location.href = `${authConfig.apiBase}${authConfig.endpoints.authorize}?${params}`;
}

/**
 * Start Google OAuth login via FreeRoom.ae's Google redirect endpoint.
 */
export function startGoogleLogin(): void {
  const params = new URLSearchParams({
    redirect_uri: authConfig.redirectUri,
  });

  window.location.href = `${authConfig.apiBase}${authConfig.endpoints.googleLogin}?${params}`;
}

/**
 * Exchange the authorisation code (from the callback URL) for tokens.
 */
export async function handleCallback(code: string): Promise<AuthTokens> {
  const codeVerifier = sessionStorage.getItem(authConfig.storageKeys.codeVerifier) ?? "";
  sessionStorage.removeItem(authConfig.storageKeys.codeVerifier);

  const response = await fetch(`${authConfig.apiBase}${authConfig.endpoints.token}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      client_id: authConfig.clientId,
      redirect_uri: authConfig.redirectUri,
      code_verifier: codeVerifier,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error(`Token exchange failed (${response.status})`);
  }

  const data = await response.json();
  const tokens: AuthTokens = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? undefined,
    expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
  };

  saveTokens(tokens);
  return tokens;
}

/* ------------------------------------------------------------------ */
/*  Authenticated API calls                                            */
/* ------------------------------------------------------------------ */

/** Fetch the current user's profile from FreeRoom.ae. */
export async function fetchUser(): Promise<AuthUser | null> {
  const tokens = loadTokens();
  if (!tokens) return null;

  const response = await fetch(`${authConfig.apiBase}${authConfig.endpoints.userProfile}`, {
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    if (response.status === 401) clearTokens();
    return null;
  }

  const data = await response.json();
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    avatar: data.avatar ?? undefined,
  };
}

/** Log out – clear local tokens and (best-effort) call the API. */
export async function logout(): Promise<void> {
  const tokens = loadTokens();
  clearTokens();

  if (tokens) {
    try {
      await fetch(`${authConfig.apiBase}${authConfig.endpoints.logout}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          Accept: "application/json",
        },
      });
    } catch {
      /* best-effort – user is already logged out locally */
    }
  }
}

/** Return saved tokens (if still valid). */
export function getTokens(): AuthTokens | null {
  return loadTokens();
}

/** Check whether the user currently holds a valid token. */
export function isAuthenticated(): boolean {
  return loadTokens() !== null;
}
