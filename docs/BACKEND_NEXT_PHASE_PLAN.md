# Backend Next Phase — First-Principles Engineering Plan

**Created:** March 2026  
**Scope:** Backend Milestones 3–6 (Authentication, Persistence, Production Hardening, Advanced Features)  
**Status:** 🚀 Sprint 1 Complete — Sprint-ready execution plan  
**Dependency:** [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library) (pinned to `90f0de91`)

**Related Documents:**
- [Backend Implementation Plan](BACKEND_IMPLEMENTATION.md) — Architecture overview and Milestone 1–2 record
- [Backend README](../backend/README.md) — Quick-start and API reference
- [Phase 4 Implementation](PHASE_4_IMPLEMENTATION.md) — Frontend hardening (parallel track)
- [Security Checklist](SECURITY_CHECKLIST.md) — Site-wide security posture

---

## 0. Idea Intake

**Core problem in one sentence:**

> The backend API serves hardcoded seed data with no authentication, no persistence, and no CSRF protection — it cannot safely accept real user input or manage product data without completing Milestones 3–6.

---

## 1. Crystallized Brief

### Target Users

| User | Need | Impact of Doing Nothing |
|------|------|-------------------------|
| **Site visitors** | Submit contact forms that are reliably stored and trigger email notifications | Submissions are logged to stdout and lost on restart |
| **Site owner (admin)** | Manage products (create, update, delete) via authenticated API | Must edit seed data in C source and redeploy |
| **Frontend developers** | Consume a stable, documented, authenticated API | Cannot build admin UI or dynamic product features |
| **Operations** | Deploy with confidence: compression, benchmarks, production logging | No app-level gzip; no performance baseline; restart loses all state |

### Desired Outcomes (Measurable)

| Outcome | Current | Target | Verification |
|---------|---------|--------|--------------|
| Authentication on admin endpoints | None | API-key + optional JWT | `curl` without key returns 401 |
| CSRF protection on POST routes | None | Double-submit cookie | POST without valid token returns 403 |
| Product data source | 3 hardcoded categories in C | `products.json` loaded at startup (23 products) | `GET /api/products` returns 23 items |
| Contact form persistence | stdout log only | SQLite storage with retrieval endpoint | Submissions survive restart; `GET /api/enquiries` returns history |
| Response compression | None (nginx only) | App-level gzip via library | `Accept-Encoding: gzip` → compressed response |
| Performance baseline | None | Benchmarked with library's stress test suite | Documented: requests/sec, p99 latency |
| Product search | None | `GET /api/products/search?q=horn` | Returns filtered results |
| Email notifications | None | SMTP integration for contact submissions | Submission triggers email to configured recipient |
| Integration tests | None | HTTP-level request/response tests via CTest | `ctest` covers all routes |
| CORS origins | Compiled constants | Environment variable configuration | Change origin without rebuild |

### Non-Goals (Explicitly Deferred)

| Item | Why Deferred |
|------|-------------|
| Full admin UI (web dashboard) | Frontend concern; backend provides API only |
| User registration / multi-user auth | Single admin user (API key) is sufficient for current scale |
| PostgreSQL / MySQL migration | SQLite is appropriate for 23 products and low-volume enquiries |
| WebSocket real-time features | No current use case; evaluate after search and email ship |
| Template engine / server-rendered pages | Static site handles all rendering; backend is API-only |
| Horizontal scaling (multi-instance) | Single-instance deployment is sufficient; rate limits are per-process |

---

## 2. Grounded First-Principles Design

### What the backend actually looks like (measured March 2026)

#### Code Inventory

| Component | File | Lines | Status |
|-----------|------|-------|--------|
| Server entry + middleware | `src/main.c` | 104 | ✅ Working |
| Product routes | `src/routes/products.c` | 50 | ⚠️ Hardcoded seed data |
| Contact routes | `src/routes/contact.c` | 95 | ⚠️ No persistence |
| Route headers | `src/routes/*.h` | 28 | ✅ Clean interfaces |
| Configuration | `include/config.h` | 28 | ⚠️ CORS origins are compile-time constants |
| Validation tests | `tests/test_validation.c` | 51 | ✅ Passing |
| Build system | `CMakeLists.txt` | 42 | ✅ Working |
| Container | `Dockerfile` | 35 | ✅ Multi-stage, non-root |
| Reverse proxy | `nginx.conf` | 73 | ✅ Security headers + rate limiting |
| Orchestration | `docker-compose.yml` | 36 | ✅ Health checks |

#### Library Capabilities Available (Not Yet Used)

The modern-c-web-library provides these features that the backend does not yet use:

| Feature | Library API | Needed For |
|---------|-------------|------------|
| API-key auth middleware | `auth_middleware_create()` | Milestone 3 — admin endpoints |
| JWT creation/validation | `jwt_create()`, `jwt_verify()` | Milestone 3 — stateless auth |
| Session management | `session_middleware_create()` | Milestone 3 — CSRF tokens |
| SQLite connection pool | `db_pool_create()` | Milestone 4 — persistence |
| Database migrations | `db_migrate()` | Milestone 4 — schema management |
| LRU cache | `cache_create()` | Milestone 4 — product caching |
| Response compression | `compression_middleware_create()` | Milestone 5 — gzip |
| Static file serving | `static_middleware_create()` | Milestone 6 — fallback |
| WebSocket | `ws_handler_create()` | Milestone 6 — real-time (deferred) |
| Benchmarking suite | `benchmark_run()` | Milestone 5 — performance |
| SMTP client | `smtp_send()` | Milestone 6 — email |

#### Dependency Analysis

| Dependency | Version | Pinned? | Risk |
|------------|---------|---------|------|
| modern-c-web-library | `main` (latest) | ❌ No — tracks `main` | Medium — breaking change could fail build |
| GCC / C11 | System | N/A | Low |
| CMake ≥ 3.10 | System | N/A | Low |
| Ubuntu 22.04 (Docker) | LTS | ✅ Pinned | Low |
| nginx:alpine (Docker) | Latest | ❌ No | Low — reverse proxy only |

**Risk:** Tracking `main` branch means any upstream breaking change will break the CI build. **Mitigation:** Pin to a specific commit SHA or tag after v1.0.0.

#### Current Test Coverage

| Area | Tests | Coverage |
|------|-------|----------|
| Input validation (email, length) | 17 assertions | ✅ Good |
| Route handlers (products, contact) | 0 | ❌ None |
| Middleware (CORS, rate limit) | 0 | ❌ None |
| Integration (full HTTP request/response) | 0 | ❌ None |
| Auth (API key, JWT) | 0 | ❌ N/A (not implemented) |
| Database (SQLite operations) | 0 | ❌ N/A (not implemented) |

---

## 3. Adversarial Review — Attacking the Design

### Failure Mode Analysis

| # | Failure Mode | Likelihood | Impact | Current Protection |
|---|-------------|-----------|--------|-------------------|
| F-1 | Upstream library breaking change breaks CI (tracking `main`) | Medium | High — build fails, no deploys | **None** — no version pin |
| F-2 | SQLite file corruption on unclean shutdown | Low | High — all data lost | Signal handler exists but doesn't flush DB |
| F-3 | API key leaked in logs or error responses | Medium | Critical — admin access compromised | **None** — no auth exists yet |
| F-4 | CSRF bypass via missing token on POST endpoints | High | Medium — spam submissions | **None** — no CSRF protection |
| F-5 | SQL injection via product search query parameter | Medium | Critical — data exfiltration | **None** — no search exists yet |
| F-6 | Memory leak in JSON parsing on malformed input | Low | Medium — server degradation over time | Library handles cleanup; `json_value_free()` called |
| F-7 | Contact form used for spam/abuse (no CAPTCHA, no email verification) | High | Medium — storage fills, email spam | Rate limiting exists (100 req/60s) but no CAPTCHA |
| F-8 | products.json not found at startup → empty product list | Medium | Medium — site shows no products | **None** — currently hardcoded, so not applicable yet |
| F-9 | Docker image runs as UID 1000 but SQLite file needs write permissions | Medium | High — database operations fail | Need to ensure data directory has correct ownership |
| F-10 | CORS origins are compile-time → cannot change without rebuild | Known | Low — operational friction | Move to env var or config file |

### Hidden Risks

1. **SQLite + Docker volumes:** The database file must persist across container restarts. Docker Compose needs a named volume for the data directory. Without it, every `docker compose down` deletes all enquiry data.

2. **products.json location:** The `TME_STATIC_ROOT` config points to `../` (repo root). If the backend is deployed as a standalone container (not alongside the repo), `products.json` won't exist. Need a fallback or explicit data directory config.

3. **Email notification latency:** Sending SMTP email synchronously in the request handler will block the response. Contact form submissions will appear slow. Need async email dispatch or a queue.

4. **JWT secret management:** If JWT is used for stateless auth, the signing secret must be injected via environment variable, never compiled in. The current `config.h` pattern puts constants in source — this pattern must NOT be used for secrets.

5. **Rate limiting per-process:** The existing rate limiter is in-process memory. If the backend is restarted, all rate limit state is lost. An attacker can time abuse around restarts.

6. **No input size limit on request body:** The contact form handler reads `req->body` without checking content-length. A large POST body could exhaust memory. Library may handle this, but it needs verification.

### Critical Questions to Resolve

| # | Question | Impact | Resolution Path |
|---|----------|--------|-----------------|
| Q-1 | Does the library's `db_pool_create()` support SQLite, or only PostgreSQL? | Blocks Milestone 4 | Read library source / test |
| Q-2 | Does the library's `smtp_send()` support TLS (STARTTLS)? | Blocks email feature | Read library docs / test |
| Q-3 | What is the maximum request body size the library accepts? | Security concern | Test with large payload |
| Q-4 | Does `jwt_verify()` support key rotation or only single-key? | Affects auth design | Read library API |
| Q-5 | Is there a v1.0.0 tag or release we can pin to? | Reduces F-1 risk | Check upstream repo |

---

## 4. Design Iteration — Refined Architecture

### Revised Architecture

```
┌──────────────────────────────────────────────────┐
│  GitHub Pages (Static)                           │
│  index.html, product pages, React bundles        │
│  ──────────────────────────────────────────────  │
│  Frontend JS calls → api.themoonexports.com      │
└────────────────────┬─────────────────────────────┘
                     │ HTTPS
┌────────────────────▼─────────────────────────────┐
│  nginx reverse proxy                             │
│  TLS termination · rate limit · security headers │
└────────────────────┬─────────────────────────────┘
                     │ HTTP (internal)
┌────────────────────▼─────────────────────────────┐
│  Backend (C) — modern-c-web-library              │
│                                                  │
│  Middleware Pipeline:                             │
│  ┌──────┐ ┌─────────┐ ┌────────┐ ┌───────────┐  │
│  │ CORS │→│Rate Limit│→│Logging │→│Auth (new) │  │
│  └──────┘ └─────────┘ └────────┘ └───────────┘  │
│                                                  │
│  Public Routes:             Admin Routes:        │
│  GET  /healthz              POST /api/products   │
│  GET  /api/products         PUT  /api/products/:id│
│  GET  /api/products/:id     DELETE /api/products/:id│
│  GET  /api/products/search  GET  /api/enquiries  │
│  POST /api/contact          GET  /metrics        │
│                                                  │
│  ┌──────────────┐  ┌──────────────┐              │
│  │ SQLite DB    │  │ LRU Cache    │              │
│  │ products     │  │ product list │              │
│  │ enquiries    │  │ (in-memory)  │              │
│  └──────┬───────┘  └──────────────┘              │
│         │ /data/tme.db (Docker volume)           │
└─────────┴────────────────────────────────────────┘
```

### Key Design Decisions

| Decision | Rationale | Alternative Considered |
|----------|-----------|----------------------|
| **SQLite for persistence** | Zero-dependency, embedded, sufficient for ~100 products and ~1000 enquiries/month | PostgreSQL — overkill for this scale |
| **API-key auth (not OAuth)** | Single admin user; no user registration needed | OAuth2 — excessive complexity |
| **Double-submit cookie for CSRF** | Stateless; works with SPA frontends | Synchronizer token — requires server-side session state |
| **Env vars for secrets** | Standard container pattern; no secrets in source | Config file — harder to manage in Docker |
| **Pin library to commit SHA** | Prevents upstream breakage; explicit upgrade path | Tag pin — no stable tag exists beyond main |
| **Async email via fire-and-forget thread** | Avoids blocking the HTTP response | Message queue — over-engineered for volume |
| **products.json as seed, SQLite as source of truth** | Import once, then manage via API | JSON file as live data source — no mutation support |

### Revised Priority Order (Based on Adversarial Review)

1. **Pin library dependency** — Prevent F-1 (upstream breakage)
2. **Move CORS origins to env vars** — Resolve F-10 (operational friction)
3. **Add request body size limit** — Address F-6 risk
4. **Add integration tests** — Must exist before adding new features
5. **Add API-key auth middleware** — Gate admin endpoints
6. **Add CSRF protection** — Protect POST endpoints
7. **Add SQLite persistence** — Products + enquiries
8. **Load products.json as seed data** — Bootstrap database
9. **Add product search endpoint** — Query-string filtering
10. **Add LRU cache for product listings** — Performance
11. **Add response compression** — Reduce payload sizes
12. **Run performance benchmarks** — Establish baseline
13. **Add email notifications** — Contact form alerts
14. **Add product CRUD endpoints** — Admin management

---

## 5. Atomic Planning — Task Breakdown

Every task is:
- **Atomic** — completable in ≤ 4 hours
- **Verifiable** — has a concrete pass/fail check
- **Assignable** — can be done independently

### Sprint 1: Stability & Testing Foundation (Week 1–2)

> Theme: Pin dependencies, add integration tests, move config to env vars

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| S1-01 | Pin `modern-c-web-library` in CMakeLists.txt to a specific commit SHA (latest known-good) | `FetchContent` uses `GIT_TAG <sha>` not `main` | 30m | — |
| S1-02 | Add `TME_CORS_ORIGIN` and `TME_CORS_ORIGIN_DEV` as env-var overrides in `main.c` (fall back to config.h defaults) | `TME_CORS_ORIGIN=http://test:9000 ./tme_backend` → CORS header reflects env var | 1h | — |
| S1-03 | Add `TME_MAX_BODY_SIZE` config constant (default 64 KB); check `Content-Length` in contact handler before parsing | `curl` with 100 KB body → 413 Payload Too Large | 1h | — |
| S1-04 | Create `tests/test_routes.c` — integration tests using library's HTTP client (or `curl` subprocess) for `/healthz`, `/api/products`, `/api/products/:id` | `ctest` runs route tests; all pass | 3h | — |
| S1-05 | Add integration tests for `POST /api/contact` — valid body, missing fields, invalid email, oversized body | `ctest` runs; all assertions pass | 2h | S1-03, S1-04 |
| S1-06 | Add `tests/test_auth.c` stub — test that auth middleware rejects requests without API key (will be implemented in S2) | Test file compiles and is skipped until auth lands | 30m | — |
| S1-07 | Update CI pipeline (`ci.yml` `backend-build` job) to run all new tests | CI passes with expanded test suite | 30m | S1-04, S1-05 |
| S1-08 | Add `.env.backend.template` with all configurable values (port, CORS origins, log level, future DB path, future API key) | Template file exists; `backend/README.md` references it | 30m | S1-02 |
| S1-09 | Update `backend/README.md` — document env-var overrides, new test suite, pinned dependency | README is accurate | 30m | S1-01 through S1-08 |

**Sprint 1 Exit Criteria:**
- [x] Library dependency pinned to specific commit SHA
- [x] CORS origins configurable via environment variables
- [x] Request body size limited to 64 KB
- [x] Integration tests cover all existing routes (≥ 10 test assertions)
- [x] CI runs expanded test suite
- [x] Configuration documented in `.env.backend.template`

---

### Sprint 2: Authentication & CSRF (Week 3–4)

> Theme: Secure admin endpoints, protect POST routes

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| S2-01 | Add `auth_middleware_create()` to middleware pipeline; gate `/api/products` POST/PUT/DELETE and `/metrics` behind API key | `curl -H "X-API-Key: test"` → 200; without header → 401 | 3h | S1 complete |
| S2-02 | Add `TME_API_KEY` env var (required for startup; server refuses to start without it) | `./tme_backend` without env var → error message and exit 1 | 1h | S2-01 |
| S2-03 | Add CSRF double-submit cookie middleware for POST endpoints | POST with matching cookie + header → 200; mismatch → 403 | 3h | S2-01 |
| S2-04 | Add `GET /api/csrf-token` endpoint — returns a new CSRF token and sets cookie | Response contains `{ "token": "..." }` and `Set-Cookie` header | 1h | S2-03 |
| S2-05 | Evaluate JWT support via library's `jwt_create()` / `jwt_verify()` — document findings | Decision recorded: use JWT or stick with API key only | 2h | S2-01 |
| S2-06 | If JWT viable: add `POST /api/auth/login` → returns JWT; add JWT validation middleware alongside API key | `curl` with valid JWT → 200; expired/invalid → 401 | 3h | S2-05 |
| S2-07 | Update integration tests (`test_auth.c`) — test auth rejection, API key acceptance, CSRF validation | `ctest` runs all auth tests; all pass | 2h | S2-01 through S2-04 |
| S2-08 | Update nginx.conf — ensure `X-API-Key` header is passed through proxy; add CSRF cookie config | `curl` through nginx works for authenticated requests | 1h | S2-01 |
| S2-09 | Update `backend/README.md` — document auth setup, API key requirement, CSRF flow | README covers auth | 30m | S2-01 through S2-08 |

**Sprint 2 Exit Criteria:**
- [ ] Admin endpoints require API key (401 without)
- [ ] POST endpoints protected by CSRF double-submit cookie (403 without)
- [ ] API key injected via environment variable, never in source
- [ ] JWT evaluated and decision documented
- [ ] Auth test suite passes in CI
- [ ] nginx passes auth headers correctly

---

### Sprint 3: Data & Persistence (Week 5–6)

> Theme: SQLite database, product CRUD, enquiry storage

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| S3-01 | Add `src/db.c` / `src/db.h` — SQLite initialization via library's `db_pool_create()`, schema creation (products + enquiries tables) | Database file created on startup at `TME_DB_PATH` | 3h | S2 complete |
| S3-02 | Add `TME_DB_PATH` env var and config.h default (`./data/tme.db`); create directory on startup if absent | `TME_DB_PATH=/tmp/test.db ./tme_backend` → DB created at path | 1h | S3-01 |
| S3-03 | Add `src/seed.c` / `src/seed.h` — load `products.json` on first startup, insert into products table (skip if already seeded) | First run: 23 products inserted; second run: skip message logged | 2h | S3-01 |
| S3-04 | Refactor `products.c` — `GET /api/products` reads from SQLite instead of hardcoded array | `curl /api/products` → returns 23 products from database | 2h | S3-01, S3-03 |
| S3-05 | Refactor `products.c` — `GET /api/products/:id` reads from SQLite | `curl /api/products/5` → returns product with id 5 from database | 1h | S3-04 |
| S3-06 | Add `POST /api/products` (admin, auth required) — create product | `curl -X POST -H "X-API-Key: ..." -d '{"name":"New"}' /api/products` → 201 Created | 2h | S2-01, S3-04 |
| S3-07 | Add `PUT /api/products/:id` (admin, auth required) — update product | `curl -X PUT -H "X-API-Key: ..." -d '{"name":"Updated"}' /api/products/1` → 200 | 2h | S3-06 |
| S3-08 | Add `DELETE /api/products/:id` (admin, auth required) — delete product | `curl -X DELETE -H "X-API-Key: ..." /api/products/1` → 200; subsequent GET → 404 | 1h | S3-07 |
| S3-09 | Refactor `contact.c` — store submission in enquiries table before logging | `POST /api/contact` → row inserted; survives restart | 2h | S3-01 |
| S3-10 | Add `GET /api/enquiries` (admin, auth required) — list contact submissions | `curl -H "X-API-Key: ..." /api/enquiries` → returns stored submissions | 1h | S3-09 |
| S3-11 | Add LRU cache for `GET /api/products` — cache product list, invalidate on write | First GET is DB query; second is cache hit (log shows "cache hit") | 2h | S3-04 |
| S3-12 | Add Docker volume for data directory in `docker-compose.yml` | `docker compose down && docker compose up` → data persists | 30m | S3-02 |
| S3-13 | Add database migration support — version table, schema upgrade path | `db_migrate()` runs on startup; version recorded | 2h | S3-01 |
| S3-14 | Add database tests (`tests/test_db.c`) — insert, select, update, delete, migration | `ctest` runs DB tests; all pass | 3h | S3-01 through S3-10 |
| S3-15 | Ensure graceful shutdown flushes SQLite WAL and closes connections | Kill -SIGTERM → "Database closed cleanly" in logs | 1h | S3-01 |

**Sprint 3 Exit Criteria:**
- [ ] SQLite database created on startup with products + enquiries schema
- [ ] products.json seeded on first run (23 products)
- [ ] All product endpoints read from database
- [ ] Product CRUD available on admin endpoints (auth required)
- [ ] Contact submissions persisted in database
- [ ] Enquiry retrieval endpoint available (auth required)
- [ ] LRU cache for product listings
- [ ] Docker volume preserves data across restarts
- [ ] Database tests pass in CI
- [ ] Graceful shutdown closes database connections

---

### Sprint 4: Production Hardening (Week 7–8)

> Theme: Compression, performance baselines, search, email

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| S4-01 | Add `compression_middleware_create()` to middleware pipeline | `curl -H "Accept-Encoding: gzip" /api/products` → compressed response | 1h | S3 complete |
| S4-02 | Add `GET /api/products/search?q=horn&category=crafts` — search with query params, SQL LIKE or FTS | `curl /api/products/search?q=horn` → filtered results | 3h | S3-04 |
| S4-03 | Add input validation and sanitization for search query parameter | `q=<script>alert(1)</script>` → sanitized, no injection | 1h | S4-02 |
| S4-04 | Add pagination to `GET /api/products` and `GET /api/enquiries` — `?page=1&limit=20` | `curl /api/products?page=2&limit=5` → 5 results, page metadata | 2h | S3-04, S3-10 |
| S4-05 | Run library's benchmarking suite against all endpoints — document results | Benchmark report: req/sec, p50/p95/p99 latency per endpoint | 2h | S4-01 |
| S4-06 | Add SMTP email notification for contact submissions via library's `smtp_send()` | Contact submission → email sent to configured recipient | 3h | S3-09 |
| S4-07 | Make email dispatch async (fire-and-forget thread) — do not block HTTP response | Response time unchanged with email enabled vs disabled | 1h | S4-06 |
| S4-08 | Add `TME_SMTP_HOST`, `TME_SMTP_PORT`, `TME_SMTP_USER`, `TME_SMTP_PASS`, `TME_NOTIFY_EMAIL` env vars | Email config via env vars; no secrets in source | 30m | S4-06 |
| S4-09 | Add TLS support verification for nginx (Let's Encrypt cert paths in nginx.conf) | `curl -I https://api.themoonexports.com` → valid cert | 1h | — |
| S4-10 | Add `prometheus`-compatible metrics format to `/metrics` endpoint | Prometheus can scrape `/metrics`; graphs show request rate | 2h | — |
| S4-11 | Update Dockerfile — add data volume mount point, document env var injection | Dockerfile docs cover all env vars | 30m | S3-12, S4-08 |
| S4-12 | Add performance tests (`tests/test_perf.c`) — verify response time under load | `ctest` performance tests pass within thresholds | 2h | S4-05 |
| S4-13 | Update `backend/README.md` — document search, pagination, email, compression, metrics | README covers all new features | 1h | S4-01 through S4-12 |

**Sprint 4 Exit Criteria:**
- [ ] Response compression enabled (gzip)
- [ ] Product search endpoint functional with sanitized input
- [ ] Pagination on list endpoints
- [ ] Performance baseline documented (req/sec, latency)
- [ ] Email notifications for contact submissions (async)
- [ ] TLS configuration ready for production
- [ ] Prometheus-compatible metrics
- [ ] All features documented

---

## 6. Parallel Build Strategy

### Modules That Can Be Developed Simultaneously

```
PARALLEL TRACK A (Testing)              PARALLEL TRACK B (Configuration)
──────────────────────────              ────────────────────────────────
S1-04: Route integration tests          S1-01: Pin library dependency
S1-05: Contact route tests              S1-02: Env-var CORS overrides
S1-06: Auth test stubs                  S1-03: Request body size limit
                                        S1-08: .env.backend.template

PARALLEL TRACK C (Auth)                 PARALLEL TRACK D (Database Schema)
──────────────────────────              ──────────────────────────────────
S2-01: API-key middleware               S3-01: SQLite init + schema
S2-03: CSRF middleware                  S3-02: DB path config
S2-04: CSRF token endpoint             S3-13: Migration framework
S2-05: JWT evaluation                   (can start schema design before auth ships)

PARALLEL TRACK E (Data)                 PARALLEL TRACK F (Production)
──────────────────────────              ──────────────────────────────
S3-03: Seed from products.json          S4-01: Compression middleware
S3-04: Refactor product routes          S4-09: TLS config
S3-09: Contact persistence             S4-10: Prometheus metrics
S3-11: LRU cache                        (can start infra before data ships)

              SEQUENTIAL (each depends on prior track)
              ────────────────────────────────────────
              S2-01 → S3-06 (admin routes need auth)
              S3-04 → S4-02 (search needs DB products)
              S3-09 → S4-06 (email needs stored contact)
              All → S4-05 (benchmarks need all features)
```

### Developer Assignment (2 developers)

| Developer | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 |
|-----------|----------|----------|----------|----------|
| **Dev A** | Track A (tests) + S1-07 (CI) | S2-01–S2-04 (auth) + S2-07 (auth tests) | S3-06–S3-08 (CRUD) + S3-14 (DB tests) | S4-02–S4-04 (search + pagination) |
| **Dev B** | Track B (config) + S1-09 (docs) | S2-05–S2-06 (JWT) + S2-08–S2-09 (nginx + docs) | S3-01–S3-05 (DB + seed + read routes) + S3-09–S3-13 (enquiries + cache + Docker) | S4-01 (compression) + S4-05–S4-08 (perf + email) |

---

## 7. Build Validation — Success Criteria Per Module

### Automated Checks (CI Pipeline)

| Check | Tool | Threshold | Sprint |
|-------|------|-----------|--------|
| C compilation | `cmake && make` | 0 errors, 0 warnings (`-Wall -Wextra`) | Existing |
| Unit tests | `ctest` (test_validation) | All pass | Existing |
| **Integration tests** | `ctest` (test_routes) | **All pass** | **Sprint 1** |
| **Auth tests** | `ctest` (test_auth) | **All pass** | **Sprint 2** |
| **Database tests** | `ctest` (test_db) | **All pass** | **Sprint 3** |
| **Performance tests** | `ctest` (test_perf) | **Response time < 50ms p99** | **Sprint 4** |
| Docker build | `docker build` | Image builds successfully | Existing |
| npm audit (root) | `npm audit` | 0 critical | Existing |

### Manual Checks (Per Sprint)

| Check | Method | When |
|-------|--------|------|
| Server starts and responds to healthcheck | `curl http://localhost:3000/healthz` | Every sprint |
| CORS headers correct for configured origins | `curl -H "Origin: ..." -I` | Sprint 1 |
| Oversized request body rejected | `curl` with 100 KB payload → 413 | Sprint 1 |
| Admin endpoint rejects unauthenticated request | `curl` without API key → 401 | Sprint 2 |
| CSRF validation blocks forged POST | `curl -X POST` without CSRF token → 403 | Sprint 2 |
| Product list returns 23 products from DB | `curl /api/products \| jq '.products \| length'` → 23 | Sprint 3 |
| Contact submission persists across restart | POST → restart → `GET /api/enquiries` shows submission | Sprint 3 |
| Docker Compose preserves data across down/up | `docker compose down && docker compose up` → data intact | Sprint 3 |
| Gzip compression reduces response size | Compare `Content-Length` with and without `Accept-Encoding: gzip` | Sprint 4 |
| Search returns filtered results | `curl /api/products/search?q=horn` → only horn products | Sprint 4 |
| Email notification arrives for contact submission | Submit contact form → check inbox | Sprint 4 |

### Checkpoint Gates

| Gate | Condition | Blocks |
|------|-----------|--------|
| **G1: Tests Green** | All existing + new tests pass | Sprint 2 start |
| **G2: Auth Secure** | API key works, CSRF works, no bypass | Sprint 3 start |
| **G3: Data Persists** | SQLite survives restart and Docker cycling | Sprint 4 start |
| **G4: Production Ready** | Compression, benchmarks, email, search all functional | Release |

---

## 8. QA Pipeline

### Pre-Merge Checklist (Every PR)

```
AUTOMATED (CI must pass):
├── cmake -DCMAKE_BUILD_TYPE=Release ..  → 0 warnings
├── make -j$(nproc)                      → Build succeeds
├── ctest --output-on-failure            → All tests pass
│   ├── test_validation                  → 17+ assertions pass
│   ├── test_routes                      → Route integration tests pass
│   ├── test_auth                        → Auth/CSRF tests pass
│   ├── test_db                          → Database tests pass
│   └── test_perf                        → Performance within thresholds
├── docker build .                       → Image builds
└── shellcheck / hadolint                → Dockerfile lint passes

MANUAL (Developer verifies):
├── Start server locally (./tme_backend)
├── curl /healthz → 200
├── curl /api/products → JSON response
├── curl -X POST /api/contact with valid body → 200
├── curl -X POST /api/contact with invalid email → 400
├── curl without API key on admin endpoint → 401
├── curl -X POST without CSRF token → 403
├── Docker Compose up → both services healthy
├── curl through nginx → correct security headers
└── Review server logs for errors or warnings
```

### Regression Test Matrix

| Endpoint | Method | Auth | Valid Input | Invalid Input | Edge Cases |
|----------|--------|------|------------|---------------|------------|
| `/healthz` | GET | None | → 200 | N/A | High load |
| `/api/products` | GET | None | → 200 + products | N/A | Empty DB |
| `/api/products/:id` | GET | None | → 200 + product | Missing id → 400 | Non-existent id → 404 |
| `/api/products/search` | GET | None | `?q=horn` → filtered | `?q=` → 400 | XSS in query |
| `/api/products` | POST | API Key | Valid JSON → 201 | Missing fields → 400 | Duplicate name |
| `/api/products/:id` | PUT | API Key | Valid JSON → 200 | Invalid id → 404 | Partial update |
| `/api/products/:id` | DELETE | API Key | Valid id → 200 | Invalid id → 404 | Delete + re-GET |
| `/api/contact` | POST | CSRF | Valid JSON → 200 | Missing name → 400 | 64 KB body limit |
| `/api/enquiries` | GET | API Key | → 200 + list | N/A | Empty list |
| `/api/csrf-token` | GET | None | → 200 + token + cookie | N/A | Rapid requests |
| `/metrics` | GET | API Key | → 200 + metrics | No key → 401 | Prometheus format |

### Load Testing Plan

| Scenario | Tool | Target | Threshold |
|----------|------|--------|-----------|
| Sustained load | Library benchmark suite | `GET /api/products` | ≥ 5,000 req/sec |
| Burst traffic | `wrk -c 100 -d 10s` | All endpoints | p99 < 50ms |
| Rate limit verification | Rapid `curl` loop | Contact endpoint | 101st request → 429 |
| Large payload | `curl` with 100 KB body | Contact endpoint | → 413 |

---

## 9. Security Review — Threat Model

### Attack Surface (Backend-Specific)

| Vector | Risk Level | Current State | Mitigation (This Plan) |
|--------|-----------|---------------|----------------------|
| **Unauthenticated admin access** | Critical | No auth on any endpoint | API-key middleware (S2-01); all admin routes gated |
| **CSRF on POST endpoints** | High | No CSRF protection | Double-submit cookie (S2-03) |
| **SQL injection via search** | Critical | No search exists (yet) | Parameterized queries only (S4-02); `input_sanitize_html()` |
| **SQL injection via product CRUD** | Critical | No CRUD exists (yet) | Parameterized queries for all DB operations (S3-06–S3-08) |
| **Request body bomb** | Medium | No size limit | `TME_MAX_BODY_SIZE` = 64 KB (S1-03) |
| **API key in logs** | Medium | No auth exists | Never log API key value; log only "authenticated: yes/no" |
| **JWT secret in source** | Critical | No JWT exists | Env var only (`TME_JWT_SECRET`); refuse startup without it |
| **SQLite injection via contact form** | Medium | No DB exists | Parameterized queries; `input_sanitize_html()` already applied |
| **Email header injection** | Medium | No email exists | Validate email format (existing); sanitize name field |
| **SMTP credential leak** | Medium | No SMTP exists | Env vars only; never log credentials |
| **Upstream dependency compromise** | Medium | Tracks `main` | Pin to specific commit SHA (S1-01) |
| **Docker escape** | Low | Non-root user (UID 1000) | No change needed; runtime is minimal |
| **Data loss on crash** | Medium | No persistence | SQLite WAL mode; graceful shutdown flushes (S3-15) |

### Data Safety

| Data Type | Storage | Protection | PII? |
|-----------|---------|------------|------|
| Product catalog | SQLite (`products` table) | No PII | No |
| Contact submissions | SQLite (`enquiries` table) | Contains name, email, message | **Yes** |
| API key | Environment variable | Never logged, never in source | Credential |
| JWT secret | Environment variable | Never logged, never in source | Credential |
| SMTP credentials | Environment variable | Never logged, never in source | Credential |
| Request logs | stdout (nginx + app) | IP addresses logged | **Partial PII** |

### PII Handling Requirements

| Requirement | Implementation |
|-------------|---------------|
| Contact submissions contain PII (name, email) | Encrypt at rest (SQLite encryption extension) or document as accepted risk |
| Right to deletion | `DELETE /api/enquiries/:id` (admin endpoint) — planned for Sprint 3 |
| Data retention | Configurable `TME_ENQUIRY_RETENTION_DAYS` — auto-delete old submissions |
| Log PII | Do NOT log email addresses in application logs; log only "submission received from [redacted]" |
| GDPR compliance | Document data processing in privacy policy; link to `legal/privacy.html` |

### Access Control Matrix

| Resource | Public | Authenticated (API Key) | Internal Only |
|----------|--------|------------------------|---------------|
| `GET /healthz` | ✅ | — | — |
| `GET /api/products` | ✅ | — | — |
| `GET /api/products/:id` | ✅ | — | — |
| `GET /api/products/search` | ✅ | — | — |
| `POST /api/contact` | ✅ (CSRF) | — | — |
| `GET /api/csrf-token` | ✅ | — | — |
| `POST /api/products` | — | ✅ | — |
| `PUT /api/products/:id` | — | ✅ | — |
| `DELETE /api/products/:id` | — | ✅ | — |
| `GET /api/enquiries` | — | ✅ | — |
| `GET /metrics` | — | — | ✅ (nginx `allow 127.0.0.1`) |

### Security Testing Checklist

| Test | Method | Expected Result |
|------|--------|-----------------|
| Admin endpoint without API key | `curl -X POST /api/products` | 401 Unauthorized |
| Admin endpoint with wrong API key | `curl -H "X-API-Key: wrong"` | 401 Unauthorized |
| POST without CSRF token | `curl -X POST /api/contact -d '{...}'` | 403 Forbidden |
| SQL injection in search | `curl /api/products/search?q='; DROP TABLE products; --` | Sanitized; no DB error |
| SQL injection in contact name | `curl -d '{"name":"'; DROP TABLE...","email":"a@b.com","message":"x"}'` | Sanitized; stored safely |
| XSS in contact message | `curl -d '{"name":"a","email":"a@b.com","message":"<script>alert(1)</script>"}'` | HTML sanitized; stored safely |
| Oversized body | `curl -d @large_file.json /api/contact` | 413 Payload Too Large |
| Rate limit exceeded | 101 requests in 60 seconds | 429 Too Many Requests |
| CORS from unauthorized origin | `curl -H "Origin: https://evil.com"` | No `Access-Control-Allow-Origin` header |
| Metrics from external IP | `curl http://public-ip/metrics` | 403 Forbidden (nginx denies) |

---

## 10. Risk Mitigation Summary

| Risk | Severity | Probability | Mitigation | Owner |
|------|----------|-------------|------------|-------|
| Upstream library breaking change | High | Medium | Pin to commit SHA; test before upgrading | Dev B |
| SQLite data loss on crash | High | Low | WAL mode + graceful shutdown handler | Dev B |
| API key leak via logs | Critical | Medium | Never log key value; audit all log statements | Both |
| SMTP credentials in source | Critical | Low | Env vars only; CI check for hardcoded secrets | Both |
| SQL injection | Critical | Medium | Parameterized queries everywhere; no string concatenation | Dev A |
| Email dispatch blocks response | Medium | High | Async thread for SMTP; timeout on connection | Dev B |
| Docker volume not configured | High | Medium | Default `docker-compose.yml` includes named volume | Dev B |
| JWT secret too weak | High | Low | Minimum 256-bit key; refuse startup if too short | Dev A |
| Contact form spam | Medium | High | Rate limiting (existing) + CSRF (Sprint 2) | Dev A |
| products.json not found on startup | Medium | Medium | Graceful fallback: log warning, start with empty catalog | Dev B |

---

## 11. Milestone Roadmap (Visual)

```
Week 1-2              Week 3-4              Week 5-6              Week 7-8
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│  SPRINT 1        │   │  SPRINT 2        │   │  SPRINT 3        │   │  SPRINT 4        │
│  Stability &     │   │  Authentication  │   │  Data &          │   │  Production      │
│  Testing         │   │  & CSRF          │   │  Persistence     │   │  Hardening       │
│                  │   │                  │   │                  │   │                  │
│ ▸ Pin library    │   │ ▸ API-key auth   │   │ ▸ SQLite init    │   │ ▸ Gzip compress  │
│ ▸ Env var config │   │ ▸ CSRF protect   │   │ ▸ Seed products  │   │ ▸ Product search │
│ ▸ Body size limit│   │ ▸ JWT evaluate   │   │ ▸ Product CRUD   │   │ ▸ Pagination     │
│ ▸ Integration    │   │ ▸ Auth tests     │   │ ▸ Enquiry store  │   │ ▸ Benchmarks     │
│   tests          │   │ ▸ nginx update   │   │ ▸ LRU cache      │   │ ▸ Email notify   │
│ ▸ CI update      │   │                  │   │ ▸ Docker volume  │   │ ▸ TLS config     │
│ ▸ .env template  │   │                  │   │ ▸ DB migrations  │   │ ▸ Prometheus     │
│                  │   │                  │   │ ▸ DB tests       │   │   metrics        │
│  9 tasks         │   │  9 tasks         │   │  15 tasks        │   │  13 tasks        │
│  ~12h effort     │   │  ~16h effort     │   │  ~24h effort     │   │  ~20h effort     │
│                  │   │                  │   │                  │   │                  │
│ Gate: G1         │   │ Gate: G2         │   │ Gate: G3         │   │ Gate: G4         │
│ Tests Green      │   │ Auth Secure      │   │ Data Persists    │   │ Prod Ready       │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

**Total estimated effort:** ~72 hours (46 tasks across 4 sprints)

---

## 12. Post-Sprint 4 Forward Look

| Initiative | Prerequisite | Est. Scope |
|-----------|-------------|------------|
| WebSocket for real-time notifications | Sprint 4 complete | 1–2 weeks |
| Admin dashboard (React) | Backend CRUD API (Sprint 3) | 2–3 weeks |
| Product image upload API | SQLite + file storage | 1–2 weeks |
| Full-text search (SQLite FTS5) | Basic search working (Sprint 4) | 1 week |
| Multi-language product data | Database schema supports locale | 1 week |
| API versioning (`/api/v2/`) | All current endpoints stable | 1 week |

---

## Appendix: Verification Commands

These commands reproduce the assessments in this document. Run from `backend/` directory.

```bash
# Build and test
mkdir -p build && cd build
cmake -DCMAKE_BUILD_TYPE=Debug -DBUILD_TESTS=ON ..
make -j"$(nproc)"
ctest --output-on-failure

# Verify health check
curl -s http://localhost:3000/healthz | jq .

# Verify products endpoint
curl -s http://localhost:3000/api/products | jq '.products | length'

# Test contact validation (should return 400)
curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"invalid","message":""}' | jq .

# Test oversized body (Sprint 1)
dd if=/dev/urandom bs=100000 count=1 2>/dev/null | \
  curl -s -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d @- -w "%{http_code}"

# Test auth rejection (Sprint 2)
curl -s -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"test"}' -w "%{http_code}"
# Expected: 401

# Test CORS header
curl -s -I -H "Origin: https://www.themoonexports.com" \
  http://localhost:3000/api/products | grep -i "access-control"

# Docker build
docker build -t tme-backend .
docker run --rm -p 3000:3000 tme-backend &
sleep 2
curl -s http://localhost:3000/healthz | jq .

# Line count
find src/ include/ tests/ -name '*.c' -o -name '*.h' | xargs wc -l
```

---

*This document is grounded in measured codebase state, not prior documentation claims.*  
*Every capability assessment was verified against the actual source code and library documentation.*  
*Created: March 2026*
