# Outstanding Work & Bugs

> **Audit Date:** 2026-03-14  
> **Methodology:** Automated codebase audit + cross-reference against existing documentation  
> **Scope:** Full repository — HTML, CSS, JS, React, localization, SEO, security, documentation accuracy

---

## Table of Contents

1. [Open Bugs from bugs.md](#1-open-bugs-from-bugsmd)
2. [Documentation vs Reality — Discrepancies](#2-documentation-vs-reality--discrepancies)
3. [Missing & Broken Assets](#3-missing--broken-assets)
4. [Security Issues](#4-security-issues)
5. [Accessibility Gaps](#5-accessibility-gaps)
6. [SEO & Internationalization Gaps](#6-seo--internationalization-gaps)
7. [Technical Debt](#7-technical-debt)
8. [Phase 4 Implementation Status](#8-phase-4-implementation-status)
9. [Dependency Vulnerabilities](#9-dependency-vulnerabilities)
10. [Outstanding Feature Work](#10-outstanding-feature-work)
11. [Recommended Priority Order](#11-recommended-priority-order)

---

## 1. Open Bugs from bugs.md

The main bug tracker (`bugs.md`) tracks **100 issues** total, with **41 fixed** and **59 open**. Below is the open bug summary grouped by severity.

### 🔴 Critical (1 open)

| # | Bug | File(s) | Details |
|---|-----|---------|---------|
| 10 | Dropdown menu not keyboard accessible on subpages | `contact.html`, `about.html` | jQuery `.hover()` only — no keyboard event handler for Tab/Enter to open submenu |

### 🟠 Major (11 open)

| # | Bug | File(s) | Details |
|---|-----|---------|---------|
| 1 | Language switcher hidden on mobile | `css/one.css` | `display: none` on viewports < 768 px — mobile users cannot switch language |
| 3 | French flag missing from contact & about pages | `contact.html`, `about.html` | Only German flag shown; French flag link absent |
| 20 | Product images use placeholder src with lazyload | `horn-crafts.html`, `about.html` | If lazysizes fails, users see blank forever |
| 35 | Tweet button loaded without consent check | `contact.html` | Twitter `widgets.js` loads without GDPR consent gate |
| 43 | Two different newsletter form implementations | `index.html` vs `about.html` | Drastically different UX between pages |
| 44 | Zoho form width hardcoded to 350 px | `about.html` | Causes overflow on mobile < 350 px |
| 61 | About page is single wall of text | `about.html` | No section breaks, images, or visual hierarchy |
| 69 | React ContactForm lacks loading/disabled state | `react/src/components/ContactForm.tsx` | Submit button not disabled during submission — allows duplicates |
| 74 | Multiple `<h1>` elements on about page | `about.html` | WCAG 1.3.1 violation |
| 83 | DE/FR pages missing updated footer | `de/index.html`, `fr/index.html` | Footer doesn't match updated EN `index.html` structure |
| 87 | Localized pages still load English consent.js | `de/index.html`, `fr/index.html` | Cookie consent strings in English — GDPR requires consent UI in user's language |

### 🟡 Minor (47 open)

<details>
<summary>Click to expand all 47 minor open bugs</summary>

| # | Bug | File(s) |
|---|-----|---------|
| 2 | Language flags lack descriptive alt text | `contact.html`, `about.html` |
| 4 | Dropdown toggle has dual interaction patterns | `index.html` |
| 5 | Navbar brand hover lift may obscure dropdown | `css/one.css` |
| 7 | Skip-to-content link only on index.html | Multiple pages |
| 8 | Blog link present on some pages but not others | `contact.html`, `about.html` |
| 9 | Hamburger icon bars lack visible color on dark bg | `css/one.css` |
| 14 | Carousel images lack responsive srcset | `index.html` |
| 15 | Carousel caption text unreadable on bright images | `index.html` |
| 22 | Modal images not responsive on small screens | `css/one.css` |
| 24 | Missing loading="lazy" on footer images | `contact.html` |
| 26 | `<article>` product cards lack structured metadata | `index.html` |
| 40 | External links not indicated (no icon/text) | `index.html`, `contact.html` |
| 41 | Footer `<address>` tag used inconsistently | `index.html` vs `contact.html` |
| 42 | Footer heading hierarchy jumps from `<h4>` | All pages |
| 45 | Zoho "Join Now" button gray-on-gray | `about.html` |
| 47 | Newsletter success message uses emoji | `index.html` |
| 52 | Cookie settings panel max-width too narrow | `css/crafts-ui.css` |
| 53 | Body font is generic sans-serif | `css/one.css` |
| 54 | Heading font is generic sans-serif | `css/one.css` |
| 55 | `!important` overrides scattered in CSS | `css/one.css` |
| 56 | Inconsistent text color across pages | `css/one.css` vs inline styles |
| 58 | Footer link color fails WCAG AA for body text | `css/one.css` |
| 59 | Copyright text color borderline WCAG AA | `css/one.css` |
| 60 | `.services h2` uses purple border inconsistent with brand | `css/one.css` |
| 62 | Max-width not set for content paragraphs | Multiple HTML files |
| 63 | `.frontblock.homeb` has fixed height | `css/one.css` |
| 65 | `.cf` container fixed height clips images | `css/one.css` |
| 67 | Masthead padding-top conflicts with header height | `css/one.css` |
| 70 | Newsletter form submits in new tab | `index.html` |
| 71 | Contact form Google iframe has no fallback | `contact.html` |
| 72 | Email validation regex too permissive | `index.html` |
| 73 | Form inputs lack visible labels | `index.html` |
| 76 | Images use `alt=""` inconsistently vs decorative | Multiple pages |
| 79 | Accessibility widget checkboxes lack labels | `AccessibilityWidget.tsx` |
| 81 | Error boundary div always in DOM | `index.html` |
| 84 | Localized pages missing `<link rel="canonical">` | `de/index.html`, `fr/index.html` |
| 85 | Localized pages missing OG/Twitter meta tags | `de/index.html`, `fr/index.html` |
| 86 | German page missing hreflang for French | `de/index.html` |
| 89 | jQuery version mismatch across pages | `index.html` vs `contact.html` |
| 90 | 14 React module scripts loaded individually | `index.html` |
| 91 | Google Translate script loaded without consent | `contact.html`, `about.html` |
| 92 | Carousel second image lazy but one swipe away | `index.html` |
| 93 | PayPal link uses inline `onclick` | `about.html`, `contact.html` |
| 94 | Inline `<style>` blocks in HTML body | `about.html`, `contact.html` |
| 95 | SRI hash mismatch on jQuery | `index.html` |
| 97 | AccessibilityWidget font-size changes not announced | `AccessibilityWidget.tsx` |
| 100 | No global React error boundary | All React entry points |

</details>

---

## 2. Documentation vs Reality — Discrepancies

Several documentation claims do not match the actual codebase state.

### 🔴 False: "Security headers implemented via Firebase"

| Document | Claim | Actual State |
|----------|-------|-------------|
| `docs/PRODUCTION_READINESS_SUMMARY.md` | "Firebase Configuration: Added comprehensive security headers" | **No `firebase.json` exists in the repository.** Security headers are partially implemented in `.htaccess` only. |
| `docs/PRODUCTION_READINESS_SUMMARY.md` | "CSP, HSTS, X-Frame-Options, X-XSS-Protection implemented" | **CSP is NOT deployed. HSTS is NOT deployed.** Only X-Frame-Options, X-XSS-Protection, X-Content-Type-Options, and Referrer-Policy exist in `.htaccess`. |

### 🟠 Misleading: "Security score 72%"

The claimed 72% security score cannot be independently verified since CSP and HSTS — two major security header categories — are absent. The actual security posture is likely lower than 72%.

### ⚠️ Outdated: Dead JS file inventory

| Document Claim | Actual State |
|---------------|-------------|
| 5 dead JS files at root: `forms.js`, `main.js`, `application.js`, `npm.js`, `utils.js` | These files **do not exist at root** `/js/`. They were already deleted. Legacy copies of `npm.js` and `application.js` remain in `de/js/`, `fr/js/`, and `instago/js/`. |

### ⚠️ Outdated: ".htaccess.new has pending changes"

`.htaccess` and `.htaccess.new` are byte-for-byte identical. The `.new` file is obsolete and should be deleted.

### ✅ Verified as accurate

| Claim | Status |
|-------|--------|
| DE/FR index pages have 14 React data-react mounts | ✅ Verified — all 14 mounts present |
| hreflang tags present on index.html, de/index.html, fr/index.html | ✅ Verified |
| IE shims removed from main pages (only in instago/ and backup/) | ✅ Verified |
| Phase 4 is 11.8% complete (10/85 items) | ✅ Verified |

---

## 3. Missing & Broken Assets

### Missing CSS Files

| File | Referenced By | Impact |
|------|-------------|--------|
| `de/css/crafts-ui.css` | `de/index.html` and other DE pages | 🔴 Broken styles on German pages — cookie settings, scroll-to-top, accessibility widget styles missing |
| `fr/css/crafts-ui.css` | `fr/index.html` and other FR pages | 🔴 Same — broken styles on French pages |

Root `css/crafts-ui.css` exists but the locale directories reference a locale-relative path that resolves to non-existent files.

### Missing Images

| File | Referenced By | Impact |
|------|-------------|--------|
| `images/privacy-policy.jpg` | `legal/index.html` | Lazy-loaded image will never appear |
| `images/terms-and-conditions.jpg` | `legal/index.html` | Lazy-loaded image will never appear |
| `images/imprint.jpg` | `legal/index.html` | Lazy-loaded image will never appear |

### Broken Script References

| Reference | Referenced By | Issue |
|-----------|-------------|-------|
| `ie8-responsive-file-warning.js` | 8+ product/legal pages | File does not exist — IE-era script never delivered |
| `ie-emulation-modes-warning.js` | 10+ pages | File does not exist — IE-era script never delivered |

### Obsolete Files

| File | Reason |
|------|--------|
| `.htaccess.new` | Identical to `.htaccess` — serves no purpose |
| `backup/about-horn-plates.htm` | Old product page backup — should not be in version control |
| `backup/Buffalo Horn Plates filtered_files/` | Old image exports — should not be in version control |
| `de/js/npm.js`, `de/js/application.js` | Legacy dead code — zero callers |
| `fr/js/npm.js`, `fr/js/application.js` | Legacy dead code — zero callers |
| `instago/js/npm.js`, `instago/js/application.js` | Legacy dead code — zero callers |

---

## 4. Security Issues

### Content Security Policy (CSP) — NOT DEPLOYED

No CSP header is served. The site has 61+ inline `<script>` blocks (including analytics loaders, jQuery dropdown hover handlers, Google Translate init, Zoho form hooks, and gtag conversion trackers) which must be extracted to external files before a strict CSP can be enforced.

### HSTS — NOT DEPLOYED

No `Strict-Transport-Security` header is configured. The `.htaccess` enforces HTTPS via redirect but does not set HSTS to prevent protocol downgrade attacks.

### Third-Party Script Risks

| Script | Location | Issue |
|--------|----------|-------|
| `cdn.ywxi.net` (memberfieo token) | `about.html` | Third-party trust seal — supply chain risk; no SRI hash |
| `platform.twitter.com/widgets.js` | `contact.html` | Loaded without consent gate — GDPR violation |
| `translate.google.com` | `contact.html`, `about.html` | Loaded without consent gate — may set cookies |
| jQuery 1.11.1 | `includes/footer.html`, `de/includes/footer.html`, `fr/includes/footer.html` | Extremely outdated jQuery version with known vulnerabilities |

### SRI (Subresource Integrity) Coverage — PARTIAL

Only a few external scripts have SRI hashes. Coverage should be 100% for all external CDN scripts.

### .htaccess on GitHub Pages

If the site is hosted on GitHub Pages (as indicated by the `CNAME` file), `.htaccess` is **completely ignored**. All security headers configured there have no effect. This needs to be resolved by either:
- Confirming the actual hosting platform
- Moving headers to the correct configuration mechanism

### `buffalo-horn-bowls.html` — Open Redirect via JavaScript

This page uses `location.replace()` to redirect to Etsy. This should be a server-side 302 redirect, not client-side JavaScript.

---

## 5. Accessibility Gaps

### Missing alt Attributes

**81 `<img>` tags** across the site lack `alt` attributes — a WCAG 2.1 Level A violation. Affected files include:

- `de/index.html`, `fr/index.html` — product category images
- `de/includes/header.html`, `fr/includes/header.html` — header images
- `de/includes/footer.html`, `fr/includes/footer.html` — footer images
- `legal/index.html`, `legal/privacy.html`, `legal/imprint.html`, `legal/terms.html`

### Missing Skip-to-Content Links

Only `index.html` has a skip-navigation link. All other pages (`about.html`, `contact.html`, `products.html`, `faq.html`, legal pages, DE/FR pages) lack this WCAG 2.1 requirement.

### Keyboard Accessibility

- **Bug #10** (🔴 Critical): Dropdown menu on `contact.html` and `about.html` cannot be operated with keyboard
- Accessibility widget checkboxes lack associated `<label>` elements (Bug #79)

### Color Contrast Issues

- Footer link color (`#B3B3B3` on `#333`) fails WCAG AA for body text (Bug #58)
- Copyright text color borderline WCAG AA (Bug #59)
- Zoho "Join Now" button gray-on-gray barely meets WCAG AA (Bug #45)

---

## 6. SEO & Internationalization Gaps

### hreflang Coverage — INCOMPLETE

Only **5 of 36** HTML pages have hreflang tags:

| Has hreflang | Missing hreflang |
|-------------|-----------------|
| `index.html` | `about.html`, `contact.html`, `products.html`, `faq.html` |
| `de/index.html` | `horn-crafts.html`, `horn-decor.html`, `wooden-crafts.html` |
| `fr/index.html` | `buffalo-horn-plates.html`, `resin.html` |
| `license.html` | All `legal/*` pages |
| `buffalo-horn-bowls.html` | `instago/index.html` |

### Sitemap Completeness

`sitemap.xml` lists **19 pages** but **36 HTML pages** exist. Notable omissions:
- `buffalo-horn-bowls.html` (product page, should be indexed)

### Localized Pages Missing Meta Tags

`de/index.html` and `fr/index.html` lack:
- `<link rel="canonical">` — potential duplicate content SEO issues (Bug #84)
- Open Graph / Twitter meta tags — poor social sharing previews (Bug #85)

### jQuery Version Inconsistency

Three different jQuery versions are loaded across the site:

| Version | Files |
|---------|-------|
| jQuery 3.7.1 | `index.html`, `products.html`, `de/index.html`, `fr/index.html`, `legal/*` |
| jQuery 1.11.1 | `includes/footer.html`, `de/includes/footer.html`, `fr/includes/footer.html` |
| `jquery-latest.min.js` | `legal/privacy.html`, `legal/index.html`, `legal/imprint.html`, `legal/terms.html` |

---

## 7. Technical Debt

### Duplicate Bootstrap Copies

Bootstrap JS and CSS are duplicated across locale directories:

| File | Copies |
|------|--------|
| `bootstrap.js` / `bootstrap.min.js` | 10 copies (root, de/, fr/, instago/, legal/) |
| `bootstrap.min.css` | 5 copies (root, de/, fr/, instago/, legal/) |

These should reference a single copy via absolute paths or CDN.

### IE-Era Legacy Code

| Item | Location | Status |
|------|----------|--------|
| html5shiv + respond.min.js | `instago/index.html` | Still present — IE8 polyfills no longer needed |
| IE emulation warning script references | 10+ HTML files | Script files don't exist — dead references |

### Dead JavaScript Files in Locale Directories

| File | Size | Callers |
|------|------|---------|
| `de/js/npm.js` | 484 B | 0 |
| `de/js/application.js` | 576 B | 0 |
| `fr/js/npm.js` | 484 B | 0 |
| `fr/js/application.js` | 576 B | 0 |
| `instago/js/npm.js` | 484 B | 0 |
| `instago/js/application.js` | 576 B | 0 |

### Inline Scripts — Extraction Needed

61+ executable inline `<script>` blocks across the site need extraction to external files for CSP deployment:

| Category | Count | Migration Target |
|----------|-------|-----------------|
| jQuery dropdown hover | ~15 | Delete — React Header.tsx handles this |
| Analytics/consent IIFE | ~16 | Extract → `js/analytics-loader.js` |
| Google Translate init | ~13 | Extract → `js/google-translate-init.js` |
| Zoho form hook | ~9 | Extract → `js/zoho-form-hook.js` |
| jQuery timer (legal) | ~4 | Extract or delete |
| gtag conversion | ~2 | Extract → `js/gtag-conversions.js` |
| memberfieo token | 1 | Audit — third-party trust seal |
| Etsy redirect | 1 | Convert to server-side 302 redirect |

### Backup Directory in Version Control

`backup/` contains 51+ KB of old product files and images that should not be in the repository. Consider adding to `.gitignore` and removing from tracking.

---

## 8. Phase 4 Implementation Status

Phase 4 ("Hardening & Operational Maturity") is **11.8% complete** (10/85 items done).

### Completed (10 items)

- [x] Audit legacy JS file callers
- [x] Remove `auto-year-update.js` from 9 product pages
- [x] Document remaining legacy files
- [x] Create GitHub Actions CI pipeline
- [x] Add TypeScript strict mode check to CI
- [x] Add bundle budget enforcement (7 KB limit)
- [x] Add npm audit to CI
- [x] Audit `/de/index.html` data-react attributes
- [x] Audit `/fr/index.html` data-react attributes
- [x] Add Phase 3 script tags to DE/FR pages

### Pending by Workstream

| Workstream | Done | Remaining | % |
|-----------|------|-----------|---|
| 1. Legacy JS Retirement | 2/8 | 6 | 25% |
| 2. CI/CD & Testing | 4/8 | 4 | 50% |
| 3. Performance Optimization | 0/7 | 7 | 0% |
| 4. Security Hardening | 0/11 | 11 | 0% |
| 5. i18n Parity | 2/3 | 1 | 67% |
| 6. Product Search | 0/8 | 8 | 0% |
| 7. Production Monitoring | 0/5 | 5 | 0% |

### Key Pending Milestones

**Milestone 1 (Week 1):** Delete dead JS files, fix jQuery version split, remove IE shims, establish CI baselines  
**Milestone 2 (Week 2):** Fix DE/FR pages, inline script extraction (61 → ≤ 20)  
**Milestone 3 (Weeks 3–4):** CSP enforcement, HSTS, SRI hashes, Dependabot  
**Milestone 4 (Weeks 5–6):** Image optimization, Lighthouse CI, error tracking  
**Milestone 5 (Weeks 7–8):** Documentation accuracy pass, Phase 4 exit metrics

---

## 9. Dependency Vulnerabilities

### Root `package.json` — 17 vulnerabilities

| Severity | Count | Notable Packages |
|----------|-------|-----------------|
| Critical | 1 | `basic-ftp` (path traversal) |
| High | 8 | `@hono/node-server`, `express-rate-limit`, `flatted`, `hono`, `minimatch` |
| Moderate | 1 | `ajv` (ReDoS) |
| Low | 7 | Various |

All are in dev dependencies (`firebase-tools`, `serve`). Fix available via `npm audit fix`.

### React `package.json` — 2 vulnerabilities

| Severity | Count | Package |
|----------|-------|---------|
| Moderate | 2 | `esbuild` / `vite` (dev server request forgery) |

Dev-only — affects development server, not production. Fix requires breaking change (`vite@8.0.0`).

### Deprecated Packages

- `eslint@8.57.1` — deprecated, migrate to ESLint 9
- `rimraf@3.0.2`, `glob@7.2.3` — deprecated upstream
- `whatwg-encoding@3.1.1` — deprecated

---

## 10. Outstanding Feature Work

### From react-refactoring.md — Phase 4 Workstreams

1. **Legacy JS Retirement** — Remove superseded vanilla JS files
2. **Automated CI/CD** — Lint → build → bundle-check pipeline (partially done)
3. **Performance Optimization** — WebP images, lazy loading, bundle analysis
4. **Security Hardening** — CSP, HSTS, inline script migration, SRI
5. **i18n Parity** — Full React integration in `/de/` and `/fr/` subpages
6. **Product Search** — Client-side search using `products.json`
7. **Production Monitoring** — Error boundaries, Core Web Vitals tracking

### From dropdown.md — Dropdown Redesign

- Extract dropdown into shared HTML include
- Define design tokens (colors, typography)
- Refactor to valid semantic markup (button or anchor, role="menu")
- CSS redesign with responsive behavior
- ESC-to-close, focus management, touch support
- Propagate to localized pages
- Testing and documentation

### From react-refactoring.md — Phase 5 (Future)

- Bootstrap 3 → 5 migration
- Homepage redesign
- Product experience (rich detail pages, filtering, wishlist)
- Content management (headless CMS evaluation)
- GA4 full migration
- PWA exploration
- Backend API (C backend)

---

## 11. Recommended Priority Order

Based on impact, risk, and effort, the recommended execution order:

### 🔴 Immediate (This Sprint)

1. **Fix missing CSS** — Copy or symlink `css/crafts-ui.css` to `de/css/` and `fr/css/` (5 min, zero risk)
2. **Delete obsolete files** — Remove `.htaccess.new`, dead JS in locale dirs (5 min, zero risk)
3. **Fix Bug #10** — Add keyboard accessibility to dropdown on `contact.html` / `about.html`
4. **Correct documentation discrepancies** — Update `PRODUCTION_READINESS_SUMMARY.md` to match reality (no Firebase, no CSP, no HSTS)

### 🟠 High Priority (Next 2 Sprints)

5. **Fix jQuery version split** — Standardize all pages to jQuery 3.7.1
6. **Remove IE shims** — Delete from `instago/index.html`
7. **Fix consent violations** — Gate Twitter widget and Google Translate behind consent
8. **Fix Bug #87** — Localize consent UI strings for DE/FR
9. **Extract inline scripts** — Begin consolidation (target: 61 → ≤ 20)
10. **Add missing alt attributes** — Address 81 images without alt text
11. **Run `npm audit fix`** — Resolve 17 root dependency vulnerabilities

### 🟡 Medium Priority (Phase 4 Milestones 3–4)

12. **Deploy CSP** — After inline scripts are extracted
13. **Deploy HSTS** — After confirming hosting platform
14. **Add SRI hashes** — To all external CDN scripts
15. **Add hreflang tags** — To all locale-variant pages
16. **Image optimization** — Convert largest images to WebP
17. **Lighthouse CI** — Establish baselines and enforcement thresholds
18. **Add skip-to-content links** — To all pages beyond index.html

### ⚪ Lower Priority (Phase 4 Milestone 5 / Phase 5)

19. **Resolve hosting question** — GitHub Pages vs Firebase vs Apache
20. **Product search implementation**
21. **Error boundary deployment**
22. **Bootstrap 5 migration planning**
23. **Clean up backup/ directory**
24. **Sitemap completeness**
25. **Resolve duplicate Bootstrap copies**

---

## Cross-Reference Index

| Topic | Primary Doc | Related Docs |
|-------|------------|-------------|
| Bug tracker | `bugs.md` | This document §1 |
| Phase 4 plan | `docs/NEXT_PHASE_DEVELOPMENT_PLAN.md` | `docs/PHASE_4_IMPLEMENTATION.md`, this document §8 |
| Security | `docs/SECURITY_CHECKLIST.md` | This document §4 |
| Testing | `docs/TESTING_PLAN.md` | `bugs.md` |
| React migration | `react-refactoring.md` | `docs/PHASE_3_IMPLEMENTATION.md`, `docs/MODULAR_COMPONENTS.md` |
| SEO | `docs/ENTERPRISE_SEO_IMPLEMENTATION.md` | This document §6 |
| Documentation discrepancies | This document §2 | `docs/PRODUCTION_READINESS_SUMMARY.md` |
