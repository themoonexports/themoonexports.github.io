# Next Phase Development Plan — First-Principles Engineering Analysis
## The Moon Exports — Phase 4 Hardening & Operational Maturity

**Created:** February 2026  
**Methodology:** First-principles decomposition from measured ground truth  
**Status:** 📋 Active — Sprint-ready execution plan

**Related Documents:**
- [Phase 4 Implementation](PHASE_4_IMPLEMENTATION.md) — Workstream-level checklists
- [../react-refactoring.md](../react-refactoring.md) — React migration roadmap
- [Security Checklist](SECURITY_CHECKLIST.md) — Security remediation tracking
- [Testing Plan](TESTING_PLAN.md) — QA procedures and test matrix

---

## 0. Idea Intake

**Core problem in one sentence:**

> The React migration (Phases 1–3) delivered 17 modular bundles but left behind unmeasured security gaps, dead legacy code, broken i18n parity, and zero production observability — the codebase needs hardening before it can safely grow.

---

## 1. Crystallized Brief

### Target Users

| User | Need | Impact of Doing Nothing |
|------|------|-------------------------|
| **Site visitors** (buyers, B2B) | Fast, secure, accessible product browsing in EN/DE/FR | Slow loads, broken i18n, no search |
| **Site owner** (Kamran Khan) | Maintainable codebase, confidence in production stability | Silent failures, dual-maintenance cost, security risk |
| **Developers / AI agents** | Clear architecture, automated quality gates, accurate docs | Docs diverge from truth, manual QA only |

### Desired Outcomes (Measurable)

| Outcome | Current | Target | How Verified |
|---------|---------|--------|-------------|
| Executable inline scripts | **61** | ≤ 15 | `grep` count in CI |
| CSP header deployed | **None** (no CSP anywhere) | Enforced, zero violations | securityheaders.com + CI check |
| Legacy JS with zero callers removed | **5 files unused** (forms, main, application, npm, utils) | 0 unused files | `grep -rl` caller audit |
| DE/FR React mount parity with EN | **4/14** mounts on de/fr index | 14/14 | Automated diff in CI |
| jQuery version consistency | **2 versions** (3.6.0 + 3.7.1) | Single version | `grep` check |
| IE shims still in production HTML | **13 files** | 0 files | `grep html5shiv` count |
| Pages with hreflang tags | **1** (index.html only) | All pages with locale variants | Automated scan |
| SRI hashes on external scripts | **Partial** (1-3 per page, 9 domains) | 100% of external scripts | CI validation |
| Lighthouse Performance baseline | **Not measured** | ≥ 85 (recorded) | Lighthouse CI |
| Production error tracking | **None** | Errors captured and alerted | ErrorBoundary + handler verification |

### Non-Goals (Phase 4 explicitly defers these)

| Item | Why Deferred |
|------|-------------|
| Bootstrap 3 → 5 migration | Touches 30+ files; depends on Phase 4 cleanup landing first |
| Homepage redesign | Needs Bootstrap 5 and image optimization as prerequisites |
| Full DE/FR subpages (contact, faq, products) | Content translation is a business decision, not an engineering one |
| Server-side rendering (SSR) | Premature for a static site with 23 products |
| Headless CMS integration | Evaluate only after Phase 4 stabilizes the codebase |

---

## 2. Grounded First-Principles Design

### What the codebase actually looks like (measured February 2026)

#### Inline Script Inventory (Ground Truth)

Total inline `<script>` blocks: **125**
- JSON-LD structured data (`type="application/ld+json"`): **64** — leave in place, these are data not code
- **Executable inline scripts: 61** — these are the security/CSP problem

Breakdown of 61 executable scripts by function:

| Category | Count | Files Affected | Migration Path |
|----------|-------|---------------|----------------|
| jQuery dropdown hover (`$(document).ready...slideDown`) | **15** | All pages except index.html, 404 | **Delete** — React `Header.tsx` handles dropdowns |
| Analytics/consent IIFE (`CONFIG = { gaTrackingId... }`) | **16** | All pages | **Extract** → `js/analytics-loader.js` |
| Google Translate init (`googleTranslateElementInit`) | **13** | EN pages + legal (not de/fr) | **Extract** → `js/google-translate-init.js` |
| Zoho form hook (`runOnFormSubmit...`) | **9** | Pages with newsletter form | **Extract** → `js/zoho-form-hook.js` |
| jQuery timer (legal pages) | **4** | legal/*.html | **Extract** → `js/legal-timer.js` or **delete** if unused |
| gtag conversion | **2** | contact.html, buffalo-horn-plates.html | **Extract** → `js/gtag-conversions.js` |
| memberfieo token | **1** | about.html | **Audit** — third-party trust seal; extract or remove |
| Etsy redirect | **1** | buffalo-horn-bowls.html | **Convert** to server redirect in `.htaccess` |

#### Legacy JS Caller Map (Ground Truth)

| File | Callers | React Replacement | Verdict |
|------|---------|-------------------|---------|
| `js/consent.js` (3.5 KB) | 16 pages | `useConsent` hook, `CookieSettings.tsx` | **Keep** — still needed as bridge; unify localStorage key |
| `js/auto-year-update.js` (4.0 KB) | 6 pages | `Footer.tsx` auto-year | **Remove from 6 pages** — Footer handles it where loaded |
| `js/navigation.js` (10.0 KB) | 1 page (index.html) | `Header.tsx` | **Audit** — likely removable from index.html since Header.tsx exists |
| `js/components.js` (2.1 KB) | 1 page (license.html) | None | **Keep** — still used by license.html |
| `js/forms.js` (10.2 KB) | **0 pages** | `ContactForm.tsx`, `NewsletterForm.tsx` | **Delete** — zero callers |
| `js/main.js` (1.3 KB) | **0 pages** | React entry points | **Delete** — zero callers |
| `js/application.js` (0.6 KB) | **0 pages** | N/A | **Delete** — zero callers |
| `js/npm.js` (0.5 KB) | **0 pages** | N/A | **Delete** — zero callers |
| `js/utils.js` (10.4 KB) | **0 pages** | React hooks/utilities | **Delete** — zero callers |
| `js/bootstrap.js` (73.7 KB) | Vendor | Bootstrap CDN | **Keep** — local fallback for CDN failure |
| `js/bootstrap.min.js` (38.8 KB) | Vendor | Bootstrap CDN | **Keep** — loaded via CDN, local is backup |
| `js/lazysizes.min.js` (7.7 KB) | Unknown | Native `loading="lazy"` | **Audit** — check if any `lazyload` class usage remains |

**Immediate wins: Delete 5 files (forms.js, main.js, application.js, npm.js, utils.js) = −23 KB, zero risk.**

#### Security Posture (Ground Truth)

| Claim in Docs | Actual State |
|---------------|-------------|
| "CSP implemented via Firebase hosting" | **No firebase.json exists in repo. No CSP header in .htaccess. CSP is NOT deployed.** |
| "Security headers implemented" | Only X-Content-Type-Options, X-Frame-Options, X-XSS-Protection, Referrer-Policy in .htaccess. **No HSTS. No CSP.** |
| "jQuery updated to single 3.7.1" | **Two versions: index.html loads 3.6.0 from code.jquery.com; all other pages load 3.7.1 from ajax.googleapis.com** |
| "IE8/9 shims removed" | **html5shiv + respond.min.js still present in 13 HTML files** |
| "Security score 72%" | **Cannot be verified without CSP. Actual score likely lower due to missing CSP and HSTS.** |
| "Inline scripts: 25" | **61 executable inline scripts (docs undercounted by 2.4×)** |

#### i18n Parity (Ground Truth)

| Page | EN `data-react` mounts | DE mounts | FR mounts |
|------|----------------------|-----------|-----------|
| index.html | **14** | **4** | **4** |
| about.html | Multiple | ❌ No page | ❌ No page |
| contact.html | Multiple | ❌ No page | ❌ No page |
| faq.html | Multiple | ❌ No page | ❌ No page |
| products.html | Multiple | ❌ No page | ❌ No page |
| All product pages | Multiple | ❌ No page | ❌ No page |

**DE/FR index pages are missing 10 React mount points and corresponding script tags.**
**Only index.html has hreflang tags. No other page has hreflang.**

---

## 3. Adversarial Review — Attacking the Design

### Failure Mode Analysis

| # | Failure Mode | Likelihood | Impact | Current Protection |
|---|-------------|-----------|--------|-------------------|
| F-1 | jQuery dropdown inline script removed before React Header.tsx covers all pages | High | High — broken navigation | **None** — Header.tsx only loaded on some pages; dropdown script is on all |
| F-2 | CSP deployed without full inline script audit, breaks site | High | Critical — site unusable | **None** — no CSP exists to break, but this risk kicks in when we add CSP |
| F-3 | Removing legacy JS files that are still loaded by `de/`/`fr/` subdirectories | Medium | Medium — broken locale pages | Need to check `de/js/` and `fr/js/` too |
| F-4 | React bundle loads but mount point missing (de/fr pages) | Already happening | Low (degraded UX) | **None** — no CI check for mount point parity |
| F-5 | Two jQuery versions cause subtle behavior differences | Low | Low — edge case bugs | Normalize to single version first |
| F-6 | IE shim removal breaks fallback for users on old browsers | Very Low | Very Low — IE is dead | Safe to remove |
| F-7 | Error tracking loads before consent, violating privacy | Medium | High — legal risk | Must gate behind consent from day one |

### Hidden Risks

1. **`de/` and `fr/` directories have their own `js/` and `css/` copies** — legacy JS cleanup must audit these too, not just root `js/`
2. **`buffalo-horn-bowls.html` is a redirect page** — contains only a location.replace script to Etsy. This should be a server-side 302 redirect, not client-side JS.
3. **The `memberfieo` token in about.html** is a third-party trust seal that loads external JS from `cdn.ywxi.net` — potential supply chain risk
4. **No `firebase.json`** means the claim of Firebase security headers is incorrect. The site runs on GitHub Pages with `.htaccess` only (and GitHub Pages ignores `.htaccess`).
5. **GitHub Pages does not support `.htaccess`** — all security headers in `.htaccess` are ineffective unless Apache is the server. The actual deployment target needs verification.

### Critical Question: Where is this site actually hosted?

The repo has:
- `CNAME` file → GitHub Pages custom domain
- `.htaccess` → Apache configuration (GitHub Pages ignores this)
- Firebase hosting workflows → Firebase Hosting deployment

**This means**: Security headers in `.htaccess` work ONLY if served via Apache/cPanel. On GitHub Pages, they are completely ignored. Firebase hosting needs `firebase.json` for headers, which doesn't exist.

**Decision needed:** Identify the primary hosting target and implement headers there.

---

## 4. Design Iteration — Refined Architecture

Based on adversarial review, the Phase 4 architecture must address:

### Revised Priority Order

1. **Measure first** — Cannot improve what we cannot measure (Lighthouse baseline, inline script count CI)
2. **Delete dead code** — Zero-risk removal of 5 unused JS files (23 KB savings)
3. **Normalize jQuery** — Fix the version split (index.html: 3.6.0 → 3.7.1)
4. **Remove IE shims** — 13 files still carry dead code
5. **Fix i18n mount parity** — DE/FR index pages missing 10 React mounts
6. **Extract inline scripts** — 61 → ≤ 15 (keep JSON-LD as-is)
7. **Determine hosting target** — Resolve .htaccess vs firebase.json vs GitHub Pages
8. **Deploy CSP** — Only after inline scripts are extracted and hosting target is clear
9. **Add SRI hashes** — After script landscape is stable
10. **Production monitoring** — ErrorBoundary + basic error handler

### Modules That Can Be Built Simultaneously

```
PARALLEL TRACK A (Zero-Risk Cleanup)     PARALLEL TRACK B (CI/Measurement)
─────────────────────────────────────     ─────────────────────────────────
Delete 5 unused JS files                  Add inline script count to CI
Normalize jQuery to single 3.7.1          Add mount-point parity check to CI
Remove IE shims from 13 files             Establish Lighthouse CI baseline
Remove auto-year-update from 6 pages      Add hreflang validation to CI

PARALLEL TRACK C (i18n Fix)               PARALLEL TRACK D (Security Analysis)
─────────────────────────────────         ─────────────────────────────────
Add 10 missing mounts to de/index         Resolve hosting target question
Add 10 missing mounts to fr/index         Audit external script domains
Add missing script tags to de/fr          Inventory SRI hash gaps
Add hreflang to pages beyond index        Evaluate CSP deployment path

                    SEQUENTIAL (depends on A+B+C+D)
                    ──────────────────────────────
                    Extract inline scripts → external files
                    Deploy CSP in report-only mode
                    Monitor CSP violations for 1 week
                    Enforce CSP
                    Add SRI hashes
                    Deploy ErrorBoundary
```

---

## 5. Atomic Planning — Task Breakdown

Every task below is:
- **Atomic** — completable in ≤ 4 hours
- **Verifiable** — has a concrete pass/fail check
- **Assignable** — can be done independently

### Milestone 1: Measure & Delete (Week 1)

> Theme: Establish CI baselines, remove zero-risk dead code

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| M1-01 | Delete `js/forms.js` (0 callers) | `grep -rl 'forms.js' *.html **/*.html` returns nothing | 15m | — |
| M1-02 | Delete `js/main.js` (0 callers) | `grep -rl 'main.js' *.html **/*.html` returns nothing | 15m | — |
| M1-03 | Delete `js/application.js` (0 callers) | `grep -rl 'application.js' *.html **/*.html` returns nothing | 15m | — |
| M1-04 | Delete `js/npm.js` (0 callers) | `grep -rl 'npm.js' *.html **/*.html` returns nothing | 15m | — |
| M1-05 | Delete `js/utils.js` (0 callers) | `grep -rl 'utils.js' *.html **/*.html` returns nothing | 15m | — |
| M1-06 | Update index.html jQuery from 3.6.0 → 3.7.1 (match all other pages) | `grep -r 'jquery-3.6' *.html` returns 0 results | 15m | — |
| M1-07 | Remove html5shiv + respond.min.js from 13 HTML files | `grep -rl 'html5shiv\|respond.min' *.html **/*.html` returns 0 | 1h | — |
| M1-08 | Remove `js/auto-year-update.js` script tag from 404.html, buffalo-horn-bowls.html, legal/*.html (6 pages) | `grep -rl 'auto-year-update' *.html **/*.html` returns 0 | 30m | — |
| M1-09 | Audit `js/navigation.js` caller on index.html — is it needed given Header.tsx? | Document finding with decision | 30m | — |
| M1-10 | Audit `de/js/` and `fr/js/` for legacy copies | Document what exists, plan removal | 30m | — |
| M1-11 | Audit `lazysizes.min.js` — grep for `lazyload` class in HTML | Document: keep or remove | 30m | — |
| M1-12 | Add CI step: count executable inline scripts, fail if > current (61) | CI job runs, count matches manual count | 2h | — |
| M1-13 | Add CI step: diff `data-react` mounts between EN and DE/FR index pages | CI job runs, currently reports delta of 10 | 2h | — |
| M1-14 | Run Lighthouse CI on index.html, record baseline scores | Scores recorded in PR/commit | 1h | — |
| M1-15 | Determine actual hosting target: GitHub Pages vs Firebase vs Apache/cPanel | Decision documented with evidence | 1h | — |

**Milestone 1 Exit Criteria:**
- [ ] 5 dead JS files deleted (−23 KB)
- [ ] Single jQuery version across all pages
- [ ] IE shims removed from all pages
- [ ] auto-year-update.js removed from pages with Footer.tsx
- [ ] CI measures inline script count, mount parity, Lighthouse baseline
- [ ] Hosting target resolved

---

### Milestone 2: i18n Parity & Script Extraction (Week 2)

> Theme: Fix DE/FR pages, begin inline script consolidation

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| M2-01 | Add 10 missing `data-react` mount attributes to `de/index.html` | Mount count matches `index.html` (14 total) | 2h | — |
| M2-02 | Add 10 missing `data-react` mount attributes to `fr/index.html` | Mount count matches `index.html` (14 total) | 2h | — |
| M2-03 | Add missing React bundle `<script>` tags to `de/index.html` | All 17 bundles loaded (or subset matching EN) | 1h | M2-01 |
| M2-04 | Add missing React bundle `<script>` tags to `fr/index.html` | All 17 bundles loaded (or subset matching EN) | 1h | M2-02 |
| M2-05 | Add `hreflang` tags to about.html, contact.html, faq.html, products.html (EN only, pointing to EN canonical) | `grep hreflang` returns results on all 4 pages | 1h | — |
| M2-06 | Extract jQuery dropdown inline scripts (15 instances) → Delete them (React Header.tsx handles this) | `grep 'slideDown' *.html **/*.html` inside `<script>` tags returns 0 | 2h | M1-09 |
| M2-07 | Extract analytics/consent IIFE (16 instances) → `js/analytics-loader.js` | New file exists; inline blocks replaced with `<script src>` | 3h | — |
| M2-08 | Extract Google Translate init (13 instances) → `js/google-translate-init.js` | New file exists; inline blocks replaced with `<script src>` | 1h | — |
| M2-09 | Extract Zoho form hook (9 instances) → `js/zoho-form-hook.js` | New file exists; inline blocks replaced with `<script src>` | 1h | — |
| M2-10 | Convert buffalo-horn-bowls.html redirect → `.htaccess` 302 rule (or equivalent for hosting target) | Page serves HTTP redirect, not JS redirect | 30m | M1-15 |
| M2-11 | Audit memberfieo trust seal in about.html — security risk assessment | Documented: keep with SRI, or remove | 30m | — |
| M2-12 | Update CI inline script count threshold from 61 to new target | CI passes with reduced count | 15m | M2-06 through M2-09 |
| M2-13 | Update CI mount parity check to pass (delta = 0) | CI passes | 15m | M2-01 through M2-04 |

**Milestone 2 Exit Criteria:**
- [ ] DE/FR index pages have full React mount parity with EN
- [ ] Executable inline scripts reduced from 61 to ≤ 20
- [ ] jQuery dropdown scripts deleted (React handles this)
- [ ] 4 new extracted JS files replace 53+ inline blocks
- [ ] CI mount parity check passes

---

### Milestone 3: Security Hardening (Week 3–4)

> Theme: Deploy actual security headers, close SRI gaps

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| M3-01 | Create `firebase.json` with security headers (if Firebase is hosting target) OR verify `.htaccess` headers work on actual host | Headers appear in `curl -I` response from production | 3h | M1-15 |
| M3-02 | Add HSTS header (`Strict-Transport-Security: max-age=31536000; includeSubDomains`) | Header present in `curl -I` response | 30m | M3-01 |
| M3-03 | Deploy CSP in **report-only** mode (`Content-Security-Policy-Report-Only`) | Header present; no blocking; console shows reports | 2h | M2-06 through M2-09 |
| M3-04 | Monitor CSP report-only violations for 1 week, document findings | Violation report with resolution plan | 1h (+ 1 week wait) | M3-03 |
| M3-05 | Fix any legitimate CSP violations identified in M3-04 | Zero violations in report-only mode | 2h | M3-04 |
| M3-06 | Switch CSP from report-only to enforced | `Content-Security-Policy` header active; site functions normally | 1h | M3-05 |
| M3-07 | Add SRI hashes to jQuery CDN script (all pages) | `integrity=` attribute present on all jQuery `<script>` tags | 1h | M1-06 |
| M3-08 | Add SRI hashes to Bootstrap CDN script (all pages) | `integrity=` attribute present on all Bootstrap `<script>` tags | 1h | — |
| M3-09 | Add SRI hashes to remaining external scripts (Google Translate, Twitter, Zoho, TrustedSite) | All external `<script>` tags have `integrity=` | 2h | — |
| M3-10 | Create `.github/dependabot.yml` for npm + GitHub Actions ecosystems | Dependabot creates first PR within 24 hours | 30m | — |
| M3-11 | Validate with securityheaders.com — document score | Screenshot archived, score recorded | 30m | M3-06 |
| M3-12 | Add CI step: validate no external `<script>` without `integrity` attribute | CI fails if SRI missing | 1h | M3-07 through M3-09 |

**Milestone 3 Exit Criteria:**
- [ ] CSP enforced with zero violations
- [ ] HSTS deployed
- [ ] SRI hashes on 100% of external scripts
- [ ] Dependabot configured
- [ ] securityheaders.com score documented (target: A or A+)

---

### Milestone 4: Performance & Monitoring (Week 5–6)

> Theme: Image optimization, Core Web Vitals, error tracking

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| M4-01 | Catalog all 197 images: format, size, dimensions, usage | Inventory table with optimization plan | 2h | — |
| M4-02 | Convert 7 large images (>100 KB) to WebP with JPEG fallback using `<picture>` | `<picture>` elements serve WebP; JPEG fallback works | 3h | M4-01 |
| M4-03 | Add `width` and `height` attributes to all `<img>` tags on index.html | Lighthouse CLS score ≤ 0.1 for index.html | 2h | — |
| M4-04 | Add `loading="lazy"` to all below-fold images on index.html | Native lazy loading active; verified in Network tab | 1h | — |
| M4-05 | Audit `lazysizes.min.js` usage — remove if native lazy loading suffices | Decision documented; file removed if unused | 1h | M4-04, M1-11 |
| M4-06 | Add `<link rel="preconnect">` for `ajax.googleapis.com`, `cdn.jsdelivr.net` | Resource hints present in `<head>` | 30m | — |
| M4-07 | Ensure `font-display: swap` in all `@font-face` declarations | No FOIT; text visible immediately | 30m | — |
| M4-08 | Run Lighthouse CI post-optimization, compare to M1-14 baseline | Performance delta documented | 1h | M4-02 through M4-07 |
| M4-09 | Set Lighthouse CI thresholds: Perf ≥ 85, A11y ≥ 90, SEO ≥ 90 | CI fails if scores drop below thresholds | 1h | M4-08 |
| M4-10 | Create React `ErrorBoundary` component in `react/src/components/ErrorBoundary.tsx` | Component catches render errors, shows fallback UI | 2h | — |
| M4-11 | Wrap all React entry points with `ErrorBoundary` | Simulated error → fallback UI shown, error logged to console | 2h | M4-10 |
| M4-12 | Add `window.onerror` + `window.onunhandledrejection` global handlers (consent-gated) | Errors captured; verify with deliberate `throw` | 1h | — |

**Milestone 4 Exit Criteria:**
- [ ] 7 largest images converted to WebP
- [ ] Lighthouse Performance ≥ 85 (up from baseline)
- [ ] Lighthouse CI thresholds enforced in CI
- [ ] ErrorBoundary deployed on all React mount points
- [ ] Global error handlers active (behind consent)

---

### Milestone 5: Stabilization & Documentation (Week 7–8)

> Theme: Close remaining items, update all docs to match ground truth

| ID | Task | Verify | Est. | Depends On |
|----|------|--------|------|------------|
| M5-01 | Delete `js/auto-year-update.js` file if all callers removed | File does not exist | 15m | M1-08 |
| M5-02 | Delete empty/dead extracted JS files if consolidation is complete | `ls js/*.js` count ≤ 7 | 15m | All M1/M2 |
| M5-03 | Update README.md: add React architecture section, correct deployment instructions | README reflects 17-bundle architecture | 1h | — |
| M5-04 | Update `.aicontext`: correct inline script count, security posture, hosting target | AI agents get accurate context | 1h | All milestones |
| M5-05 | Update `PRODUCTION_READINESS_SUMMARY.md`: actual security score, Lighthouse scores | Summary matches measured reality | 1h | M3-11, M4-08 |
| M5-06 | Update `SECURITY_CHECKLIST.md`: mark completed items, correct counts | Checklist matches actual state | 1h | M3 complete |
| M5-07 | Update `TESTING_PLAN.md`: add Phase 4 CI test descriptions and results | Testing plan covers all automated checks | 1h | All CI changes |
| M5-08 | Archive Phase 4 results in new `docs/PHASE_4_RESULTS.md` | Retrospective with before/after metrics | 2h | All milestones |
| M5-09 | Final Lighthouse CI run — record scores as Phase 4 exit metrics | Scores documented | 30m | All milestones |

**Milestone 5 Exit Criteria:**
- [ ] All documentation matches measured ground truth
- [ ] No claims in docs that cannot be independently verified
- [ ] Phase 4 metrics recorded for comparison with Phase 5

---

## 6. Build Validation — Success Criteria Per Module

### Automated Checks (CI Pipeline)

| Check | Tool | Threshold | Added In |
|-------|------|-----------|----------|
| ESLint (vanilla JS) | `npm run lint` | 0 errors | Existing |
| TypeScript type check | `tsc --noEmit` | 0 errors | Existing |
| React bundle build | `npm run build` | All 17 bundles compile | Existing |
| Bundle size budget | Custom script | Each bundle < 7 KB | Existing |
| npm audit (root + react) | `npm audit --audit-level=high` | 0 high/critical | Existing |
| **Inline script count** | `grep` + count | **≤ 15 executable** | **Milestone 1** |
| **Mount point parity** | `grep data-react` + diff | **EN = DE = FR** | **Milestone 1** |
| **Lighthouse scores** | `@lhci/cli` | **Perf ≥ 85, A11y ≥ 90, SEO ≥ 90** | **Milestone 4** |
| **SRI hash coverage** | `grep integrity=` | **100% external scripts** | **Milestone 3** |
| **jQuery version check** | `grep jquery` | **Single version** | **Milestone 1** |
| **IE shim check** | `grep html5shiv` | **0 matches** | **Milestone 1** |

### Manual Checks (Per Milestone)

| Check | Method | When |
|-------|--------|------|
| Navigation works on all pages | Browser test: hover, click, keyboard, mobile | After M2-06 |
| Consent banner appears for new sessions | Clear localStorage, reload | After M2-07 |
| DE/FR pages render correctly with React | Visual comparison EN vs DE vs FR | After M2-04 |
| CSP does not block legitimate resources | Browser console: zero CSP errors | After M3-06 |
| Images load correctly with WebP/fallback | Test in Chrome (WebP) and Safari <14 (JPEG) | After M4-02 |
| Error boundary shows fallback UI | Simulate React error in dev tools | After M4-11 |

---

## 7. QA Pipeline

### Pre-Release Checklist (Every Sprint Merge)

```
AUTOMATED (CI must pass):
├── npm run lint                    → 0 errors
├── npx tsc --noEmit                → 0 errors  
├── npm run build                   → 17 bundles compile
├── Bundle size check               → All < 7 KB
├── npm audit                       → 0 high/critical
├── Inline script count             → ≤ threshold
├── Mount parity check              → EN = DE = FR
├── jQuery version check            → Single version
├── IE shim check                   → 0 matches
├── SRI hash check                  → 100% coverage
└── Lighthouse CI                   → Scores ≥ thresholds

MANUAL (Developer verifies):
├── Open index.html in Chrome, Firefox, Safari
├── Test navigation (desktop hover, mobile tap, keyboard Tab/Enter/Escape)
├── Test consent banner (new session, accept, decline, persist)
├── Test DE and FR index pages (React mounts render)
├── Check browser console for errors (zero JS errors)
├── Check Network tab for failed requests (zero 4xx/5xx)
├── Verify security headers with curl -I
└── Test on mobile viewport (responsive layout, touch targets)
```

### Regression Test Matrix

| Page | Navigation | Consent | React Mounts | Forms | Images | i18n |
|------|-----------|---------|-------------|-------|--------|------|
| index.html | ✓ | ✓ | 14 mounts | Newsletter | Hero + products | hreflang |
| about.html | ✓ | ✓ | Header, Footer | — | Profile | — |
| contact.html | ✓ | ✓ | ContactForm | Contact form | — | — |
| products.html | ✓ | ✓ | ProductModal | — | Product grid | — |
| de/index.html | ✓ | ✓ | **14 mounts** (after fix) | — | — | hreflang |
| fr/index.html | ✓ | ✓ | **14 mounts** (after fix) | — | — | hreflang |
| legal/privacy.html | ✓ | ✓ | Header, Footer | — | — | — |

---

## 8. Security Review — Threat Model

### Attack Surface

| Vector | Current Exposure | Phase 4 Mitigation |
|--------|-----------------|-------------------|
| **XSS via inline scripts** | 61 executable inline scripts; no CSP | Extract to external files; deploy CSP without `unsafe-inline` |
| **Supply chain (CDN scripts)** | 9 external script domains; partial SRI | Add SRI hashes to 100% of external scripts |
| **Supply chain (npm)** | Dependencies audited in CI | Add Dependabot for continuous monitoring |
| **Clickjacking** | X-Frame-Options: DENY in .htaccess | Verify header is served by actual host |
| **MITM** | HTTPS enforced via .htaccess (if Apache) | Add HSTS header; verify on actual host |
| **Form injection** | Contact form submits to Zoho; basic validation | Client-side sanitization in React components |
| **Third-party trust seal** | `cdn.ywxi.net` loaded in about.html | Audit necessity; add SRI or remove |
| **Stale dependencies** | Bootstrap 3.x (EOL) | Defer to Phase 5; no known exploitable vulns in current usage |
| **Open redirect** | buffalo-horn-bowls.html JS redirect to Etsy | Convert to server-side redirect |

### Data Safety

| Data Type | Storage | Protection |
|-----------|---------|------------|
| Cookie consent preference | `localStorage['tme_cookie_consent_v1']` | Client-side only; no PII |
| Form submissions | Zoho third-party | HTTPS; Zoho security |
| Analytics data | GA/Yandex (consent-gated) | Not collected until opt-in |
| Error logs (Phase 4) | Console only (v1) | No PII in error messages |

### Access Control

| Resource | Current | Phase 4 |
|----------|---------|---------|
| GitHub repo | Authenticated contributors | No change |
| Firebase hosting | Deploy via GitHub Actions (service account) | No change |
| Production site | Public read-only | No change |
| Admin/CMS | None | None (Phase 5 evaluation) |

---

## 9. Milestone Roadmap (Visual)

```
Week 1          Week 2          Week 3          Week 4          Week 5          Week 6          Week 7-8
┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐   ┌───────────┐
│ MILESTONE 1│   │ MILESTONE 2│   │ MILESTONE 3│               │   │ MILESTONE 4│               │   │ MILESTONE 5│
│            │   │            │   │            │               │   │            │               │   │            │
│ Delete 5   │   │ Fix DE/FR  │   │ Create     │   │ CSP        │   │ Image      │   │ Lighthouse │   │ Docs       │
│ dead JS    │   │ parity     │   │ firebase   │   │ report →   │   │ optimization│  │ CI + error │   │ cleanup    │
│ files      │   │ (10 mounts)│   │ .json /    │   │ enforce    │   │ (WebP, lazy│   │ boundary   │   │ phase 4    │
│            │   │            │   │ headers    │   │            │   │ loading)   │   │ deploy     │   │ results    │
│ Fix jQuery │   │ Extract 53 │   │            │   │ SRI hashes │   │            │   │            │   │            │
│ version    │   │ inline     │   │ HSTS       │   │ all scripts│   │ Preconnect │   │ Global     │   │ Update     │
│            │   │ scripts    │   │            │   │            │   │ hints      │   │ error      │   │ README,    │
│ Remove IE  │   │            │   │ CSP report │   │ Dependabot │   │            │   │ handlers   │   │ aicontext  │
│ shims (13) │   │ hreflang   │   │ -only mode │   │ setup      │   │ font-      │   │            │   │            │
│            │   │ on 4 pages │   │            │   │            │   │ display    │   │            │   │            │
│ CI: inline │   │            │   │            │   │ Security   │   │            │   │            │   │ Final      │
│ count +    │   │ CI: parity │   │            │   │ headers    │   │            │   │ Lighthouse │   │ Lighthouse │
│ parity +   │   │ passes     │   │            │   │ score      │   │ Lighthouse │   │ thresholds │   │ run        │
│ Lighthouse │   │            │   │            │   │ documented │   │ comparison │   │ in CI      │   │            │
│ baseline   │   │            │   │            │   │            │   │            │   │            │   │            │
│            │   │            │   │            │   │            │   │            │   │            │   │            │
│ Hosting    │   │            │   │            │   │            │   │            │   │            │   │            │
│ target     │   │            │   │            │   │            │   │            │   │            │   │            │
│ resolved   │   │            │   │            │   │            │   │            │   │            │   │            │
└───────────┘   └───────────┘   └───────────┘   └───────────┘   └───────────┘   └───────────┘   └───────────┘
     15 tasks        13 tasks        12 tasks                         12 tasks                         9 tasks
```

---

## 10. Phase 5 Forward Look

Phase 5 planning begins after Milestone 5 retrospective. Current thinking:

| Initiative | Prerequisite from Phase 4 | Est. Scope |
|-----------|---------------------------|------------|
| Bootstrap 3 → 5 migration | All inline scripts extracted; IE shims removed | 4–6 weeks, 30+ files |
| Product search (SearchBar.tsx) | CI pipeline stable; mount parity proven | 1–2 weeks |
| Homepage redesign | Bootstrap 5 complete; images optimized | 2–3 weeks |
| GA4 migration | Privacy policy updated; consent hooks verified | 1 week |
| Headless CMS evaluation | Phase 4 docs up to date; architecture stable | Research only |

---

## Appendix: Ground Truth Measurement Commands

These commands reproduce the measurements in this document. Run from repo root.

```bash
# Executable inline scripts (excluding JSON-LD)
python3 -c "
import re, glob
count = 0
for f in glob.glob('**/*.html', recursive=True):
    with open(f) as fh:
        for m in re.finditer(r'<script([^>]*)>(.*?)</script>', fh.read(), re.DOTALL):
            if 'src=' not in m.group(1) and m.group(2).strip() and 'application/ld+json' not in m.group(1):
                count += 1
print(f'Executable inline scripts: {count}')
"

# Data-react mount parity
diff <(grep -o 'data-react=\"[^\"]*\"' index.html | sort) \
     <(grep -o 'data-react=\"[^\"]*\"' de/index.html | sort)

# jQuery version check
grep -roh 'jquery[/-][0-9.]*' *.html de/*.html fr/*.html legal/*.html | sort -u

# IE shim check
grep -rl 'html5shiv\|respond.min' *.html de/*.html fr/*.html legal/*.html

# SRI hash coverage
for f in *.html de/*.html fr/*.html legal/*.html; do
  external=$(grep -c 'src="https://' "$f" 2>/dev/null || echo 0)
  sri=$(grep -c 'integrity=' "$f" 2>/dev/null || echo 0)
  echo "$f: $sri/$external external scripts have SRI"
done

# Legacy JS callers
for js in js/forms.js js/main.js js/application.js js/npm.js js/utils.js; do
  echo "$(basename $js): $(grep -rl "$(basename $js)" *.html de/*.html fr/*.html legal/*.html 2>/dev/null | wc -l) callers"
done
```

---

*This document is grounded in measured codebase state, not prior documentation claims.*  
*Every number was verified by automated analysis of the actual repository.*  
*Last Measured: February 2026*
