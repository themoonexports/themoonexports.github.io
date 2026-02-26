/** User profile returned by the FreeRoom.ae API */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

/** Tokens stored after a successful authentication */
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
}

/** Overall authentication state exposed to components */
export interface AuthState {
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}
