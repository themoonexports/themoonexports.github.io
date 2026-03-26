# Unified Stack Migration Plan

## Laravel + React + Inertia.js + Tailwind CSS + Vite with Python AI Service

> **Version:** 1.0  
> **Created:** February 2026  
> **Status:** Planning  
> **Prerequisite:** Phase 4 Hardening & Operational Maturity (complete or near-complete)

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Current State Analysis](#2-current-state-analysis)
3. [Target Architecture](#3-target-architecture)
4. [Migration Strategy](#4-migration-strategy)
5. [Phase Breakdown](#5-phase-breakdown)
6. [Component Mapping](#6-component-mapping)
7. [Python AI Service](#7-python-ai-service)
8. [Infrastructure & Deployment](#8-infrastructure--deployment)
9. [Data Migration](#9-data-migration)
10. [Risk Assessment](#10-risk-assessment)
11. [Success Criteria](#11-success-criteria)
12. [Timeline & Milestones](#12-timeline--milestones)

---

## 1. Executive Summary

This document outlines the migration path from the current static HTML/CSS + React hydration architecture (served via GitHub Pages) to a **unified full-stack application** built on Laravel, React, Inertia.js, Tailwind CSS, and Vite — with a companion Python AI microservice.

### Why Migrate?

| Current Limitation | Unified Stack Solution |
|---|---|
| Static site with no server-side logic | Laravel provides routing, middleware, auth, and server-side data |
| React hydrates pre-built HTML — no dynamic pages | Inertia.js delivers server-driven React pages without a separate API |
| Bootstrap 3.3.x (EOL) with jQuery dependency | Tailwind CSS — utility-first, no jQuery, smaller bundle |
| 61 inline scripts, no CSP-safe architecture | Vite + Laravel Mix pipeline eliminates inline scripts |
| No backend for product management or order processing | Laravel Eloquent ORM + admin panels for data management |
| Manual multi-language file duplication (EN/DE/FR) | Laravel localization system with shared templates |
| No AI/ML capabilities for product recommendations | Python AI service for search, recommendations, and image analysis |
| Firebase + GitHub Pages hosting (limited server control) | Laravel-compatible hosting (Forge, Vapor, or VPS) with full control |

### Key Principles

1. **Incremental migration** — No big-bang rewrite; migrate page-by-page using the strangler fig pattern
2. **Preserve SEO** — Server-side rendering via Inertia.js keeps pages crawlable throughout migration
3. **Reuse React work** — All 17 existing React components carry forward into the new stack
4. **Zero downtime** — Run old and new stacks in parallel during migration with reverse proxy routing
5. **AI-ready** — Python service is independently deployable and loosely coupled

---

## 2. Current State Analysis

### Architecture (as of February 2026)

```
┌─────────────────────────────────────────────────────┐
│                   GitHub Pages / Firebase            │
│                   (Static File Hosting)              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Static HTML Pages (EN / DE / FR)                   │
│  ├── index.html, products.html, contact.html, ...   │
│  ├── Bootstrap 3.3.x CSS                            │
│  ├── jQuery 3.6.0 / 3.7.1                          │
│  └── 61 inline scripts                              │
│                                                     │
│  React Hydration Layer (17 bundles, ~33.9 KB)       │
│  ├── Vite build → js/dist/                          │
│  ├── Shared runtime (~141.7 KB, cached)             │
│  ├── TypeScript components                          │
│  └── window.TheMoonExports.* bridge                 │
│                                                     │
│  External Services                                  │
│  ├── Zoho (forms, newsletter)                       │
│  ├── Google Analytics                               │
│  └── CDN assets (Font Awesome, jQuery, Bootstrap)   │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Inventory

| Category | Count | Details |
|---|---|---|
| HTML pages (EN) | ~12 | index, about, products, contact, faq, 6 product pages, license, 404 |
| Localized copies | ~24 | DE (~12) + FR (~12), manually maintained |
| React bundles | 17 | Header, footer, carousel, newsletter, consent, etc. |
| Legacy JS files | ~12 | 5 unused (forms, main, application, npm, utils), 7 active |
| CSS files | ~4 | bootstrap.min.css, one.css (custom), plus page-specific |
| Product data | 1 | products.json (~44 KB, flat JSON) |
| Inline scripts | 61 | Executable scripts embedded in HTML |

### Strengths to Preserve

- **SEO infrastructure**: Structured data (JSON-LD), sitemap.xml, robots.txt, hreflang
- **React component library**: 17 TypeScript components with consent gating
- **Multi-language content**: EN, DE, FR translations (content, not just UI strings)
- **Product catalog**: Comprehensive product data in products.json
- **Brand assets**: Images, logos, fonts already organized

---

## 3. Target Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     Reverse Proxy (Nginx)                    │
│                   SSL termination, routing                   │
├──────────────────────┬───────────────────────────────────────┤
│                      │                                       │
│  Laravel Application │   Python AI Service                   │
│  (PHP 8.2+)         │   (FastAPI / Flask)                   │
│  ├── Routes          │   ├── /api/recommendations            │
│  ├── Controllers     │   ├── /api/search                     │
│  ├── Middleware       │   ├── /api/image-analysis             │
│  ├── Eloquent Models │   └── /api/health                     │
│  ├── Blade layouts   │                                       │
│  └── Inertia.js SSR  │   Communicates via internal HTTP      │
│                      │                                       │
├──────────────────────┴───────────────────────────────────────┤
│                                                              │
│  Frontend (Vite + React + Tailwind CSS)                      │
│  ├── Inertia.js React adapter                                │
│  ├── Pages/ (one per route)                                  │
│  ├── Components/ (migrated from react/src/components/)       │
│  ├── Layouts/ (replaces current HTML templates)              │
│  └── Tailwind CSS (replaces Bootstrap 3)                     │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  Data Layer                                                  │
│  ├── MySQL / PostgreSQL (products, orders, users, content)   │
│  ├── Redis (sessions, cache, queues)                         │
│  └── S3-compatible storage (images, media)                   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Backend** | Laravel 11+ (PHP 8.2+) | Routing, controllers, middleware, Eloquent ORM, localization |
| **Frontend Bridge** | Inertia.js 2.x | Server-driven SPA — no REST API needed for page rendering |
| **Frontend** | React 18+ (TypeScript) | Component rendering, state management, interactivity |
| **Styling** | Tailwind CSS 3.x | Utility-first CSS, replacing Bootstrap 3 |
| **Build Tool** | Vite 5+ | Asset bundling (already familiar from current React setup) |
| **AI Service** | Python 3.11+ (FastAPI) | Product recommendations, search, image analysis |
| **Database** | MySQL 8 or PostgreSQL 15 | Product catalog, content, users, orders |
| **Cache/Queue** | Redis | Session storage, cache, background job queues |
| **Search** | Meilisearch or Algolia | Full-text product search (replaces deferred client-side search) |
| **Storage** | S3 / DigitalOcean Spaces | Product images, media uploads |

### Integration with modern-c-web-library

The team maintains [**modern-c-web-library**](https://github.com/kamrankhan78694/modern-c-web-library) — a production-ready pure ISO C web framework (v1.0.0, 129/129 tests passing) with zero external dependencies. It provides a full HTTP server, WebSocket support, routing, middleware chain, JWT/Basic/API Key auth, rate limiting, session management, template engine, JSON parser, LRU cache, gzip compression, database connection pooling, and async I/O via epoll/kqueue.

The migration plan must account for this existing C backend and define how it coexists with the proposed Laravel + Inertia.js stack.

#### Feature Overlap: C Library vs. Laravel

| Capability | modern-c-web-library | Laravel + Inertia.js | Strategy |
|---|---|---|---|
| HTTP server | ✅ Multi-threaded + async I/O (epoll/kqueue) | ✅ PHP-FPM or Octane (Swoole/FrankenPHP) | C handles raw performance; Laravel handles application logic |
| Routing | ✅ Route params (`:id` syntax) | ✅ Named routes, resource controllers, middleware groups | Laravel for web pages; C for API/compute endpoints |
| Middleware | ✅ CORS, rate limit, auth, CSRF, logging, metrics | ✅ Same, plus Inertia SSR, localization, consent | Laravel's middleware is richer for web apps |
| Authentication | ✅ Basic Auth, API Key, JWT (HMAC-SHA256) | ✅ Laravel Sanctum/Passport, session auth, OAuth | Laravel for user-facing auth; C for service-to-service |
| JSON handling | ✅ Built-in parser/serializer | ✅ Native PHP `json_encode`/`json_decode` (C extension) | Both fast; use context-appropriate |
| WebSocket | ✅ RFC 6455 (threaded + async) | ⚠️ Requires Laravel Reverb or Soketi | C library has native advantage for real-time |
| Sessions | ✅ Cookie-based, server-side | ✅ File/Redis/DB drivers, encrypted | Laravel for web sessions; C for stateless API |
| Template engine | ✅ `{{ variable }}` syntax | ✅ Blade + Inertia.js SSR (React) | Laravel + React for full UI; C templates for simple responses |
| Database | ✅ Connection pooling | ✅ Eloquent ORM, migrations, seeders | Laravel for CRUD/admin; C pool for bulk queries |
| Caching | ✅ LRU (in-memory, TTL) | ✅ Redis/Memcached drivers | C for hot-path cache; Redis for distributed cache |
| Rate limiting | ✅ Token bucket (IP-based) | ✅ Redis-backed, configurable | C at the edge; Laravel for application-level |
| Compression | ✅ Pure C gzip (RFC 1952) | ✅ Nginx gzip / PHP zlib | Nginx/C library handles compression before Laravel |
| Static files | ✅ MIME detection, ETag, path traversal prevention | ✅ Nginx or Laravel public/ | Nginx or C library for static assets |
| i18n / Localization | ❌ Not built-in | ✅ Full localization system (lang files, pluralization) | Laravel handles all i18n |
| ORM / Migrations | ❌ Raw SQL only | ✅ Eloquent ORM, schema builder, seeders | Laravel for data modeling |
| Admin panels | ❌ Not applicable | ✅ Filament / Nova | Laravel for content management |
| React SSR | ❌ Not applicable | ✅ Inertia.js server-side rendering | Laravel + Inertia for React pages |

#### Recommended Architecture: C Library as Performance Layer

Rather than choosing one stack over the other, they complement each other. The C library excels at raw throughput, WebSocket, and compute-heavy endpoints; Laravel + Inertia excels at application logic, i18n, admin, and React SSR.

```
                    ┌─────────────────┐
   User Request ──▶ │   Nginx         │
                    │  (reverse proxy) │
                    └────────┬────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
   ┌────────────▼────────────┐  ┌────────▼──────────────────┐
   │  Laravel + Inertia.js   │  │  modern-c-web-library     │
   │  (application layer)    │  │  (performance layer)      │
   │                         │  │                           │
   │  • Web pages (React SSR)│  │  • WebSocket connections  │
   │  • Product catalog UI   │  │  • Real-time data feeds   │
   │  • Contact forms        │  │  • High-throughput API    │
   │  • Admin panel          │  │  • Compute endpoints      │
   │  • i18n (EN/DE/FR)      │  │  • Health/metrics         │
   │  • Auth (user-facing)   │  │  • Auth (service-level)   │
   │  • Consent / GDPR       │  │  • Rate limiting (edge)   │
   │                         │  │                           │
   │  Port 8000              │  │  Port 9000                │
   └────────────┬────────────┘  └────────┬──────────────────┘
                │                         │
                └────────────┬────────────┘
                             │
                    ┌────────▼────────┐
                    │   Data Layer    │
                    │  MySQL / Redis  │
                    └─────────────────┘
```

**Nginx routing rules:**

| Path Pattern | Routed To | Rationale |
|---|---|---|
| `/` , `/products/*`, `/contact`, `/faq`, `/about`, `/legal/*` | Laravel (port 8000) | Web pages — need Inertia SSR, i18n, consent |
| `/{locale}/*` (e.g. `/de/*`, `/fr/*`) | Laravel (port 8000) | Localized pages — Laravel i18n handles this |
| `/ws/*` | C library (port 9000) | WebSocket — C library has native async support |
| `/api/v1/*` | C library (port 9000) | High-throughput JSON API — C's raw speed |
| `/healthz`, `/metrics` | C library (port 9000) | Built-in C library endpoints |
| `/admin/*` | Laravel (port 8000) | Admin panel — Filament/Nova |
| `/api/ai/*` | Python AI service (port 8001) | ML/recommendations — Python ecosystem |

#### Performance Comparison

| Metric | modern-c-web-library | Laravel + Octane | Notes |
|---|---|---|---|
| Raw HTTP throughput | ~50,000–100,000 req/s | ~3,000–8,000 req/s | C is 10–30× faster for raw HTTP |
| WebSocket connections | Thousands (async epoll) | Requires Reverb/Soketi | C library has native advantage |
| Memory per connection | ~KB range | ~MB range (PHP process) | C is significantly leaner |
| Time to first response | < 0.1ms | ~1–5ms (framework boot) | C wins for latency-critical paths |
| Development speed | Slower (manual C) | Fast (Eloquent, Blade, Artisan) | Laravel wins for feature velocity |
| i18n / localization | Manual implementation needed | Built-in, battle-tested | Laravel wins for multi-language |
| React SSR | Not applicable | Native via Inertia.js | Laravel required for React pages |

**Bottom line:** The C library handles performance-critical paths (WebSocket, high-throughput API, real-time feeds) at native speed. Laravel handles everything that benefits from a rich application framework (React SSR, i18n, ORM, admin panels, form validation, consent gating). Nginx routes each request to the right backend.

#### Docker Compose: Both Services

```yaml
# docker-compose.yml
services:
  # Laravel application (web pages, admin, i18n)
  app:
    build: .
    ports: ["8000:8000"]
    depends_on: [mysql, redis, ai-service]
    volumes: [".:/var/www/html"]

  # modern-c-web-library (high-perf API, WebSocket)
  c-backend:
    build:
      context: ./c-backend              # Clone of modern-c-web-library
      dockerfile: Dockerfile
    ports: ["9000:9000"]
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 512M

  # Python AI service
  ai-service:
    build: ./ai-service
    ports: ["8001:8001"]

  # Nginx reverse proxy (routes traffic)
  nginx:
    image: nginx:alpine
    ports: ["80:80", "443:443"]
    volumes: ["./nginx.conf:/etc/nginx/nginx.conf"]
    depends_on: [app, c-backend, ai-service]

  mysql:
    image: mysql:8
    ports: ["3306:3306"]
    environment:
      MYSQL_DATABASE: themoonexports

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
```

#### Laravel → C Library Communication

When Laravel needs C-level performance for a specific operation, it can call the C backend internally:

```php
// app/Services/CBackendService.php
class CBackendService
{
    public function __construct(
        private HttpClient $http,
        private string $baseUrl = 'http://c-backend:9000',
    ) {}

    /**
     * Call the C backend for high-throughput operations.
     * Laravel handles auth/i18n/rendering; C handles computation.
     */
    public function apiCall(string $endpoint, array $data = []): array
    {
        return $this->http
            ->timeout(5)
            ->post("{$this->baseUrl}/api/v1/{$endpoint}", $data)
            ->json();
    }

    public function healthCheck(): array
    {
        return $this->http->get("{$this->baseUrl}/healthz")->json();
    }
}
```

### Directory Structure (Target)

```
themoonexports/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── PageController.php         # Home, about, contact, FAQ
│   │   │   ├── ProductController.php      # Product catalog & detail
│   │   │   ├── NewsletterController.php   # Zoho integration
│   │   │   └── LocaleController.php       # Language switching
│   │   ├── Middleware/
│   │   │   ├── SetLocale.php              # i18n middleware
│   │   │   └── ConsentMiddleware.php      # GDPR consent tracking
│   │   └── Requests/
│   │       ├── ContactRequest.php         # Form validation
│   │       └── NewsletterRequest.php
│   ├── Models/
│   │   ├── Product.php
│   │   ├── Category.php
│   │   ├── Testimonial.php
│   │   └── FaqItem.php
│   └── Services/
│       ├── AiService.php                  # Python AI HTTP client
│       └── ZohoService.php                # Zoho CRM integration
├── resources/
│   ├── js/
│   │   ├── app.tsx                        # Inertia.js entry point
│   │   ├── Pages/
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Products/
│   │   │   │   ├── Index.tsx
│   │   │   │   └── Show.tsx
│   │   │   ├── Contact.tsx
│   │   │   ├── Faq.tsx
│   │   │   └── Legal/
│   │   │       ├── Privacy.tsx
│   │   │       └── Terms.tsx
│   │   ├── Components/                    # Migrated from react/src/components/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Carousel.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   ├── NewsletterForm.tsx
│   │   │   ├── ConsentBanner.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── FaqAccordion.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   ├── ScrollToTop.tsx
│   │   │   ├── AccessibilityWidget.tsx
│   │   │   └── CookieSettings.tsx
│   │   ├── Layouts/
│   │   │   └── AppLayout.tsx              # Replaces repeated HTML boilerplate
│   │   └── hooks/
│   │       ├── useConsent.ts              # Migrated from react/src/hooks/
│   │       └── useTracking.ts
│   ├── css/
│   │   └── app.css                        # Tailwind directives + custom styles
│   └── views/
│       └── app.blade.php                  # Inertia root template
├── routes/
│   └── web.php                            # All page routes
├── database/
│   ├── migrations/
│   │   ├── create_products_table.php
│   │   ├── create_categories_table.php
│   │   ├── create_testimonials_table.php
│   │   └── create_faq_items_table.php
│   └── seeders/
│       ├── ProductSeeder.php              # Import from products.json
│       └── ContentSeeder.php              # Import from static HTML
├── lang/
│   ├── en/
│   ├── de/
│   └── fr/
├── ai-service/                            # Python AI microservice
│   ├── main.py                            # FastAPI entry point
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── models/
│   │   ├── recommender.py
│   │   └── search.py
│   └── tests/
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── docker-compose.yml                     # Local dev environment
```

---

## 4. Migration Strategy

### Approach: Strangler Fig Pattern

Migrate one page/feature at a time while keeping the existing static site operational. A reverse proxy routes traffic to either the old static site or the new Laravel application based on the URL path.

```
                    ┌─────────────┐
   User Request ──▶ │   Nginx     │
                    │  (Proxy)    │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │                         │
     ┌────────▼────────┐    ┌──────────▼──────────┐
     │  Laravel App     │    │  Static Site         │
     │  (new pages)     │    │  (legacy pages)      │
     │  /products/*     │    │  /about              │
     │  /contact        │    │  /horn-crafts        │
     │  /faq            │    │  (remaining pages)   │
     └─────────────────┘    └─────────────────────┘
```

### Migration Order (Risk-Optimized)

1. **Low-traffic pages first** — FAQ, legal pages (low risk, validates the stack)
2. **Form-heavy pages** — Contact (demonstrates server-side form handling)
3. **Product catalog** — Products index + detail (core business value, database integration)
4. **Homepage** — index.html (highest traffic, migrated last with A/B testing)
5. **Localized pages** — DE/FR versions leverage Laravel i18n (eliminates file duplication)

---

## 5. Phase Breakdown

### Phase A: Foundation (Weeks 1–4)

**Goal:** Set up the Laravel + Inertia.js + React + Tailwind + Vite project and deploy a "hello world" page alongside the existing static site.

#### Tasks

- [ ] **A1.** Initialize Laravel 11 project with Inertia.js React adapter
- [ ] **A2.** Configure Vite for React + TypeScript + Tailwind CSS
- [ ] **A3.** Set up Inertia.js SSR for SEO-safe rendering
- [ ] **A4.** Create `AppLayout.tsx` with Tailwind equivalents of current Bootstrap structure
- [ ] **A5.** Set up local development environment (Docker Compose: PHP, MySQL, Redis, Nginx)
- [ ] **A6.** Configure reverse proxy to route `/new/*` to Laravel, everything else to static site
- [ ] **A7.** Set up CI/CD pipeline (GitHub Actions: lint, test, build, deploy)
- [ ] **A8.** Deploy Laravel app to staging environment (Laravel Forge, Vapor, or VPS)
- [ ] **A9.** Implement locale middleware and language switching (`/{locale}/...` routes)
- [ ] **A10.** Port `useConsent` hook and consent gating logic to new stack

#### Deliverables

- Running Laravel + Inertia + React + Tailwind application
- Docker-based local development environment
- CI/CD pipeline (GitHub Actions)
- Staging deployment with reverse proxy

### Phase B: First Pages (Weeks 5–8)

**Goal:** Migrate FAQ, legal pages, and the contact page to validate the full stack end-to-end including form handling and i18n.

#### Tasks

- [ ] **B1.** Create database schema: `faq_items`, migrate FAQ content from `faq.html`
- [ ] **B2.** Build `Faq.tsx` page using migrated `FaqAccordion` component + Tailwind styling
- [ ] **B3.** Migrate legal pages (privacy, terms, imprint) as simple Inertia pages
- [ ] **B4.** Build `Contact.tsx` page with server-side validation (`ContactRequest`)
- [ ] **B5.** Integrate Zoho form submission via `ZohoService` (replaces client-side Zoho posts)
- [ ] **B6.** Implement `NewsletterController` with server-side Zoho integration
- [ ] **B7.** Port all 3 language versions (EN/DE/FR) using Laravel `lang/` files
- [ ] **B8.** Migrate structured data (JSON-LD) to Blade/React head management
- [ ] **B9.** Validate SEO: meta tags, Open Graph, canonical URLs, hreflang via Laravel
- [ ] **B10.** Switch proxy routing: `/faq`, `/contact`, `/legal/*` → Laravel

#### Deliverables

- FAQ page with database-driven content and i18n
- Contact page with server-side form validation and Zoho integration
- Legal pages with proper SEO metadata
- All pages available in EN, DE, FR via `/{locale}/...` routes

### Phase C: Product Catalog (Weeks 9–14)

**Goal:** Migrate the product catalog to a database-driven system with search and AI-powered recommendations.

#### Tasks

- [ ] **C1.** Design database schema: `products`, `categories`, product images
- [ ] **C2.** Build data migration script: `products.json` → MySQL/PostgreSQL
- [ ] **C3.** Create `ProductController` with index/show/search actions
- [ ] **C4.** Build `Products/Index.tsx` with category filtering and grid view
- [ ] **C5.** Build `Products/Show.tsx` with image gallery, details, and related products
- [ ] **C6.** Migrate `ProductGrid`, `ProductModal`, `Carousel` components to Tailwind
- [ ] **C7.** Integrate Meilisearch for full-text product search
- [ ] **C8.** Set up Python AI service (Phase 7) for product recommendations
- [ ] **C9.** Connect `AiService.php` to Python microservice for "similar products"
- [ ] **C10.** Migrate product images to S3-compatible storage with CDN
- [ ] **C11.** Implement product-specific structured data (JSON-LD) server-side
- [ ] **C12.** Switch proxy routing: `/products/*`, individual product pages → Laravel

#### Deliverables

- Database-driven product catalog with admin management
- Full-text search via Meilisearch
- AI-powered related product suggestions
- Image CDN with optimized delivery

### Phase D: Homepage & Remaining Pages (Weeks 15–18)

**Goal:** Migrate the homepage and remaining pages (about, 404). Decommission the static site.

#### Tasks

- [ ] **D1.** Build `Home.tsx` page with all homepage sections (hero, products, testimonials, trust badges)
- [ ] **D2.** Migrate `About.tsx` page
- [ ] **D3.** Create `404.tsx` error page with Inertia error handling
- [ ] **D4.** Migrate remaining components: `TrustBadges`, `Testimonials`, `SocialLinks` to Tailwind
- [ ] **D5.** Implement `Header` and `Footer` in `AppLayout.tsx` using migrated components
- [ ] **D6.** A/B test homepage (static vs. Laravel) for performance and conversion
- [ ] **D7.** Migrate sitemap.xml to dynamic generation (`spatie/laravel-sitemap`)
- [ ] **D8.** Migrate robots.txt to Laravel route
- [ ] **D9.** Update DNS: point domain fully to Laravel application
- [ ] **D10.** Decommission static site hosting (GitHub Pages / Firebase)
- [ ] **D11.** Set up redirects for any changed URLs (301 redirects in Laravel)
- [ ] **D12.** Final SEO validation: crawl site, check indexing, verify structured data

#### Deliverables

- Fully migrated application (all pages on Laravel + Inertia)
- Dynamic sitemap and robots.txt
- Static site decommissioned
- Zero broken links or SEO regressions

### Phase E: Optimization & Enhancement (Weeks 19–22)

**Goal:** Optimize the unified stack and implement features only possible with a full backend.

#### Tasks

- [ ] **E1.** Implement admin panel (Laravel Nova, Filament, or custom) for product/content management
- [ ] **E2.** Add user authentication for wholesale/trade customers
- [ ] **E3.** Implement quote request system (replaces simple contact form for B2B)
- [ ] **E4.** Add order tracking integration
- [ ] **E5.** Set up Laravel Horizon for queue monitoring
- [ ] **E6.** Implement full CSP headers (no `unsafe-inline` — all scripts via Vite)
- [ ] **E7.** Add rate limiting, CSRF protection, and security middleware
- [ ] **E8.** Performance optimization: HTTP/2 push, edge caching, image optimization
- [ ] **E9.** Set up monitoring: error tracking (Sentry), uptime monitoring, log aggregation
- [ ] **E10.** Expand AI service: image-based product search, automated product descriptions

#### Deliverables

- Admin panel for content/product management
- Enhanced security posture (CSP, rate limiting, monitoring)
- B2B features (authentication, quote system)
- Comprehensive observability stack

---

## 6. Component Mapping

### React Components: Current → Target

All 17 existing React components carry forward. The primary changes are:

1. **Remove hydration logic** — Components no longer hydrate static HTML; Inertia renders them directly
2. **Replace Bootstrap classes** — Swap Bootstrap 3 class names for Tailwind utilities
3. **Remove `window.TheMoonExports.*` bridge** — No longer needed; React is the primary rendering layer
4. **Props from server** — Data comes from Laravel controllers via Inertia props, not inline scripts or JSON

| Current Component | Bundle | Target Location | Key Changes |
|---|---|---|---|
| Header | header.js (3.3KB) | `Components/Header.tsx` | Tailwind nav, Inertia `<Link>`, i18n via props |
| Footer | footer.js (2.66KB) | `Components/Footer.tsx` | Tailwind layout, dynamic year built-in |
| Carousel | carousel.js (2.40KB) | `Components/Carousel.tsx` | Tailwind + headless UI, images from CDN |
| ProductGrid | product-grid.js (1.25KB) | `Components/ProductGrid.tsx` | Server-provided products, Tailwind grid |
| ProductModal | product-modal.js (4.49KB) | `Components/ProductModal.tsx` | Headless UI dialog, server-side product data |
| NewsletterForm | newsletter.js (2.2KB) | `Components/NewsletterForm.tsx` | Inertia form submission → server-side Zoho |
| ConsentBanner | consent.js (6.6KB) | `Components/ConsentBanner.tsx` | Simplified — CSP eliminates inline script concerns |
| TrustBadges | trust-badges.js (1.84KB) | `Components/TrustBadges.tsx` | Tailwind styling |
| LanguageSwitcher | language-switcher.js (0.99KB) | `Components/LanguageSwitcher.tsx` | Inertia `<Link>` for locale switching |
| SocialLinks | social-links.js (1.70KB) | `Components/SocialLinks.tsx` | Tailwind, consent-aware |
| ContactForm | contact-form.js (1.52KB) | `Components/ContactForm.tsx` | Inertia form → server validation |
| FaqAccordion | faq.js (1.15KB) | `Components/FaqAccordion.tsx` | Headless UI disclosure, server-provided data |
| Background | background.js (1.93KB) | `Components/Background.tsx` | Tailwind background utilities |
| CookieSettings | cookie-settings.js (2.71KB) | `Components/CookieSettings.tsx` | Headless UI dialog |
| Testimonials | testimonials.js (1.86KB) | `Components/Testimonials.tsx` | Server-provided testimonials, Tailwind |
| AccessibilityWidget | accessibility.js (2.39KB) | `Components/AccessibilityWidget.tsx` | Headless UI popover |
| ScrollToTop | scroll-top.js (0.85KB) | `Components/ScrollToTop.tsx` | Minimal changes |

### CSS Migration: Bootstrap 3 → Tailwind

| Bootstrap 3 Pattern | Tailwind Equivalent |
|---|---|
| `container` | `container mx-auto px-4` |
| `row` / `col-md-*` | `grid grid-cols-12` / `col-span-*` or `flex` |
| `btn btn-primary` | `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700` |
| `navbar navbar-default` | `flex items-center justify-between p-4` |
| `form-control` | `w-full border rounded px-3 py-2 focus:ring-2` |
| `panel panel-default` | `bg-white rounded-lg shadow p-6` |
| `carousel` | Custom component or headless UI (Swiper/Embla) |
| `modal` | Headless UI `Dialog` |

### JavaScript Migration: Legacy → Unified

| Current JS | Replacement |
|---|---|
| `js/navigation.js` (dropdown manager) | Headless UI `Menu` component in Header.tsx |
| `js/forms.js` (FormHandler + Zoho) | Inertia `useForm` + `ZohoService.php` |
| `js/consent.js` (cookie banner) | `ConsentBanner.tsx` + `ConsentMiddleware.php` |
| jQuery 3.x | Removed entirely — React handles all DOM |
| Bootstrap 3 JS | Headless UI components (Menu, Dialog, Disclosure) |
| 61 inline scripts | Eliminated — all logic in React components or Laravel controllers |

---

## 7. Python AI Service

### Architecture

The Python AI service runs as an independent microservice, communicating with Laravel over internal HTTP.

```
┌───────────────┐     HTTP (internal)     ┌──────────────────┐
│  Laravel App  │ ◄───────────────────── │  Python AI       │
│               │ ────────────────────▶  │  Service         │
│  AiService.php│                         │  (FastAPI)       │
└───────────────┘                         └──────────────────┘
                                                  │
                                          ┌───────┴────────┐
                                          │  ML Models     │
                                          │  ├── Product   │
                                          │  │   Recommender│
                                          │  ├── Search    │
                                          │  │   Ranker    │
                                          │  └── Image     │
                                          │      Analyzer  │
                                          └────────────────┘
```

### Endpoints

| Endpoint | Method | Purpose | Input | Output |
|---|---|---|---|---|
| `/api/recommendations` | POST | Product recommendations | `{ product_id, limit }` | `{ products: [...] }` |
| `/api/search` | POST | Semantic product search | `{ query, filters, limit }` | `{ results: [...], scores }` |
| `/api/image-analysis` | POST | Product image tagging | `{ image_url }` | `{ tags: [...], category }` |
| `/api/descriptions` | POST | Auto-generate product descriptions | `{ product_data }` | `{ description, seo_title }` |
| `/api/health` | GET | Health check | — | `{ status, version, models }` |

### Technology Choices

| Component | Technology | Rationale |
|---|---|---|
| **Framework** | FastAPI | Async, auto-docs (OpenAPI), type hints, fast |
| **ML/Recommendations** | scikit-learn, sentence-transformers | Lightweight, no GPU required for product similarity |
| **Search Enhancement** | sentence-transformers | Semantic search vectors for Meilisearch re-ranking |
| **Image Analysis** | CLIP (OpenAI) or ResNet | Product categorization from images |
| **Containerization** | Docker | Consistent deployment, version-pinned dependencies |
| **Model Storage** | Local filesystem or S3 | Pre-trained models loaded at startup |

### Data Flow: Product Recommendations

```
1. User views product page → Laravel ProductController::show()
2. Controller calls AiService::getRecommendations(productId)
3. AiService sends HTTP POST to Python: /api/recommendations
4. Python service loads product embeddings, computes similarity
5. Returns ranked product IDs + scores
6. Laravel hydrates product models, passes to Inertia page
7. React renders "Similar Products" section with AI-ranked results
```

### Laravel Integration (`app/Services/AiService.php`)

```php
class AiService
{
    public function __construct(
        private HttpClient $http,
        private string $baseUrl,
    ) {}

    public function getRecommendations(int $productId, int $limit = 6): array
    {
        $response = $this->http->post("{$this->baseUrl}/api/recommendations", [
            'product_id' => $productId,
            'limit' => $limit,
        ]);

        return $response->json('products', []);
    }

    public function search(string $query, array $filters = []): array
    {
        $response = $this->http->post("{$this->baseUrl}/api/search", [
            'query' => $query,
            'filters' => $filters,
        ]);

        return $response->json('results', []);
    }
}
```

### Deployment

- **Development:** Docker Compose with `ai-service` container alongside Laravel
- **Production:** Separate container or serverless function (AWS Lambda with container image)
- **Scaling:** Independent from Laravel; scale horizontally behind a load balancer
- **Monitoring:** Prometheus metrics endpoint, health checks, request logging

---

## 8. Infrastructure & Deployment

### Development Environment

```yaml
# docker-compose.yml
services:
  app:
    build: .
    ports: ["8000:8000"]
    depends_on: [mysql, redis, meilisearch, ai-service]
    volumes: [".:/var/www/html"]

  mysql:
    image: mysql:8
    ports: ["3306:3306"]
    environment:
      MYSQL_DATABASE: themoonexports

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]

  meilisearch:
    image: getmeili/meilisearch:v1
    ports: ["7700:7700"]

  ai-service:
    build: ./ai-service
    ports: ["8001:8001"]

  nginx:
    image: nginx:alpine
    ports: ["80:80"]
    # Routes /new/* to app, everything else to static
```

### Production Deployment Options

| Option | Pros | Cons | Cost Estimate |
|---|---|---|---|
| **Laravel Forge + DigitalOcean** | Simple, Laravel-optimized, SSH access | Manual scaling | ~$20–50/mo |
| **Laravel Vapor (AWS)** | Serverless, auto-scaling, zero-ops | AWS lock-in, cold starts | ~$40–100/mo |
| **VPS (Hetzner/Vultr)** | Full control, cheapest | More DevOps work | ~$10–30/mo |
| **Railway / Render** | Easy deployment, good DX | Less control | ~$25–60/mo |

**Recommendation:** Start with **Laravel Forge + DigitalOcean** for the best balance of simplicity, control, and cost. Migrate to Vapor if scaling demands increase.

### CI/CD Pipeline (GitHub Actions)

```
Push to main
    │
    ├── Lint (ESLint + PHP CS Fixer + Tailwind)
    ├── Test (PHPUnit + Vitest)
    ├── Build (Vite production build)
    ├── Docker Build (AI service)
    │
    └── Deploy
        ├── Laravel → Forge/Vapor
        └── AI Service → Container registry → deployment
```

---

## 9. Data Migration

### Products (`products.json` → Database)

```php
// database/seeders/ProductSeeder.php
// Reads products.json and inserts into products + categories tables

// Schema:
// products: id, name, slug, description, category_id, price, image_path,
//           material, dimensions, weight, sku, meta_title, meta_description,
//           created_at, updated_at

// categories: id, name, slug, description, parent_id, image_path
```

### Content (HTML → Database + Lang Files)

| Content Type | Source | Target |
|---|---|---|
| Product data | `products.json` | `products` table via seeder |
| FAQ items | `faq.html` (inline) | `faq_items` table |
| Testimonials | `index.html` (inline) | `testimonials` table |
| Page content (about, etc.) | `about.html` | `lang/{locale}/pages.php` or CMS |
| Legal pages | `legal/*.html` | `lang/{locale}/legal.php` |
| SEO metadata | `<meta>` tags in HTML | Laravel SEO package or database |
| Structured data | JSON-LD in HTML | Generated server-side in controllers |

### Multi-Language Content

```
# Current: 3 copies of each HTML file
index.html          # English
de/index.html       # German (manually maintained)
fr/index.html       # French (manually maintained)

# Target: Single template + language files
lang/en/pages.php   # ['home.hero_title' => 'Premium Handicrafts', ...]
lang/de/pages.php   # ['home.hero_title' => 'Premium Kunsthandwerk', ...]
lang/fr/pages.php   # ['home.hero_title' => 'Artisanat Premium', ...]

# Route: /{locale}/products → same controller, different lang
```

### Image Migration

1. Inventory all images in `images/` directory
2. Optimize and convert to WebP format
3. Upload to S3-compatible storage with organized paths
4. Update database records with CDN URLs
5. Set up Laravel image processing (Intervention Image) for on-the-fly resizing

---

## 10. Risk Assessment

### High Risk

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| **SEO ranking drop during migration** | High | Medium | Implement 301 redirects for all URLs; keep meta tags, structured data, and sitemap identical; monitor Search Console daily during cutover |
| **Extended downtime during DNS cutover** | High | Low | Use reverse proxy approach — no DNS change until all pages migrated; blue-green deployment |
| **Data loss during product migration** | High | Low | Automated migration script with dry-run mode; validate row counts and data integrity before cutover |

### Medium Risk

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| **Performance regression** | Medium | Medium | Benchmark current Lighthouse scores; enforce same or better via CI; use Inertia SSR for fast initial load |
| **Team PHP/Laravel learning curve** | Medium | Medium | Laravel has extensive documentation; Inertia simplifies the React integration pattern already familiar |
| **AI service reliability** | Medium | Medium | Graceful degradation — if AI service is down, show random/manual recommendations; circuit breaker pattern |
| **Hosting cost increase** | Medium | High | Current hosting is free (GitHub Pages); budget $20–50/mo for VPS + DB; offset with improved conversion |

### Low Risk

| Risk | Impact | Probability | Mitigation |
|---|---|---|---|
| **Tailwind CSS migration complexity** | Low | Medium | Migrate component-by-component; use `@apply` for complex patterns initially; no visual regressions |
| **Third-party service changes (Zoho)** | Low | Low | Server-side integration is easier to update than client-side; abstract via `ZohoService` |

---

## 11. Success Criteria

### Technical Metrics

| Metric | Current | Target | Measurement |
|---|---|---|---|
| Lighthouse Performance | ~85 | ≥ 90 | Lighthouse CI in GitHub Actions |
| Lighthouse SEO | ~90 | ≥ 95 | Lighthouse CI |
| Time to First Byte (TTFB) | N/A (static) | ≤ 200ms | WebPageTest |
| First Contentful Paint (FCP) | ~1.5s | ≤ 1.2s | Core Web Vitals |
| Cumulative Layout Shift (CLS) | ~0.05 | ≤ 0.05 | Core Web Vitals |
| Bundle size (JS) | ~175 KB total | ≤ 200 KB | Vite bundle analysis |
| Security headers | Partial | A+ (SecurityHeaders.com) | Automated check |
| Search Console indexed pages | ~12 | ≥ 12 (no loss) | Google Search Console |

### Business Metrics

| Metric | Target | Measurement |
|---|---|---|
| Zero SEO ranking loss | No drop in top 10 keywords | Search Console position tracking |
| Contact form submissions | ≥ current rate | Zoho analytics + Laravel logs |
| Page load time (user-perceived) | No regression | Real User Monitoring |
| Admin content update time | < 5 minutes per change | Manual timing |

### Operational Metrics

| Metric | Target | Measurement |
|---|---|---|
| Deployment frequency | ≥ 1/week | GitHub Actions deploy count |
| Mean time to recovery | < 1 hour | Incident log |
| Test coverage | ≥ 80% (PHP + JS) | PHPUnit + Vitest coverage reports |
| Uptime | ≥ 99.9% | Uptime monitoring service |

---

## 12. Timeline & Milestones

### Overview (22 Weeks)

```
Phase A: Foundation                    [Weeks 1–4]   ████░░░░░░░░░░░░░░░░░░
Phase B: First Pages (FAQ, Contact)    [Weeks 5–8]   ░░░░████░░░░░░░░░░░░░░
Phase C: Product Catalog + AI Service  [Weeks 9–14]  ░░░░░░░░██████░░░░░░░░
Phase D: Homepage & Full Cutover       [Weeks 15–18] ░░░░░░░░░░░░░░████░░░░
Phase E: Optimization & Enhancement    [Weeks 19–22] ░░░░░░░░░░░░░░░░░░████
```

### Key Milestones

| Week | Milestone | Gate Criteria |
|---|---|---|
| 4 | **Foundation complete** | Laravel + Inertia running, CI/CD deployed, staging environment live |
| 8 | **First pages live** | FAQ + Contact + Legal pages on Laravel, EN/DE/FR, SEO validated |
| 14 | **Product catalog live** | All products in database, search working, AI recommendations active |
| 18 | **Full migration complete** | All pages on Laravel, static site decommissioned, 301 redirects active |
| 22 | **Optimization complete** | Admin panel live, monitoring active, performance targets met |

### Prerequisites (from Phase 4)

Before starting this migration, the following Phase 4 items should be complete or near-complete:

- [ ] Legacy JS files retired (≤ 6 files)
- [ ] CI/CD pipeline established (reuse for Laravel)
- [ ] i18n audit complete (know exact translation scope)
- [ ] Inline scripts documented (know what to migrate)
- [ ] Performance baseline established (Lighthouse scores to maintain)

---

## Appendix A: Quick-Start Commands

```bash
# Initialize Laravel project
composer create-project laravel/laravel themoonexports
cd themoonexports

# Install Inertia.js (server-side)
composer require inertiajs/inertia-laravel

# Install frontend dependencies
npm install @inertiajs/react react react-dom
npm install -D @vitejs/plugin-react tailwindcss postcss autoprefixer typescript

# Initialize Tailwind
npx tailwindcss init -p

# Set up AI service
cd ai-service
python -m venv venv
source venv/bin/activate
pip install fastapi uvicorn scikit-learn sentence-transformers

# Start development environment
docker-compose up -d
```

## Appendix B: Route Mapping

| Current URL | New Laravel Route | Controller |
|---|---|---|
| `/index.html` | `/` | `PageController@home` |
| `/about.html` | `/about` | `PageController@about` |
| `/products.html` | `/products` | `ProductController@index` |
| `/horn-crafts.html` | `/products/horn-crafts` | `ProductController@category` |
| `/wooden-crafts.html` | `/products/wooden-crafts` | `ProductController@category` |
| `/resin.html` | `/products/resin` | `ProductController@category` |
| `/buffalo-horn-plates.html` | `/products/buffalo-horn-plates` | `ProductController@category` |
| `/buffalo-horn-bowls.html` | `/products/buffalo-horn-bowls` | `ProductController@category` |
| `/horn-decor.html` | `/products/horn-decor` | `ProductController@category` |
| `/contact.html` | `/contact` | `PageController@contact` |
| `/faq.html` | `/faq` | `PageController@faq` |
| `/legal/privacy.html` | `/legal/privacy` | `PageController@privacy` |
| `/legal/terms.html` | `/legal/terms` | `PageController@terms` |
| `/legal/imprint.html` | `/legal/imprint` | `PageController@imprint` |
| `/de/index.html` | `/de` | `PageController@home` (locale: de) |
| `/fr/index.html` | `/fr` | `PageController@home` (locale: fr) |
| `/de/*.html` | `/de/*` | Same controllers (locale: de) |
| `/fr/*.html` | `/fr/*` | Same controllers (locale: fr) |

## Appendix C: Related Documentation

- [react-refactoring.md](../react-refactoring.md) — React migration history (Phases 1–5)
- [docs/PHASE_4_IMPLEMENTATION.md](PHASE_4_IMPLEMENTATION.md) — Current hardening phase
- [docs/NEXT_PHASE_DEVELOPMENT_PLAN.md](NEXT_PHASE_DEVELOPMENT_PLAN.md) — Phase 4 execution plan
- [docs/PRODUCTION_READINESS_SUMMARY.md](PRODUCTION_READINESS_SUMMARY.md) — Current production status
- [docs/TESTING_PLAN.md](TESTING_PLAN.md) — QA procedures (to be extended for Laravel)
