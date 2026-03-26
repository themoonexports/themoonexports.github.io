# The Moon Exports — Backend API

A lightweight C backend for The Moon Exports, built on top of [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library) (pinned to commit `90f0de91`).

## Prerequisites

- **GCC** (or any C11 compiler)
- **CMake** ≥ 3.10
- **Git** (CMake fetches the library automatically)
- Or **Docker** (no local toolchain needed)

## Quick Start

### Option 1 — Build locally

```bash
cd backend
mkdir build && cd build
cmake ..
make
./tme_backend          # starts on port 3000
./tme_backend 8080     # custom port
```

### Option 2 — Docker

```bash
cd backend
docker build -t tme-backend .
docker run --rm -p 3000:3000 tme-backend
```

## API Endpoints

| Method | Path                  | Auth     | Description                |
|--------|-----------------------|----------|----------------------------|
| GET    | `/`                   | None     | Welcome message            |
| GET    | `/healthz`            | None     | Health check (JSON)        |
| GET    | `/api/products`       | None     | List product categories    |
| GET    | `/api/products/:id`   | None     | Single product by ID       |
| POST   | `/api/contact`        | None     | Contact form submission    |
| GET    | `/metrics`            | Internal | Server metrics             |

### Example requests

```bash
# Health check
curl http://localhost:3000/healthz

# List products
curl http://localhost:3000/api/products

# Submit contact form
curl -X POST http://localhost:3000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"name":"Jane","email":"jane@example.com","message":"Hello!"}'
```

## Project Structure

```
backend/
├── CMakeLists.txt          # Build config; fetches modern-c-web-library (pinned SHA)
├── Dockerfile              # Multi-stage production build (non-root user)
├── docker-compose.yml      # Backend + nginx reverse proxy
├── nginx.conf              # Reverse proxy with security headers
├── .env.backend.template   # Environment variable template
├── include/
│   └── config.h            # Port, CORS, rate-limit, body-size, version defaults
├── src/
│   ├── main.c              # Server entry point (middleware, env-var config, signal handling)
│   └── routes/
│       ├── products.c / .h # /api/products endpoints
│       └── contact.c  / .h # /api/contact endpoint (validated, sanitized, body-size limited)
├── tests/
│   ├── CMakeLists.txt      # CTest integration
│   ├── test_validation.c   # Input validation unit tests
│   ├── test_routes.c       # Route integration tests (JSON, sanitization, router)
│   └── test_auth.c         # Auth test stubs (Sprint 2 ready)
└── README.md               # ← you are here
```

## Configuration

### Compile-Time Defaults

Defaults are defined in `include/config.h`:

| Constant               | Default                              | Purpose               |
|------------------------|--------------------------------------|-----------------------|
| `TME_VERSION`          | `"1.1.0"`                            | API version string    |
| `TME_DEFAULT_PORT`     | `3000`                               | Listen port           |
| `TME_LOG_LEVEL`        | `LOG_LEVEL_INFO`                     | Minimum log level     |
| `TME_CORS_ORIGIN`      | `https://www.themoonexports.com`     | Production CORS       |
| `TME_CORS_ORIGIN_DEV`  | `http://localhost:5000`              | Dev CORS              |
| `TME_RATE_LIMIT_MAX`   | `100`                                | Requests per window   |
| `TME_RATE_LIMIT_WINDOW`| `60`                                 | Window in seconds     |
| `TME_MAX_BODY_SIZE`    | `65536`                              | Max request body (64 KB) |
| `TME_DB_PATH_DEFAULT`  | `./data/tme.db`                      | SQLite DB path        |

### Runtime Environment Variables

Environment variables override compile-time defaults. See `.env.backend.template` for a full list.

| Variable              | Default (from config.h)             | Description            |
|-----------------------|-------------------------------------|------------------------|
| `TME_PORT`            | `3000`                              | Listen port            |
| `TME_CORS_ORIGIN`     | `https://www.themoonexports.com`    | Production CORS origin |
| `TME_CORS_ORIGIN_DEV` | `http://localhost:5000`             | Dev CORS origin        |

Example: override CORS origins for staging:

```bash
TME_CORS_ORIGIN=https://staging.themoonexports.com \
TME_CORS_ORIGIN_DEV=http://localhost:3001 \
./tme_backend
```

## Middleware Pipeline

The server applies these middleware in order on every request:

1. **CORS** — Allows configured origins (env var or compiled default)
2. **Rate Limiting** — Token-bucket: 100 req/60s, burst 200
3. **Logging** — Structured request logging to stdout

## Security

- **Request body size limit** — POST bodies larger than 64 KB are rejected with `413 Payload Too Large`
- **Input validation** — Name (1-100 chars), email (format), message (1-2000 chars) validated
- **HTML sanitization** — User input sanitized via `input_sanitize_html()` to prevent XSS
- **Rate limiting** — 100 requests per 60-second window per IP
- **CORS** — Only configured origins allowed
- **No secrets in source** — All secrets injected via environment variables

## Running Tests

```bash
cd backend/build
ctest --output-on-failure
```

Tests include:
- `test_validation` — email format and string length validation (17 assertions)
- `test_routes` — JSON operations, input sanitization, contact validation, router ops (23 assertions)
- `test_auth` — auth foundation stubs for Sprint 2 (4 assertions)

## Deployment

### Option 1 — Docker Compose (recommended)

```bash
cd backend
docker compose up -d
```

This starts:
- **backend** on port 3000 (internal), with healthcheck
- **nginx** reverse proxy on port 80, with security headers and rate limiting

### Option 2 — Standalone Docker

```bash
cd backend
docker build -t tme-backend .
docker run --rm -p 3000:3000 tme-backend
```

## Dependency

This backend depends on **[modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library)** (MIT license). The dependency is **pinned to commit `90f0de91`** for reproducible builds. CMake downloads and builds it automatically via `FetchContent`.

To upgrade the library:
1. Check [upstream commits](https://github.com/kamrankhan78694/modern-c-web-library/commits/main)
2. Update `GIT_TAG` in `CMakeLists.txt` to the new commit SHA
3. Build and run tests to verify compatibility

Key library features used:

- HTTP server with multi-threaded request handling
- Flexible router with parameter extraction (`:id`)
- Built-in JSON parser / serializer
- Middleware pipeline (CORS, rate limiting, logging)
- Input validation and HTML sanitization
- Health-check and metrics endpoints

## Integration with the Frontend

The static GitHub Pages site (`index.html`, product pages, etc.) can call backend endpoints using the API URL configured in the frontend environment:

- **Development:** `http://localhost:3000/api`
- **Production:** `https://api.themoonexports.com`

See [docs/ENVIRONMENT_CONFIGURATION.md](../docs/ENVIRONMENT_CONFIGURATION.md) for how the frontend selects the correct API base URL.

## Known Trade-offs & Technical Debt

| Item | Status | Mitigation |
|------|--------|------------|
| Product data is hardcoded (3 seed categories) | Sprint 3 | Load from `products.json` then SQLite |
| Contact submissions logged but not stored | Sprint 3 | SQLite persistence |
| No authentication on any endpoints | Sprint 2 | API-key middleware |
| No CSRF protection on POST endpoints | Sprint 2 | Double-submit cookie |
| Rate limiting is per-process | Known | Acceptable for single-instance |

## See Also

- [Backend Implementation Plan](../docs/BACKEND_IMPLEMENTATION.md) — Full architecture, milestones, and roadmap
- [Backend Next Phase Plan](../docs/BACKEND_NEXT_PHASE_PLAN.md) — Sprint-level execution plan for Milestones 3–6
- [modern-c-web-library README](https://github.com/kamrankhan78694/modern-c-web-library#readme) — Library documentation
- [react-refactoring.md](../react-refactoring.md) — Frontend React migration context
