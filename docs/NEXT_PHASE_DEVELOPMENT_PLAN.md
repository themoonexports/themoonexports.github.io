# Next Phase Development Plan
## The Moon Exports — Phase 4 Execution & Phase 5 Vision

**Created:** February 2026  
**Status:** 📋 Active Planning Document  
**Owner:** Development Team  
**Review Cadence:** Biweekly sprint reviews

**Related Documents:**
- [Phase 4 Implementation](PHASE_4_IMPLEMENTATION.md) — Workstream-level checklists
- [../react-refactoring.md](../react-refactoring.md) — Overall React migration roadmap
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) — Current production status
- [Security Checklist](SECURITY_CHECKLIST.md) — Security remediation tracking
- [Testing Plan](TESTING_PLAN.md) — QA procedures and test matrix

---

## Table of Contents

1. [Current State Assessment](#1-current-state-assessment)
2. [Phase 4 Sprint Execution Plan](#2-phase-4-sprint-execution-plan)
3. [Phase 5 Vision & Roadmap](#3-phase-5-vision--roadmap)
4. [Technical Debt Register](#4-technical-debt-register)
5. [Risk Register & Mitigation](#5-risk-register--mitigation)
6. [Architecture Decision Records](#6-architecture-decision-records)
7. [Metrics & KPIs Dashboard](#7-metrics--kpis-dashboard)
8. [Dependency Map](#8-dependency-map)
9. [Release & Rollout Strategy](#9-release--rollout-strategy)

---

## 1. Current State Assessment

### What We Have (February 2026)

| Area | Status | Details |
|------|--------|---------|
| **React Migration** | ✅ Complete (Phases 1–3) | 17 bundles, ~33.9 KB total (15.1 KB gzipped) |
| **Shared Runtime** | ✅ Cached | ~141.7 KB React runtime (cached across bundles) |
| **Legacy JS** | ⚠️ 12 files remaining | 7 custom + 5 vendor files in `js/` |
| **CI/CD Pipeline** | ⚠️ Partial | Lint + Build + Bundle check + npm audit; missing Lighthouse CI, HTML validation |
| **Security Score** | ⚠️ 72% | 0 critical, 2 high-priority remaining (HTTP links, inline scripts) |
| **i18n Coverage** | ⚠️ Partial | `/de/` and `/fr/` index pages updated; subpages missing |
| **Performance** | ⚠️ Not measured | No Lighthouse CI baseline; images not optimized |
| **Monitoring** | ❌ None | No error tracking, no RUM, no uptime monitoring |
| **Testing** | ⚠️ Manual only | No automated functional/integration tests |
| **Bootstrap** | ⚠️ v3.x | Migration to v5.3.x deferred |

### Strengths to Build On
- **Solid progressive enhancement architecture** — React hydrates existing HTML; site works without JS
- **Modular bundle strategy** — 17 independent bundles under 7 KB each
- **Established CI pipeline** — lint, build, bundle budget, security audit already automated
- **Comprehensive documentation** — 25+ docs covering architecture, phases, security, testing
- **TypeScript-first React** — Type-safe components with strict mode enabled

### Key Gaps to Address
1. **No automated regression testing** — All QA is manual
2. **No performance baseline** — Cannot detect regressions without Lighthouse CI
3. **Legacy JS dual-maintenance** — Same behavior implemented in vanilla JS and React
4. **No production observability** — Errors in production go undetected
5. **Security hardening incomplete** — CSP uses `unsafe-inline`, 25 inline scripts remain
6. **i18n incomplete** — `/de/` and `/fr/` lack subpages (contact, faq, product pages)

---

## 2. Phase 4 Sprint Execution Plan

### Sprint 1: Foundation & Quick Wins (Weeks 1–2)

**Theme:** Establish baselines, close quick gaps, reduce maintenance burden

#### 1.1 Legacy JS Audit & Cleanup
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Remove `js/auto-year-update.js` references from remaining pages | High | No `<script>` tags reference this file; Footer.tsx handles all year updates | 2h |
| Audit `js/forms.js` — identify dead code paths | High | Document which functions are still called vs. covered by React | 2h |
| Remove form handlers in `js/forms.js` covered by `ContactForm.tsx` / `NewsletterForm.tsx` | High | No duplicate validation logic; React components are sole handlers on pages that use them | 3h |
| Audit `js/components.js` for unused exports | Medium | List of used vs. unused exports documented | 1h |
| Audit `js/application.js` and `js/npm.js` for necessity | Medium | Decision: keep, refactor, or remove each file | 1h |
| Unify consent state: ensure `js/consent.js` and `CookieSettings.tsx` share single localStorage key | High | `tme_cookie_consent_v1` is sole source of truth; no race conditions | 3h |

**Sprint 1 Target:** Legacy JS files reduced from 12 to ≤ 8

#### 1.2 CI/CD Enhancements
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Add smoke test: verify all `data-react` mount points exist in HTML | High | CI fails if any mount point is missing or mismatched | 3h |
| Configure PR status checks to require CI pass before merge | High | Branch protection rule enforces lint + build + audit pass | 1h |
| Add HTML validation step using `html-validate` | Medium | CI catches malformed HTML; initial run documents existing issues | 3h |
| Establish Lighthouse CI baseline (performance, accessibility, SEO scores) | Medium | Baseline scores recorded; CI runs Lighthouse on every PR | 4h |

#### 1.3 i18n Parity Audit
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Verify `/de/index.html` and `/fr/index.html` have all 17 `data-react` script tags | High | Byte-for-byte parity of React integration between EN/DE/FR index pages | 2h |
| Document missing `/de/` and `/fr/` subpages (contact, faq, products) | Medium | Gap analysis with prioritized creation list | 1h |
| Verify `hreflang` tags are consistent across all existing pages | Medium | Every page with a translation has correct bidirectional hreflang | 2h |

**Sprint 1 Definition of Done:**
- [ ] Legacy audit complete with decisions documented
- [ ] CI pipeline includes smoke test + HTML validation + Lighthouse baseline
- [ ] i18n gap analysis complete
- [ ] All sprint 1 tasks merged to main

---

### Sprint 2: Security Hardening (Weeks 3–4)

**Theme:** Raise security score from 72% toward 90%, reduce attack surface

#### 2.1 Inline Script Migration
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Inventory all 25 inline `<script>` blocks across all HTML pages | High | Spreadsheet/table with file, line number, purpose, migration plan | 3h |
| Extract analytics wrappers to external `js/analytics-loader.js` | High | Inline analytics code replaced with `<script src>` references; consent gating preserved | 4h |
| Extract Bootstrap initialization scripts to external files | Medium | No inline Bootstrap JS; all loaded via external `<script>` tags | 3h |
| Extract JSON-LD structured data to external data files or build-time injection | Low | Structured data remains valid; loaded from external source | 4h |
| Reduce inline script count to ≤ 10 | High | Count verified via automated CI check | 2h |

#### 2.2 CSP Refinement
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Audit current CSP policy against actual resource usage | High | Document all required domains, scripts, styles | 2h |
| Implement nonce-based CSP for remaining essential inline scripts | High | `unsafe-inline` removed from `script-src`; nonce applied | 4h |
| Add CSP reporting endpoint (Report-URI or report-to) | Medium | CSP violations logged and reviewable | 3h |
| Test CSP changes across all pages (EN/DE/FR) | High | Zero console CSP errors on any page | 3h |
| Validate with securityheaders.com — target A+ rating | Medium | Screenshot of A+ score archived | 1h |

#### 2.3 Dependency Security
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Add SRI hashes to all external CDN scripts | High | Every external `<script>` and `<link>` has `integrity` attribute | 3h |
| Configure Dependabot for automated PR creation | High | `.github/dependabot.yml` configured for npm + GitHub Actions | 1h |
| Pin critical dependencies to exact versions in `package-lock.json` | Medium | Lock file reviewed; no floating ranges for security-critical packages | 1h |
| Add CSRF token support to contact form submissions | Medium | Form submissions include anti-CSRF token; server validates | 4h |
| Add client-side input sanitization to all form fields | Medium | XSS payloads in form inputs are neutralized before submission | 3h |

**Sprint 2 Target:** Security score ≥ 85%

**Sprint 2 Definition of Done:**
- [ ] Inline scripts reduced to ≤ 10
- [ ] CSP policy updated; `unsafe-inline` removed for scripts
- [ ] Dependabot configured and first PR created
- [ ] SRI hashes on all external resources
- [ ] Security score validated ≥ 85%

---

### Sprint 3: Performance Optimization (Weeks 5–6)

**Theme:** Establish performance baselines, optimize critical rendering path

#### 3.1 Image Optimization
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Audit all images in `images/` — catalog size, format, dimensions | High | Inventory spreadsheet with optimization opportunities | 2h |
| Convert hero/product images to WebP with JPEG fallback (`<picture>` element) | High | WebP served to supporting browsers; JPEG for Safari <14 | 6h |
| Add `width` and `height` attributes to all `<img>` tags | High | Zero CLS from image loading; Lighthouse CLS score ≤ 0.1 | 3h |
| Implement native `loading="lazy"` for all below-fold images | Medium | First-party lazy loading; `lazysizes.min.js` removed if redundant | 2h |
| Create responsive image variants with `srcset` for product images | Medium | Appropriate image sizes served per viewport width | 4h |

#### 3.2 Bundle & Loading Optimization
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Run Vite bundle analyzer (`rollup-plugin-visualizer`) | High | Visualization of shared chunk composition; optimization opportunities documented | 2h |
| Add resource hints: `<link rel="preconnect">` for CDN domains | Medium | External resources load faster; verified in Network panel | 1h |
| Add `<link rel="dns-prefetch">` for analytics/third-party domains | Low | DNS resolution parallelized | 1h |
| Ensure `font-display: swap` on all web font declarations | Medium | No FOIT; text visible immediately with system font fallback | 1h |
| Review and optimize Firebase hosting cache headers | Medium | Static assets cached for 1 year; HTML cached for 1 hour | 2h |

#### 3.3 Core Web Vitals Baseline
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Run Lighthouse CI and record baseline scores | High | Scores documented: Performance, Accessibility, Best Practices, SEO | 1h |
| Set Lighthouse CI thresholds in CI pipeline | High | CI fails if scores drop below: Perf ≥ 85, A11y ≥ 90, SEO ≥ 90 | 2h |
| Identify and fix top 3 Lighthouse performance opportunities | High | Performance score ≥ 90 | 4h |

**Sprint 3 Target:** Lighthouse Performance ≥ 90, Accessibility ≥ 95

**Sprint 3 Definition of Done:**
- [ ] Product images converted to WebP with fallbacks
- [ ] CLS score ≤ 0.1 across all pages
- [ ] Lighthouse CI integrated with score thresholds
- [ ] Performance score ≥ 90 on homepage

---

### Sprint 4: Features & Monitoring (Weeks 7–8)

**Theme:** Add deferred features, establish production observability

#### 4.1 Product Search Implementation
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Evaluate search library: Fuse.js (~6 KB gzipped) vs custom filter | Medium | Decision documented with bundle size impact analysis | 2h |
| Create `SearchBar.tsx` with autocomplete dropdown | Medium | Component renders search results as user types; keyboard navigable | 6h |
| Create `react/src/entries/search.tsx` entry point | Medium | Bundle builds successfully; size ≤ 5 KB (excluding search lib) | 1h |
| Add `data-react="search"` mount point to header in all HTML pages | Medium | Search bar appears in correct position across EN/DE/FR | 3h |
| Support multi-language product names in search | Low | Search works in English, German, French product names | 2h |
| Add search analytics tracking (consent-aware) | Low | Search queries logged via `useTracking` hook only after consent | 1h |

#### 4.2 Error Tracking & Monitoring
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Evaluate error tracking: Sentry free tier vs custom `window.onerror` | High | Decision documented with privacy/consent implications | 2h |
| Implement React `ErrorBoundary` component wrapping all mount points | High | React errors show graceful fallback UI; error logged | 3h |
| Add global `window.onerror` / `window.onunhandledrejection` handlers | Medium | JS errors captured and reported (behind consent gate) | 2h |
| Implement Core Web Vitals tracking using `web-vitals` library | Medium | LCP, FID/INP, CLS tracked in production; data reviewable | 3h |
| Set up uptime monitoring for themoonexports.com | Medium | External monitor configured; alerts on downtime | 1h |

#### 4.3 Analytics Migration
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Evaluate GA4 migration from Universal Analytics | Medium | Migration plan documented; consent integration verified | 2h |
| Update `useTracking` hook for GA4 API if migrating | Medium | Analytics events fire correctly with GA4 format | 3h |
| Update `legal/privacy.html` for any analytics changes | High | Privacy policy reflects current data collection practices | 2h |

**Sprint 4 Target:** Product search live; Error tracking deployed; Analytics reviewed

**Sprint 4 Definition of Done:**
- [ ] Product search functional across all locales
- [ ] Error boundaries catch and report React errors
- [ ] Core Web Vitals tracked in production
- [ ] Privacy policy updated for any new tracking

---

### Sprint 5: Stabilization & Documentation (Weeks 9–10)

**Theme:** Polish, document, prepare for Phase 5

#### 5.1 Final Legacy JS Cleanup
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Execute deferred removals from Sprint 1 audit | High | Legacy JS files ≤ 6 | 4h |
| Remove `lazysizes.min.js` if native lazy loading is sufficient | Medium | Native `loading="lazy"` covers all use cases | 1h |
| Consolidate remaining utility functions | Medium | `js/utils.js` is sole utility source; no duplicates | 2h |

#### 5.2 Documentation Updates
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Update README.md with current architecture and React status | High | README reflects 17-bundle React architecture, CI/CD, deployment | 2h |
| Update `.aicontext` with Phase 4 completion status and Phase 5 priorities | High | AI agents get accurate project context | 1h |
| Archive Phase 4 results in `PRODUCTION_READINESS_SUMMARY.md` | Medium | Security score, Lighthouse scores, bundle metrics documented | 1h |
| Create `docs/PHASE_4_RESULTS.md` with final outcomes and metrics | Medium | Retrospective with lessons learned | 2h |
| Update `TESTING_PLAN.md` with Phase 4 test results | Medium | All automated and manual test outcomes recorded | 1h |

#### 5.3 i18n Subpage Creation (if prioritized)
| Task | Priority | Acceptance Criteria | Est. |
|------|----------|-------------------|------|
| Create `/de/contact.html` with React integration | Low | German contact page with ContactForm.tsx hydration | 3h |
| Create `/fr/contact.html` with React integration | Low | French contact page with ContactForm.tsx hydration | 3h |
| Create `/de/faq.html` and `/fr/faq.html` | Low | Localized FAQ with accordion component | 4h |
| Verify hreflang bidirectional links for new pages | Low | Sitemap updated; hreflang tags correct | 1h |

**Sprint 5 Definition of Done:**
- [ ] Legacy JS files ≤ 6
- [ ] All documentation current
- [ ] Phase 4 retrospective completed
- [ ] Ready for Phase 5 kickoff

---

## 3. Phase 5 Vision & Roadmap

### Phase 5: Modern UI & Growth (Target: Q3–Q4 2026)

With hardening complete, Phase 5 shifts focus to **user experience modernization, conversion optimization, and scalable content management**.

#### 5.1 Bootstrap 5 Migration
| Aspect | Details |
|--------|---------|
| **Scope** | Migrate from Bootstrap 3.3.x to Bootstrap 5.3.x |
| **Approach** | Incremental page-by-page migration using compatibility layer |
| **Risk** | High — grid system changes, component API differences, jQuery removal |
| **Dependencies** | Phase 4 legacy JS cleanup must be complete |
| **Est. Duration** | 4–6 weeks |
| **Key Benefits** | Modern CSS Grid/Flexbox utilities, accessibility improvements, smaller CSS bundle, active maintenance |

**Migration Steps:**
1. Audit all Bootstrap 3 class usage across 30+ HTML files
2. Create `css/bootstrap-compat.css` shim for transition period
3. Migrate page-by-page starting with `index.html`
4. Update React components that reference Bootstrap classes
5. Remove Bootstrap 3 CSS and JS files
6. Update all locale pages (`/de/`, `/fr/`)

#### 5.2 Homepage Redesign
| Aspect | Details |
|--------|---------|
| **Goal** | Modern, conversion-optimized landing page |
| **Approach** | A/B test new design against current using Firebase A/B Testing |
| **Key Changes** | Hero section refresh, product showcase grid, trust signals above fold, CTA optimization |
| **Dependencies** | Bootstrap 5 migration, image optimization complete |

#### 5.3 Product Experience Enhancement
| Feature | Description | Priority |
|---------|-------------|----------|
| **Product detail pages** | Rich product pages with image gallery, specifications, variants | High |
| **Category filtering** | Client-side filtering by material, category, price range | Medium |
| **Wishlist/favorites** | LocalStorage-based product bookmarking | Medium |
| **Related products** | Algorithmic product recommendations based on category | Low |
| **Quick view** | Enhanced ProductModal with additional product data | Low |

#### 5.4 Content Management
| Feature | Description | Priority |
|---------|-------------|----------|
| **Headless CMS evaluation** | Evaluate Netlify CMS, Decap CMS, or Contentful for content management | Medium |
| **Structured data expansion** | Product schema, FAQ schema, BreadcrumbList for all pages | High |
| **Blog/news section** | Content marketing for SEO with React-powered article pages | Low |
| **Automated sitemap** | Script to regenerate `sitemap.xml` from file system | Medium |

#### 5.5 Advanced Analytics & Conversion Tracking
| Feature | Description | Priority |
|---------|-------------|----------|
| **GA4 full migration** | Complete migration from Universal Analytics | High |
| **E-commerce tracking** | Product views, add-to-cart, inquiry tracking | Medium |
| **Heatmap integration** | Evaluate Hotjar/Clarity for UX insights (consent-gated) | Low |
| **Custom dashboards** | Key metrics visible in GA4 or Looker Studio | Medium |

#### 5.6 Progressive Web App (PWA) Exploration
| Feature | Description | Priority |
|---------|-------------|----------|
| **Service Worker** | Offline support for catalog browsing | Low |
| **Web App Manifest** | Installable on mobile devices | Low |
| **Push notifications** | New product alerts for opted-in users | Low |

---

## 4. Technical Debt Register

Track known technical debt items with severity and planned resolution.

| ID | Debt Item | Severity | Origin | Resolution Sprint | Status |
|----|-----------|----------|--------|-------------------|--------|
| TD-001 | Bootstrap 3.x — end of life, no security patches | High | Legacy | Phase 5 Sprint 1 | Planned |
| TD-002 | 25 inline `<script>` blocks violate CSP best practices | High | Legacy | Phase 4 Sprint 2 | ⏳ |
| TD-003 | 12 legacy JS files with partial overlap to React bundles | Medium | Migration | Phase 4 Sprint 1 | ⏳ |
| TD-004 | 40 non-critical HTTP links (external/social) | Low | Legacy | Phase 4 Sprint 2 | ⏳ |
| TD-005 | No automated functional/integration tests | High | Never built | Phase 5 Sprint 2 | Planned |
| TD-006 | Images not optimized (no WebP, no srcset) | Medium | Legacy | Phase 4 Sprint 3 | ⏳ |
| TD-007 | Missing `/de/` and `/fr/` subpages (contact, faq, products) | Medium | Incomplete i18n | Phase 4 Sprint 5 | ⏳ |
| TD-008 | `lazysizes.min.js` potentially redundant with native lazy loading | Low | Legacy | Phase 4 Sprint 5 | ⏳ |
| TD-009 | README.md does not reflect React architecture | Low | Outdated | Phase 4 Sprint 5 | ⏳ |
| TD-010 | No error boundaries in React components | Medium | Phase 1-3 gap | Phase 4 Sprint 4 | ⏳ |
| TD-011 | Firebase hosting config may have suboptimal cache headers | Low | Default config | Phase 4 Sprint 3 | ⏳ |
| TD-012 | Shared React runtime (~142 KB) — evaluate optimization | Low | Phase 1 | Phase 4 Sprint 3 | ⏳ |

---

## 5. Risk Register & Mitigation

| ID | Risk | Probability | Impact | Mitigation Strategy |
|----|------|-------------|--------|---------------------|
| R-001 | Bootstrap 5 migration breaks visual layout | High | High | Page-by-page migration with visual regression screenshots; maintain compatibility shim |
| R-002 | CSP changes block legitimate scripts | Medium | High | Implement CSP in report-only mode first; monitor violations before enforcing |
| R-003 | Legacy JS removal causes functionality regression | Medium | Medium | Comprehensive manual QA checklist per page; shadow period where both legacy + React active |
| R-004 | Image optimization degrades visual quality | Low | Medium | A/B compare original vs. optimized; maintain originals in backup |
| R-005 | Search feature adds significant bundle weight | Medium | Low | Evaluate custom filter vs. Fuse.js; enforce 5 KB budget; lazy-load search bundle |
| R-006 | GA4 migration loses historical analytics data | Medium | Medium | Dual-track GA3 + GA4 during transition; export historical data before cutoff |
| R-007 | Dependabot creates noise with frequent PRs | Medium | Low | Configure weekly schedule; group minor updates; auto-merge patch versions |
| R-008 | i18n subpage creation introduces content maintenance burden | Medium | Medium | Evaluate CMS solution before creating many new pages; template-based approach |
| R-009 | Error tracking service affects page performance | Low | Medium | Choose lightweight option; load asynchronously; behind consent gate |
| R-010 | CI pipeline becomes slow (>5 min) | Medium | Low | Parallelize jobs; cache dependencies; skip unchanged checks |

---

## 6. Architecture Decision Records

### ADR-001: Keep Hybrid Static + React Architecture

**Status:** Accepted  
**Context:** With 17 React bundles complete, we could migrate to a full React SPA.  
**Decision:** Maintain the static HTML + progressive React hydration architecture.  
**Rationale:**
- GitHub Pages hosting is free and requires no server infrastructure
- Static HTML ensures SEO crawlability without SSR complexity
- Progressive enhancement means the site works without JavaScript
- Bundle sizes remain small (33.9 KB total) because each page loads only what it needs

### ADR-002: Defer Bootstrap 5 Migration to Phase 5

**Status:** Accepted  
**Context:** Bootstrap 3 is end-of-life and doesn't receive security patches.  
**Decision:** Defer migration to Phase 5 after Phase 4 hardening is complete.  
**Rationale:**
- Bootstrap 5 migration touches every HTML file (30+ pages)
- Phase 4 security hardening (CSP, inline scripts) should land first to avoid double-work
- Current Bootstrap 3 has no known exploitable vulnerabilities in our usage
- Migration risk is high and needs dedicated focus

### ADR-003: Client-Side Search Over Server-Side

**Status:** Accepted  
**Context:** Product search was deferred from Phase 3; need to decide implementation approach.  
**Decision:** Implement client-side search using the existing `products.json` (23 products).  
**Rationale:**
- 23 products easily searchable in-browser without server roundtrip
- No backend infrastructure needed for a static site
- Instant results improve UX
- If product catalog grows beyond ~200, re-evaluate with server-side search

### ADR-004: Sentry Free Tier for Error Tracking

**Status:** Proposed (pending Phase 4 Sprint 4 evaluation)  
**Context:** Need production error tracking without adding significant cost or complexity.  
**Decision:** Evaluate Sentry free tier (10K events/month) vs. custom `window.onerror` logging.  
**Rationale:**
- Free tier sufficient for current traffic levels
- Structured error reporting with stack traces and breadcrumbs
- Must be loaded behind consent gate to respect privacy
- Alternative: custom error logging to Firebase Realtime Database (already configured)

### ADR-005: Nonce-Based CSP Over Hash-Based

**Status:** Proposed (pending Phase 4 Sprint 2 implementation)  
**Context:** Need to remove `unsafe-inline` from CSP `script-src` directive.  
**Decision:** Use nonce-based CSP with server-generated nonces (via Firebase hosting headers or build-time injection).  
**Rationale:**
- Nonces are more flexible than hashes — no need to update hash on every script change
- Firebase hosting can inject nonces via Cloud Functions or edge workers
- If Firebase nonce injection is not feasible, fall back to hash-based CSP
- Static site constraint: evaluate build-time nonce generation as alternative

---

## 7. Metrics & KPIs Dashboard

### Phase 4 Success Metrics

| Metric | Baseline (Feb 2026) | Sprint 2 Target | Sprint 4 Target | Phase 4 Final |
|--------|---------------------|-----------------|-----------------|---------------|
| **Security Score** | 72% | 85% | 90%+ | 90%+ |
| **Lighthouse Performance** | TBD (no baseline) | — | 90+ | 90+ |
| **Lighthouse Accessibility** | TBD | — | 95+ | 95+ |
| **Lighthouse SEO** | TBD | — | 95+ | 95+ |
| **Lighthouse Best Practices** | TBD | — | 90+ | 90+ |
| **Legacy JS Files** | 12 | 8 | 7 | ≤ 6 |
| **Inline Scripts** | 25 | ≤ 10 | ≤ 10 | ≤ 10 |
| **Bundle Budget Violations** | 0 | 0 | 0 | 0 |
| **CSP Violations** | Unknown | 0 (report-only) | 0 (enforced) | 0 |
| **CI Pipeline Duration** | ~2 min | ~3 min | ~4 min | ≤ 5 min |
| **Total React Bundles** | 17 | 17 | 18 (search) | 18 |
| **Total Bundle Size** | 33.9 KB | 33.9 KB | ~38 KB | ≤ 40 KB |
| **i18n Parity** | Partial | Audited | Partial+ | Full (index) |

### How to Measure

| Metric | Tool / Method |
|--------|---------------|
| Security Score | securityheaders.com + manual checklist ratio |
| Lighthouse Scores | `npx @lhci/cli autorun` in CI pipeline |
| Legacy JS Files | `ls js/*.js \| wc -l` excluding `dist/` |
| Inline Scripts | `grep -r '<script>' *.html \| grep -v 'src=' \| wc -l` |
| CSP Violations | CSP report-to endpoint + browser console |
| CI Duration | GitHub Actions workflow run time |
| Bundle Size | CI bundle size check step output |

---

## 8. Dependency Map

Visualizes which Phase 4 workstreams depend on each other.

```
Sprint 1                Sprint 2              Sprint 3              Sprint 4           Sprint 5
─────────────────────   ───────────────────   ───────────────────   ─────────────────  ─────────────────
                                                                                       
Legacy JS Audit ──────► Legacy JS Cleanup ──────────────────────► Final Cleanup ────► Documentation
       │                       │                                                       
       │                       │                                                       
CI Foundation ─────────► CI + HTML Validate ──► Lighthouse CI ────► CI Polish          
       │                       │                     │                                 
       │                       │                     │                                 
i18n Audit ────────────────────┼─────────────────────┼──────────► i18n Subpages        
                               │                     │                                 
                        Inline Script ─────► Image Optimization                        
                        Migration                    │                                 
                               │                     │                                 
                        CSP Refinement              CWV Baseline                       
                               │                                                       
                        Dependency                                                     
                        Security ──────────────────────────────► Product Search         
                                                                       │               
                                                    Error Tracking ────┤               
                                                                       │               
                                                    Analytics ─────────┘               
```

**Critical Path:** Legacy JS Audit → Inline Script Migration → CSP Refinement → CSP Validation

**Parallel Tracks:**
- Image optimization can proceed independently in Sprint 3
- Product search can start in Sprint 4 without Sprint 3 completion
- Error tracking is independent of other Sprint 4 work

---

## 9. Release & Rollout Strategy

### Deployment Model

| Aspect | Approach |
|--------|----------|
| **Hosting** | GitHub Pages (primary) + Firebase Hosting (staging/preview) |
| **Branch Strategy** | `main` → production; feature branches → Firebase preview channels |
| **PR Process** | Feature branch → PR → CI pass → Code review → Merge → Auto-deploy |
| **Rollback** | `git revert` on `main` → immediate redeploy via GitHub Pages |

### Sprint Release Cadence

| Sprint | Release Type | Rollout |
|--------|-------------|---------|
| Sprint 1 | Internal release — CI/audit improvements only | Merge to main; no user-facing changes |
| Sprint 2 | Security release — CSP, inline scripts | Firebase preview → 24h soak → merge to main |
| Sprint 3 | Performance release — images, Lighthouse | Firebase preview → visual QA → merge to main |
| Sprint 4 | Feature release — search, monitoring | Firebase preview → functional QA → merge to main |
| Sprint 5 | Polish release — cleanup, docs | Merge to main |

### Rollout Checklist (Per Sprint)

- [ ] All CI checks pass (lint, build, bundle budget, audit)
- [ ] Lighthouse scores meet sprint targets
- [ ] Firebase preview deployed and manually tested
- [ ] Cross-browser check (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] `/de/` and `/fr/` pages verified
- [ ] No console errors
- [ ] Security headers validated (securityheaders.com)
- [ ] Documentation updated
- [ ] PR reviewed and approved

### Incident Response

| Severity | Response Time | Action |
|----------|--------------|--------|
| **Critical** (site down) | < 1 hour | Revert last deployment; investigate |
| **High** (broken feature) | < 4 hours | Hotfix branch; expedited PR review |
| **Medium** (visual issue) | < 24 hours | Normal PR process |
| **Low** (minor bug) | Next sprint | Add to backlog |

---

## Appendix A: Sprint Calendar

```
February 2026
  Week 1-2  ─── Sprint 1: Foundation & Quick Wins
  
March 2026
  Week 3-4  ─── Sprint 2: Security Hardening
  Week 5-6  ─── Sprint 3: Performance Optimization
  
April 2026
  Week 7-8  ─── Sprint 4: Features & Monitoring
  Week 9-10 ─── Sprint 5: Stabilization & Documentation
  
May 2026
  Phase 4 retrospective & Phase 5 kickoff planning

Q3–Q4 2026
  Phase 5: Modern UI & Growth (Bootstrap 5, Homepage Redesign, etc.)
```

## Appendix B: Tools & Services

| Tool | Purpose | Status |
|------|---------|--------|
| **Vite 5.4** | React bundle builder | ✅ In use |
| **ESLint** | JavaScript/TypeScript linting | ✅ In use |
| **TypeScript 5.6** | Type checking | ✅ In use |
| **GitHub Actions** | CI/CD pipeline | ✅ In use (3 workflows) |
| **Firebase Hosting** | Staging/preview deployments | ✅ In use |
| **html-validate** | HTML validation | 📋 Planned (Sprint 1) |
| **@lhci/cli** | Lighthouse CI | 📋 Planned (Sprint 3) |
| **Fuse.js** | Client-side search | 📋 Planned (Sprint 4) |
| **web-vitals** | Core Web Vitals tracking | 📋 Planned (Sprint 4) |
| **Sentry** | Error tracking | 📋 Under evaluation (Sprint 4) |
| **Dependabot** | Automated dependency PRs | 📋 Planned (Sprint 2) |
| **securityheaders.com** | Security header validation | 🔧 Manual (automate in Sprint 2) |

---

*This is a living document. Update after each sprint retrospective.*  
*Last Updated: February 2026*  
*Next Review: End of Sprint 1*
