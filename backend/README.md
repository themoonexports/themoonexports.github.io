# The Moon Exports — Backend API

A lightweight C backend for The Moon Exports, built on top of [modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library) (tracks latest `main`).

## Prerequisites

- **GCC** (or any C99 compiler)
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

| Method | Path                  | Description                |
|--------|-----------------------|----------------------------|
| GET    | `/`                   | Welcome message            |
| GET    | `/healthz`            | Health check (JSON)        |
| GET    | `/api/products`       | List product categories    |
| GET    | `/api/products/:id`   | Single product by ID       |
| POST   | `/api/contact`        | Contact form submission    |

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
├── CMakeLists.txt          # Build config; fetches modern-c-web-library via FetchContent
├── Dockerfile              # Multi-stage production build (non-root user)
├── docker-compose.yml      # Backend + nginx reverse proxy
├── nginx.conf              # Reverse proxy with security headers
├── include/
│   └── config.h            # Port, CORS, rate-limit, version defaults
├── src/
│   ├── main.c              # Server entry point (middleware, signal handling)
│   └── routes/
│       ├── products.c / .h # /api/products endpoints
│       └── contact.c  / .h # /api/contact endpoint (validated, sanitized)
├── tests/
│   ├── CMakeLists.txt      # CTest integration
│   └── test_validation.c   # Input validation unit tests
└── README.md               # ← you are here
```

## Configuration

Defaults are defined in `include/config.h`:

| Constant               | Default                              | Purpose               |
|------------------------|--------------------------------------|-----------------------|
| `TME_VERSION`          | `"1.0.0"`                            | API version string    |
| `TME_DEFAULT_PORT`     | `3000`                               | Listen port           |
| `TME_LOG_LEVEL`        | `LOG_LEVEL_INFO`                     | Minimum log level     |
| `TME_CORS_ORIGIN`      | `https://www.themoonexports.com`     | Production CORS       |
| `TME_CORS_ORIGIN_DEV`  | `http://localhost:5000`              | Dev CORS              |
| `TME_RATE_LIMIT_MAX`   | `100`                                | Requests per window   |
| `TME_RATE_LIMIT_WINDOW`| `60`                                 | Window in seconds     |

Override the port at runtime by passing it as a CLI argument (`./tme_backend 8080`).

## Middleware Pipeline

The server applies these middleware in order on every request:

1. **CORS** — Allows configured origins (`themoonexports.com` + `localhost:5000`)
2. **Rate Limiting** — Token-bucket: 100 req/60s, burst 200
3. **Logging** — Structured request logging to stdout

## Running Tests

```bash
cd backend/build
ctest --output-on-failure
```

Tests include:
- Library tests (WebLib, AsyncWebSocket, Stress) — upstream tests
- `test_validation` — email format and string length validation

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

This backend depends on **[modern-c-web-library](https://github.com/kamrankhan78694/modern-c-web-library)** (MIT license, tracks `main` branch). CMake downloads and builds it automatically via `FetchContent`.

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

## See Also

- [Backend Implementation Plan](../docs/BACKEND_IMPLEMENTATION.md) — Full architecture, milestones, and roadmap
- [modern-c-web-library README](https://github.com/kamrankhan78694/modern-c-web-library#readme) — Library documentation
- [react-refactoring.md](../react-refactoring.md) — Frontend React migration context
