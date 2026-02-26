# FreeRoom.ae Authentication Integration

## Overview

This site integrates with the [FreeRoom.ae](https://freeroom.ae) platform for user
authentication.  Because The Moon Exports is a static site (GitHub Pages) with no
server-side runtime, the integration uses the **OAuth 2.0 Authorization-Code + PKCE**
flow.  This is the industry-standard approach for single-page / static apps that
cannot safely store a client secret.

## Architecture

```
┌─────────────────────┐          ┌────────────────────────┐
│  themoonexports.com  │  OAuth   │      freeroom.ae       │
│  (static / React)    │ ──────►  │  (Laravel Sanctum/JWT) │
│                      │ ◄──────  │  + Google OAuth         │
│  js/dist/auth.js     │  tokens  │                        │
└─────────────────────┘          └────────────────────────┘
```

1. User clicks **Login** → browser redirects to FreeRoom.ae `/oauth/authorize`
   with a PKCE `code_challenge`.
2. User authenticates on FreeRoom.ae (email/password or Google OAuth).
3. FreeRoom.ae redirects back to `/auth/callback` with an authorization `code`.
4. The `auth.js` bundle exchanges the code for a JWT access token via the
   `/oauth/token` endpoint.
5. The token is stored in `localStorage` (`tme_auth_tokens`).
6. Subsequent API calls include the token in the `Authorization: Bearer` header.

## Files

| Path | Purpose |
|------|---------|
| `react/src/config/auth.ts` | Configurable API URLs, client ID, endpoints |
| `react/src/types/auth.ts` | TypeScript interfaces (`AuthUser`, `AuthTokens`, `AuthState`) |
| `react/src/services/auth.ts` | OAuth PKCE flow, token management, API helpers |
| `react/src/hooks/useAuth.ts` | React hook exposing auth state to components |
| `react/src/components/AuthButton.tsx` | Login / user-menu UI component |
| `react/src/entries/auth.tsx` | Entry point (hydration + `window.TheMoonExports.Auth`) |
| `auth/callback.html` | OAuth redirect landing page |

## Configuration

Set these environment variables before building (`react/.env` or CI):

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_FREEROOM_API_BASE` | FreeRoom.ae API base URL | `https://freeroom.ae` |
| `VITE_FREEROOM_CLIENT_ID` | OAuth 2.0 client ID | `your_client_id` |
| `VITE_FREEROOM_REDIRECT_URI` | Callback URL registered with FreeRoom.ae | `https://www.themoonexports.com/auth/callback` |

## FreeRoom.ae Setup (Server Side)

On the FreeRoom.ae Laravel backend, register a new OAuth client:

1. Create a **public** (PKCE) client — no client secret.
2. Set the allowed redirect URI to `https://www.themoonexports.com/auth/callback`.
3. Note the generated `client_id` and configure it as `VITE_FREEROOM_CLIENT_ID`.
4. Ensure CORS allows `https://www.themoonexports.com` on the token & user endpoints.

## Legacy JS Interop

Non-React pages can use the global helpers exposed on `window.TheMoonExports.Auth`:

```js
// Check if the user is logged in
if (window.TheMoonExports.Auth.isAuthenticated()) { … }

// Trigger login
window.TheMoonExports.Auth.login();

// Trigger Google login
window.TheMoonExports.Auth.loginWithGoogle();

// Log out
window.TheMoonExports.Auth.logout();
```

## Security Considerations

- **PKCE** prevents authorization-code interception.
- Tokens are stored in `localStorage`; XSS is mitigated by the site's CSP policy.
- The access token expiry is honoured — expired tokens are cleared automatically.
- Logout calls the server-side revocation endpoint as a best-effort.
- The callback page has `noindex, nofollow` to prevent search-engine indexing.

## Testing

1. Set `VITE_FREEROOM_API_BASE` to a local Laravel instance (`http://localhost:8000`).
2. Register a PKCE client on that instance.
3. Run `cd react && npm run dev` (Vite dev server at `:5173`).
4. Click **Login** in the navbar and complete the flow.
5. Verify the user name appears and **Logout** clears the session.
