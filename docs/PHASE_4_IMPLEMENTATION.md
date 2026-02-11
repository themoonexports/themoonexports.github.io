# Phase 4 Implementation Plan — Hardening & Operational Maturity

**Created:** February 2026  
**Status:** 📋 Planned  
**Previous Phase:** [Phase 3 Implementation](PHASE_3_IMPLEMENTATION.md) (Complete, February 2026)

**Related Documents:**
- [../react-refactoring.md](../react-refactoring.md) — Overall React migration strategy
- [Phase 3 Implementation](PHASE_3_IMPLEMENTATION.md) — Completed Phase 3 reference
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) — Production status
- [Security Checklist](SECURITY_CHECKLIST.md) — Security remediation tracking
- [Testing Plan](TESTING_PLAN.md) — QA procedures

---

## Overview

With all interactive components migrated to React (Phases 1–3), Phase 4 shifts focus from feature delivery to **hardening, operational maturity, and long-term maintainability**. This phase addresses deferred items from earlier phases, establishes automated quality gates, and prepares the codebase for sustainable growth.

### Phase 4 Goals
1. Retire legacy vanilla JS that now has React replacements
2. Establish automated CI/CD testing and quality gates
3. Improve performance through image optimization and bundle analysis
4. Complete security hardening (CSP, Bootstrap upgrade, inline scripts)
5. Achieve full i18n parity across EN/DE/FR pages
6. Implement product search (deferred from Phase 3)
7. Set up production monitoring and error tracking

---

## Workstream 1: Legacy JS Retirement

### Objective
Remove or reduce legacy vanilla JavaScript files that have been superseded by React components, reducing total JS payload and eliminating dual-maintenance burden.

### Files to Evaluate

| Legacy File | React Replacement | Action |
|-------------|-------------------|--------|
| `js/navigation.js` | `Header.tsx` + dropdown logic | Keep — still needed by non-React pages; migrate callers incrementally |
| `js/forms.js` | `ContactForm.tsx`, `NewsletterForm.tsx` | Audit — remove form handlers already covered by React |
| `js/consent.js` | `useConsent` hook + `CookieSettings.tsx` | Bridge — keep as fallback; unify consent source of truth |
| `js/auto-year-update.js` | `Footer.tsx` auto-year | Remove — React Footer handles this |
| `js/components.js` | Various React components | Audit — identify unused exports |
| `js/main.js` | React entry points | Audit — check if still bootstrapping non-React behavior |
| `js/application.js` | React initialization | Audit — may be fully superseded |

### Checklist
- [ ] Audit each legacy JS file for callers across all HTML pages
- [ ] Remove `js/auto-year-update.js` (superseded by Footer.tsx)
- [ ] Remove dead code paths in `js/forms.js` covered by React forms
- [ ] Unify consent state: `js/consent.js` ↔ `CookieSettings.tsx` share `localStorage['tme_cookie_consent_v1']`
- [ ] Remove unused exports from `js/components.js`
- [ ] Test site with legacy scripts removed — ensure React bundles cover all behavior
- [ ] Update HTML pages to remove `<script>` tags for retired files
- [ ] Document remaining legacy files and their purpose

---

## Workstream 2: Automated CI/CD & Testing

### Objective
Establish automated quality gates that run on every push and pull request to catch regressions before they reach production.

### CI Pipeline Components

| Stage | Tool | Purpose |
|-------|------|---------|
| Lint | ESLint + TypeScript | Catch syntax/type errors in React components |
| Build | Vite (`npm run build`) | Verify all 17 entry points compile successfully |
| Bundle Budget | Custom script | Enforce <7 KB per-bundle limit |
| Lighthouse CI | `@lhci/cli` | Performance, accessibility, SEO regression checks |
| Security Audit | `npm audit` | Dependency vulnerability scanning |
| HTML Validation | `html-validate` | Validate markup across all pages |

### Checklist
- [ ] Create `.github/workflows/ci.yml` with lint → build → bundle-check pipeline
- [ ] Add TypeScript strict mode check (`tsc --noEmit`) to CI
- [ ] Add bundle size budget enforcement script (fail if any bundle > 7 KB)
- [ ] Integrate Lighthouse CI with performance thresholds
- [ ] Add `npm audit --audit-level=high` to CI pipeline
- [ ] Add HTML validation for all pages
- [ ] Configure PR status checks to require CI pass before merge
- [ ] Add smoke test: verify all `data-react` mount points exist in built HTML

---

## Workstream 3: Performance Optimization

### Objective
Improve Core Web Vitals scores through image optimization, resource loading improvements, and bundle analysis.

### Tasks

#### Image Optimization
- [ ] Audit all images in `images/` directory for size and format
- [ ] Convert product images to WebP format with JPEG fallback
- [ ] Implement responsive images with `srcset` and `sizes` attributes
- [ ] Add proper `width` and `height` attributes to prevent CLS
- [ ] Implement native lazy loading (`loading="lazy"`) for below-fold images
- [ ] Remove unused/placeholder images from repository

#### Bundle Optimization
- [ ] Run bundle analyzer to identify duplicate code across chunks
- [ ] Evaluate tree-shaking effectiveness for React components
- [ ] Consider dynamic imports for page-specific components
- [ ] Audit shared chunk size (currently ~141 KB) for optimization opportunities
- [ ] Evaluate React 19 upgrade for reduced bundle size

#### Loading Performance
- [ ] Add resource hints (`preconnect`, `dns-prefetch`) for external domains
- [ ] Implement critical CSS inlining for above-the-fold content
- [ ] Review `defer` vs `async` strategy for script loading
- [ ] Add `font-display: swap` for web fonts to prevent FOIT
- [ ] Compress and cache static assets via Firebase hosting config

---

## Workstream 4: Security Hardening

### Objective
Close remaining security gaps from the [Security Checklist](SECURITY_CHECKLIST.md) and raise the security score from 72% toward 90%+.

### Tasks

#### CSP Refinement
- [ ] Audit current CSP policy against actual resource usage
- [ ] Replace `unsafe-inline` with nonce-based CSP for remaining inline scripts
- [ ] Add CSP reporting endpoint (`report-uri` or `report-to`)
- [ ] Test CSP changes across all pages (EN/DE/FR)
- [ ] Validate with securityheaders.com

#### Bootstrap Upgrade
- [ ] Plan Bootstrap 3.x → 5.3.x migration strategy
- [ ] Audit Bootstrap class usage across all HTML pages
- [ ] Create compatibility shim for transition period
- [ ] Update CSS references and test visual regression
- [ ] Remove old Bootstrap 3 JS and CSS files

#### Inline Script Migration
- [ ] Identify all remaining inline `<script>` blocks (25 instances)
- [ ] Extract to external files or React components
- [ ] Add SRI hashes to all external scripts
- [ ] Validate with CSP after migration

#### Form Security
- [ ] Add CSRF token support to contact form
- [ ] Implement client-side input sanitization
- [ ] Add rate limiting for form submissions (via Firebase rules or client-side)
- [ ] Validate Zoho integration security

#### Dependency Maintenance
- [ ] Establish monthly dependency update schedule
- [ ] Configure Dependabot or Renovate for automated PR creation
- [ ] Pin critical dependencies to exact versions
- [ ] Audit and remove unused dependencies from `package.json`

---

## Workstream 5: i18n Parity

### Objective
Ensure German (`/de/`) and French (`/fr/`) pages have the same React integration and component coverage as the English pages.

### Current State
- `/de/index.html` — has some `data-react` attributes
- `/fr/index.html` — has some `data-react` attributes
- No `/de/contact.html`, `/de/faq.html`, etc. — these pages don't exist yet

### Tasks
- [ ] Audit `/de/index.html` for all `data-react` attributes matching `index.html`
- [ ] Audit `/fr/index.html` for all `data-react` attributes matching `index.html`
- [ ] Add missing Phase 3 script tags to `/de/index.html` and `/fr/index.html`
- [ ] Evaluate creating `/de/contact.html`, `/de/faq.html`, `/fr/contact.html`, `/fr/faq.html`
- [ ] Verify React components render localized content correctly (locale detection via `lang` attribute)
- [ ] Add `hreflang` verification to CI pipeline
- [ ] Test language switcher navigation between all locale variants

---

## Workstream 6: Product Search (Deferred from Phase 3)

### Objective
Implement client-side product search using the existing `products.json` data.

### Design

| Aspect | Decision |
|--------|----------|
| **Data source** | `public/products.json` (23 products, already exists) |
| **Search approach** | Client-side fuzzy search (no backend needed) |
| **Library** | Fuse.js or custom filter (evaluate bundle size) |
| **Mount point** | `#search-bar[data-react="search"]` in header area |
| **Bundle target** | < 5 KB (excluding search library) |

### Checklist
- [ ] Evaluate search library options (Fuse.js ~6 KB gzipped vs. custom)
- [ ] Create `react/src/components/SearchBar.tsx` with autocomplete
- [ ] Create `react/src/entries/search.tsx` entry point
- [ ] Add to `react/vite.config.ts`
- [ ] Add `data-react="search"` mount point and script tag to HTML pages
- [ ] Implement keyboard navigation for search results
- [ ] Add search analytics tracking (consent-aware)
- [ ] Test with all 23 products in `products.json`
- [ ] Support multi-language product names in search

---

## Workstream 7: Production Monitoring

### Objective
Establish observability for the production site to catch issues before users report them.

### Tasks

#### Error Tracking
- [ ] Evaluate error tracking options (Sentry free tier, LogRocket, or custom)
- [ ] Add global error handler for React components (`ErrorBoundary`)
- [ ] Log hydration failures and React rendering errors
- [ ] Set up alert thresholds for error rates

#### Real User Monitoring (RUM)
- [ ] Implement Core Web Vitals tracking (LCP, FID/INP, CLS)
- [ ] Track page load times per route
- [ ] Monitor consent acceptance rates
- [ ] Track React bundle load success rates

#### Analytics Migration
- [ ] Evaluate GA4 migration from Universal Analytics
- [ ] Update analytics tracking code in `useTracking` hook
- [ ] Update privacy policy for any analytics changes
- [ ] Ensure all tracking remains behind consent gate

#### Uptime Monitoring
- [ ] Set up uptime monitoring for themoonexports.com
- [ ] Configure alerts for downtime or degraded performance
- [ ] Document incident response procedures

---

## Priority & Sequencing

### Sprint 1 (Immediate — Weeks 1–2)
**Focus: Quick wins and CI foundation**
1. Legacy JS audit and `auto-year-update.js` removal
2. CI pipeline with lint + build + bundle check
3. i18n parity audit for `/de/` and `/fr/` pages

### Sprint 2 (Weeks 3–4)
**Focus: Security hardening**
4. CSP refinement and inline script migration
5. Dependency audit and Dependabot setup
6. Form security improvements

### Sprint 3 (Weeks 5–6)
**Focus: Performance**
7. Image optimization (WebP conversion, lazy loading)
8. Bundle analysis and optimization
9. Lighthouse CI integration

### Sprint 4 (Weeks 7–8)
**Focus: Features and monitoring**
10. Product search implementation
11. Error boundary and monitoring setup
12. GA4 migration evaluation

### Ongoing
- Monthly dependency updates
- Quarterly security reviews
- Bootstrap 5 migration planning (larger effort, parallel track)

---

## Success Criteria

| Metric | Current | Phase 4 Target |
|--------|---------|----------------|
| Security Score | 72% | 90%+ |
| Lighthouse Performance | TBD | 90+ |
| Lighthouse Accessibility | TBD | 95+ |
| Lighthouse SEO | TBD | 95+ |
| Bundle Budget Violations | 0 | 0 (enforced by CI) |
| Legacy JS Files | 12 | ≤ 6 |
| Automated Test Coverage | 0% | Build + lint + bundle check |
| i18n Page Parity | Partial | Full (EN = DE = FR) |
| Inline Scripts | 25 | ≤ 10 |
| CSP Violations | Unknown | 0 (monitored) |

---

## Architecture Alignment

Phase 4 continues to follow established project conventions:

- ✅ **Progressive Enhancement**: React remains optional; static HTML works standalone
- ✅ **Bundle Size Target**: All components stay under 7 KB
- ✅ **Consent Gating**: All new analytics/monitoring behind consent
- ✅ **No Breaking Changes**: Legacy JS retirement is incremental
- ✅ **Static HTML First**: No client-side routing; pages remain crawlable
- ✅ **TypeScript First**: All new code authored in TypeScript

---

## See Also

- [../react-refactoring.md](../react-refactoring.md) — Overall migration roadmap
- [Phase 3 Implementation](PHASE_3_IMPLEMENTATION.md) — Completed Phase 3 reference
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) — Completed Phase 2 reference
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) — Overall project status
- [Security Checklist](SECURITY_CHECKLIST.md) — Security remediation tracking
- [Testing Plan](TESTING_PLAN.md) — QA procedures

---

*Phase 4 Planning Date: February 2026*  
*Last Updated: February 2026*
