import { useAuth } from "../hooks/useAuth";

/**
 * AuthButton – lightweight login / user-menu button.
 *
 * Renders a "Login" link when unauthenticated and a small user menu
 * (name + logout) when authenticated.  Uses existing Bootstrap and
 * crafts-ui utility classes so no extra CSS is required.
 */
export function AuthButton(): JSX.Element {
  const { user, loading, login, loginWithGoogle, logout } = useAuth();

  if (loading) {
    return <span className="navbar-text auth-loading">…</span>;
  }

  if (user) {
    return (
      <div className="navbar-text auth-user" role="status" aria-label="Logged in user">
        <span className="auth-user-name">{user.name}</span>
        <button
          type="button"
          className="btn-crafts btn-crafts-sm auth-logout-btn"
          onClick={logout}
          aria-label="Log out"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="navbar-text auth-actions">
      <button
        type="button"
        className="btn-crafts btn-crafts-sm auth-login-btn"
        onClick={login}
        aria-label="Log in with FreeRoom"
      >
        Login
      </button>
      <button
        type="button"
        className="btn-crafts btn-crafts-sm auth-google-btn"
        onClick={loginWithGoogle}
        aria-label="Log in with Google"
      >
        <i className="fab fa-google" aria-hidden="true" /> Google
      </button>
    </div>
  );
}
