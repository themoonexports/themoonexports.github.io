#ifndef TME_CONFIG_H
#define TME_CONFIG_H

/* ── Version ─────────────────────────────────────────────────── */
#define TME_VERSION             "1.1.0"

/* ── Server defaults ─────────────────────────────────────────── */
#define TME_DEFAULT_PORT        3000
#define TME_DEFAULT_HOST        "0.0.0.0"

/* ── Logging ─────────────────────────────────────────────────── */
#define TME_LOG_LEVEL           LOG_LEVEL_INFO

/* ── CORS (compile-time defaults; overridden by env vars) ────── */
#define TME_CORS_ORIGIN         "https://www.themoonexports.com"
#define TME_CORS_ORIGIN_DEV     "http://localhost:5000"

/* ── API prefix ──────────────────────────────────────────────── */
#define TME_API_PREFIX          "/api"

/* ── Rate limiting ───────────────────────────────────────────── */
#define TME_RATE_LIMIT_MAX      100   /* requests per window */
#define TME_RATE_LIMIT_WINDOW   60    /* window in seconds   */

/* ── Request body limits ─────────────────────────────────────── */
#define TME_MAX_BODY_SIZE       65536 /* 64 KB max request body */

/* ── Static file root (relative to working directory) ────────── */
#define TME_STATIC_ROOT         "../"  /* serve the GitHub Pages root */

/* ── Database (future — Sprint 3) ────────────────────────────── */
#define TME_DB_PATH_DEFAULT     "./data/tme.db"

#endif /* TME_CONFIG_H */
