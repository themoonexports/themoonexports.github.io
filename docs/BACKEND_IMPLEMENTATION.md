# Backend Implementation Plan

**Created:** February 2026
**Status:** ✅ Milestones 1–2 complete, Sprint 1 hardening complete — production-ready MVP
**Dependency:** [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library) (pinned to commit `90f0de91`)

**Related Documents:**
- [Backend Next Phase Plan](BACKEND_NEXT_PHASE_PLAN.md) — **First-principles plan for Milestones 3–6 (start here for next backend work)**
- [Backend README](../backend/README.md) — Quick-start and API reference
- [Environment Configuration](ENVIRONMENT_CONFIGURATION.md) — API URL management
- [Phase 4 Implementation](PHASE_4_IMPLEMENTATION.md) — Current hardening phase
- [react-refactoring.md](../react-refactoring.md) — Frontend roadmap

---

## 1. Overview

The Moon Exports website is currently a static GitHub Pages site with a progressive React layer. This document describes the plan to add a **backend API** using the [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library), a production-ready pure C web framework with zero external dependencies.

### Why This Library?

| Criterion | Value |
|-----------|-------|
| Language | Pure ISO C (C99) — maximum portability |
| Dependencies | Zero external — self-contained |
| License | MIT |
| Features | HTTP server, routing, JSON, middleware, WebSocket, auth, rate limiting, sessions |
| Performance | Async I/O (epoll/kqueue), thread pool, in-memory cache |
| Maturity | v1.0.0 release with 129 unit tests, Docker support |

### Architecture After Backend Integration

```
┌──────────────────────────────────────────────┐
│  GitHub Pages (Static)                       │
│  index.html, product pages, React bundles    │
│  ──────────────────────────────────────────  │
│  Frontend JS calls → api.themoonexports.com  │
└───────────────────┬──────────────────────────┘
                    │  HTTPS
┌───────────────────▼──────────────────────────┐
│  Backend (C)  — modern-c-web-library         │
│  /healthz, /api/products, /api/contact       │
│  Middleware: CORS, rate-limit, logging, auth  │
│  Data: products.json → future DB             │
└──────────────────────────────────────────────┘
```

---

## 2. Milestones

### Milestone 1 — Scaffolding (✅ Complete)

- [x] Create `backend/` directory with CMake build
- [x] Add `FetchContent` for modern-c-web-library (tracks `main`)
- [x] Implement `main.c` with server, router, and health check
- [x] Add product listing routes (`GET /api/products`, `GET /api/products/:id`)
- [x] Add contact form route (`POST /api/contact`)
- [x] Add `Dockerfile` for containerised builds
- [x] Add `backend/README.md` with quick-start and API docs
- [x] Add configuration header (`include/config.h`)

### Milestone 2 — Core API (✅ Complete)

- [x] Parse and validate contact-form JSON body (name, email, message)
- [x] Add input validation (length, email format via library's `input_validate_*` API)
- [x] Sanitize user input via `input_sanitize_html()` to prevent XSS
- [x] Integrate CORS middleware using library's built-in `cors_middleware_create()`
- [x] Add rate-limiting middleware via `ratelimit_middleware_create()` (100 req/60s)
- [x] Add request logging middleware via `log_middleware_create()`
- [x] Add health check endpoint via `health_check_register()`
- [x] Add metrics endpoint via `metrics_register()`
- [x] Add signal handling (SIGINT, SIGTERM) for graceful shutdown
- [x] Add unit tests for validation (email, length) — CTest integration
- [x] Add CI pipeline: backend-build job (cmake → build → test)
- [ ] Load product data from `products.json` at startup (deferred — seed data sufficient for MVP)

### Milestone 3 — Authentication & Sessions

- [ ] Implement API-key authentication for admin endpoints
- [ ] Add session management for future admin panel
- [ ] Add CSRF protection for state-changing endpoints
- [ ] Evaluate JWT for stateless auth (library supports HMAC-SHA256)

### Milestone 4 — Data & Persistence

- [ ] Evaluate database options (SQLite via library's connection pool, or external)
- [ ] Implement product CRUD for admin management
- [ ] Add in-memory caching (LRU) for product listings
- [ ] Add enquiry storage for contact submissions

### Milestone 5 — Production Readiness (✅ Partially Complete)

- [x] Add graceful shutdown handling (signal handler + `http_server_stop()`)
- [x] Add structured logging via library's log middleware
- [x] Add metrics endpoint (`/metrics`)
- [x] Add health-check endpoint (`/healthz`)
- [x] Multi-stage Dockerfile (builder → runtime, non-root user)
- [x] Docker Compose with nginx reverse proxy
- [x] nginx config with security headers, rate limiting, gzip
- [x] Docker HEALTHCHECK instruction
- [ ] Enable response compression (gzip) at application layer
- [ ] Performance testing with library's benchmarking suite

### Milestone 6 — Advanced Features

- [ ] WebSocket support for real-time order notifications
- [ ] Template engine for server-rendered error/admin pages
- [ ] Static file serving (fallback for non-Pages deployment)
- [ ] Product search endpoint with query-string filters
- [ ] Email notification integration for contact submissions

---

## 3. API Design

### Current Endpoints

| Method | Path                | Auth | Description |
|--------|---------------------|------|-------------|
| GET    | `/`                 | None | Welcome / version info |
| GET    | `/healthz`          | None | Health check |
| GET    | `/api/products`     | None | List all products |
| GET    | `/api/products/:id` | None | Get product by ID |
| POST   | `/api/contact`      | None | Submit contact form |

### Planned Endpoints

| Method | Path                   | Auth    | Description |
|--------|------------------------|---------|-------------|
| GET    | `/api/products/search` | None    | Search/filter products |
| POST   | `/api/products`        | API Key | Create product (admin) |
| PUT    | `/api/products/:id`    | API Key | Update product (admin) |
| DELETE | `/api/products/:id`    | API Key | Delete product (admin) |
| GET    | `/metrics`             | API Key | Server metrics |

### Response Format

All JSON responses follow a consistent shape:

```json
{
  "status": "ok",
  "data": { … }
}
```

Error responses:

```json
{
  "error": "Description of what went wrong"
}
```

---

## 4. Frontend Integration

The frontend selects the API base URL based on the environment:

```javascript
const apiUrl = isDevelopment
  ? 'http://localhost:3000/api'
  : 'https://api.themoonexports.com';
```

React components (e.g., `ProductGrid.tsx`, `ContactForm.tsx`) will use `fetch()` against these endpoints. The backend enables CORS for the configured origin(s).

---

## 5. Development Workflow

```bash
# Terminal 1 — Backend
cd backend && mkdir -p build && cd build
cmake .. && make
./tme_backend          # http://localhost:3000

# Terminal 2 — Frontend (static)
npm run dev            # http://localhost:5000

# Terminal 3 — React dev server (optional)
cd react && npm run dev  # http://localhost:5173
```

Docker alternative:

```bash
cd backend
docker build -t tme-backend .
docker run --rm -p 3000:3000 tme-backend
```

---

## 6. Deployment Strategy

| Stage | Host | Notes |
|-------|------|-------|
| Frontend | GitHub Pages | Unchanged — static HTML + React bundles |
| Backend | VPS / Container | Docker image on any Linux host; reverse proxy via Nginx or Caddy |
| Domain | `api.themoonexports.com` | CNAME to backend host, TLS via Let's Encrypt |

### CI/CD Integration

The existing GitHub Actions CI pipeline (Phase 4) can be extended with a backend job:

```yaml
backend-build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - run: |
        cd backend
        mkdir build && cd build
        cmake .. && make
```

---

## 7. Security Considerations

- **CORS**: Restrict `Access-Control-Allow-Origin` to `https://www.themoonexports.com` (production) and `http://localhost:5000` (development)
- **Rate Limiting**: Token-bucket algorithm (100 req/60s window, 200 burst) at application layer + nginx `limit_req_zone`
- **Input Validation**: All contact form fields validated for length, email format; HTML sanitized via `input_sanitize_html()`
- **CSRF**: Double-submit cookie for POST endpoints (Milestone 3)
- **TLS**: Terminate at nginx reverse proxy; backend listens on localhost only
- **No Secrets in Code**: API keys and credentials via environment variables, never compiled in
- **Docker Security**: Runtime container uses non-root user (UID 1000), minimal attack surface
- **Security Headers**: nginx adds X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, HSTS

---

## 8. Known Trade-offs & Technical Debt

| Item | Status | Impact | Mitigation |
|------|--------|--------|------------|
| Product data is hardcoded (seed categories) | Deferred | No dynamic product management | Load from `products.json` in Milestone 2 follow-up |
| Contact form submissions are logged but not stored | Deferred | Submissions lost on restart | Add persistence in Milestone 4 |
| No authentication on any endpoints | Deferred | Admin endpoints will need auth | Planned for Milestone 3 (API key + JWT) |
| CORS origins are compiled constants | ✅ Resolved | Requires rebuild to change origins | Now configurable via `TME_CORS_ORIGIN` env var |
| Rate limiting is per-process (not shared) | Known | Multiple backend instances don't share limits | Acceptable for single-instance MVP |
| No CSRF protection on POST endpoints | Deferred | Contact form relies on CORS only | Planned for Milestone 3 |
| No response compression at application level | Deferred | Larger response payloads | nginx handles gzip; app-level compression planned |
| Library tracks `main` branch | ✅ Resolved | Breaking upstream change could fail build | Pinned to commit `90f0de91` |
| No integration tests for full request/response cycle | ✅ Resolved | Route behaviour tested indirectly | `test_routes.c` + `test_auth.c` added |
| No request body size limit | ✅ Resolved | Large POST could exhaust memory | `TME_MAX_BODY_SIZE` (64 KB) enforced |

---

## See Also

- [Backend Next Phase Plan](BACKEND_NEXT_PHASE_PLAN.md) — **First-principles plan for Milestones 3–6 (start here for next backend work)**
- [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library) — Library source and docs
- [Backend README](../backend/README.md) — Quick-start guide
- [Environment Configuration](ENVIRONMENT_CONFIGURATION.md) — API URL management
