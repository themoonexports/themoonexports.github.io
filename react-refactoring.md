# React Refactoring Plan

## Objectives
- **Primary Goal**: Keep bundles small and modular (3-7KB per component) to maintain fast page loads
- Introduce a progressive React layer without blocking current GitHub Pages hosting
- Reuse existing vanilla JS utilities (`js/utils.js`, `js/navigation.js`, `js/forms.js`, `js/consent.js`) where practical
- Preserve current SEO-critical markup (`index.html`, structured data, meta tags) and load order
- Maintain zero-build option during migration; add React build only for pages that opt in

## ✅ Phase 1 Complete (October 2025)

### Delivered Bundles
- ✅ **header.js** (3.3KB) - Navigation with dropdown/keyboard/a11y
- ✅ **newsletter.js** (2.2KB) - Newsletter form with Zoho integration  
- ✅ **consent.js** (6.6KB) - useConsent hook for analytics gating
- ✅ **chunks/client.js** (135KB) - Shared React runtime (cached across bundles)

### Achievements
- Zero hydration errors - components match existing HTML perfectly
- Legacy JS bridge functional - `window.TheMoonExports.*` namespace works
- Backward compatible - site works without React bundles
- Documentation updated - copilot-instructions.md, PRODUCTION_READINESS_SUMMARY.md
- Type-safe - TypeScript catches errors before runtime

### Key Learnings
- Components must NOT include wrapper elements (hydration into existing containers)
- `data-react="identifier"` on mount points, not on component return values
- Shared React runtime amortizes cost across multiple small bundles
- Module `defer` loading prevents blocking initial render

---

## Migration Strategy
1. **Assess Existing Modules**
   - Catalogue reusable logic: navigation dropdown, newsletter validation, analytics consent, auto year update.
   - Tag DOM anchors in current HTML to ease hydration (e.g., `<div data-react-root="header">`).

2. **Bootstrapping React**
   - Add lightweight bundler (Vite) in a parallel `react/` directory; ensure output is plain ES modules placed under `js/dist/`.
   - Configure build to emit legacy-friendly bundles (ES2017) for current browsers, with separate chunks per component.
   - Include React runtime via CDN fallback to avoid blocking if bundle fails.

3. **Component Conversion Phases**
   - ✅ **Phase 1 (Complete)**: Header/navigation, newsletter form, consent hook
   - ✅ **Phase 2 (Complete, Oct 2025)**: Footer, carousel, product grid, trust badges, language switcher, social media icons, auto-year update
   - ✅ **Phase 3 (Complete, Feb 2026)**: Contact form, FAQ accordion, product modal, background, cookie settings, testimonials, accessibility widget, scroll-to-top button
   - 🚀 **Phase 4 (In Progress)**: Legacy JS retirement, CI/CD pipeline, performance optimization, security hardening, i18n parity, product search, production monitoring

4. **Integration with Existing JS**
   - Export legacy utilities as modules (ES exports) while keeping UMD-style global for non-React pages.
   - Within React components, import helpers via `import { initDropdown } from '../js/navigation.js';` after wrapping file with dual export pattern.
   - Use React effects to call existing initialization (e.g., `useEffect(() => initDropdown(), []);`).

5. **Routing & Multi-language**
   - Keep current multi-page structure; embed React on each page independently.
   - Future option: introduce client-side navigation for product gallery using React Router only if needed.

6. **Performance & SEO Considerations**
   - Ensure server-rendered HTML remains unchanged so crawlers receive identical markup.
   - Defer React bundles with `<script type="module" defer>` to keep load order optimized.
   - Run Lighthouse after each phase to confirm no regression in performance or core web vitals.

7. **Testing & Rollout**
   - Add integration checks to `TESTING_PLAN.md`: banner hydration, dropdown accessibility, consent gating.
   - Deploy components incrementally behind data attributes; fallback to vanilla JS when React not present.
   - Document rollout steps in `PRODUCTION_READINESS_SUMMARY.md` once stable.

## TypeScript Adoption Plan
- Stand up the React workspace with TypeScript-first tooling (Vite + `tsconfig.json`); author new components as `.tsx`.
- Promote reusable utilities (`js/navigation.js`, `js/forms.js`, `js/utils.js`, `js/consent.js`) to dual-export modules that ship type definitions (`.d.ts`) for React consumers while preserving the global API for legacy pages.
- Define shared interfaces (`ConsentState`, `DropdownConfig`, `NewsletterFormState`) inside a `react/src/types/` folder to keep React components and vanilla scripts aligned.
- Extend the bundler to emit declaration files so future React packages can be consumed by other tooling without additional typing work.
- Gate any data-heavy transforms (e.g., product listings, localization tables) behind typed models to avoid runtime regressions as React layers in dynamic behavior.

## Next Steps
- See [docs/PHASE_4_IMPLEMENTATION.md](docs/PHASE_4_IMPLEMENTATION.md) for the Phase 4 plan (hardening & operational maturity)

---

## ✅ Phase 2 Complete (October 2025)

### Delivered Bundles
- **footer.js** (2.66KB) - Footer navigation, contact info, auto-year
- **carousel.js** (2.40KB) - Hero image slider with auto-advance
- **product-grid.js** (1.25KB) - Product category cards (Horn/Wood/Resin)
- **trust-badges.js** (1.84KB) - Trust badge, company logo, PayPal secure
- **language-switcher.js** (0.99KB) - DE/FR flags in header
- **social-links.js** (1.70KB) - Social media icons with consent-aware tracking
- **auto-year update** - Now handled in Footer React component

**Total Phase 2 Bundles:** ~10.84KB (all 6 bundles combined)

### Integration
- All components hydrate into existing HTML using `data-react` attributes
- Bundles loaded via `<script type="module" defer>` in `index.html`
- Consent-aware analytics via `useTracking` hook
- TypeScript types for analytics APIs

### Achievements
- All bundles under 3KB (target: 7KB)
- No hydration errors; progressive enhancement preserved
- Legacy JS bridge (`window.TheMoonExports.*`) maintained
- Documentation updated; bundle sizes tracked

---

## ✅ Phase 3 Complete (February 2026)

### Objectives
- Migrate remaining interactive/static components to modular React bundles (3-7KB each)
- Maintain progressive enhancement and crawlable HTML
- Integrate with legacy JS utilities and consent gating

### Target Components & Bundles
| Component                | Mount Point (suggested)         | Bundle Name         | Notes                        |
|--------------------------|---------------------------------|---------------------|------------------------------|
| Contact Form             | `#contact-form`                 | contact-form.js     | Validation, Zoho integration |
| FAQ Accordion            | `.faq-section`                  | faq.js              | Expand/collapse Q&A          |
| Product Modal            | `.product-modal`                | product-modal.js    | Details, images, add-to-cart |
| Gallery Lightbox         | `.gallery-lightbox`             | gallery.js          | Image zoom, swipe nav        |
| Testimonials             | `.testimonials`                 | testimonials.js     | Carousel or fade-in quotes   |
| Search Bar               | `#search-bar`                   | search.js           | Autocomplete, submit         |
| Cookie Settings          | `.cookie-settings`              | cookie-settings.js  | Consent management           |
| Accessibility Widget     | `.accessibility-widget`         | accessibility.js    | Font size, contrast toggles  |
| Scroll-to-Top Button     | `.scroll-top`                   | scroll-top.js       | Smooth scroll                |

### Migration Steps
1. **Design React Component**: Match static HTML byte-for-byte for hydration.
2. **Create Entry Point**: Add to `react/src/entries/` and update `vite.config.ts`.
3. **Implement Bridge**: Expose any new helpers under `window.TheMoonExports.*` and declare in `global.d.ts`.
4. **Integrate in HTML**: Add `data-react` attributes and `<script type="module">` tags.
5. **Consent/Tracking**: Use `useConsent` and `useTracking` hooks for analytics/privacy.
6. **Test**: Manual QA per `docs/TESTING_PLAN.md` (cross-browser, accessibility, consent).
7. **Document**: Update `docs/PHASE_3_IMPLEMENTATION.md` with bundle sizes and integration notes.

### Quality & Conventions
- Preserve crawlable HTML, Bootstrap classes, ARIA roles
- No blank containers; hydrate only
- No new jQuery; vanilla or React only
- All analytics behind consent gating
- Mirror changes to `/de/` and `/fr/` as needed

### Phase 3 Progress Checklist
- [x] Contact Form — React bundle built (1.52 KB), integrated in contact.html
- [x] FAQ Accordion — React bundle built (1.15 KB), integrated in faq.html
- [x] Product Modal — React bundle built (4.49 KB), integrated in index.html, products.html
- [x] Background — React bundle built (1.93 KB), integrated in index.html
- [x] Cookie Settings — React bundle built (2.71 KB), integrated across all pages
- [x] Testimonials — React bundle built (1.86 KB), integrated in index.html
- [x] Accessibility Widget — React bundle built (2.39 KB), integrated across all pages
- [x] Scroll-to-Top Button — React bundle built (0.85 KB), integrated across all pages
- [ ] Gallery Lightbox — deferred (ProductModal lightbox sufficient)
- [ ] Search Bar — deferred (requires product data indexing)

---

## Phase 3 Implementation Steps (Complete)
1. ✅ Integrated Contact Form and FAQ Accordion into HTML pages
2. ✅ Built Cookie Settings component (privacy compliance)
3. ✅ Completed Product Modal integration across product pages
4. ✅ Built remaining components: Testimonials, Accessibility Widget, Scroll-to-Top
5. ✅ Evaluated Gallery Lightbox — deferred (ProductModal lightbox sufficient)
6. ✅ Updated Vite config (17 entry points total)
7. ✅ Replicated integration to product pages
8. ✅ Full documentation in [docs/PHASE_3_IMPLEMENTATION.md](docs/PHASE_3_IMPLEMENTATION.md)

---

## 📋 Phase 4: Hardening & Operational Maturity (In Progress)

With all interactive components migrated to React (Phases 1–3, 17 bundles, ~33.9 KB total), Phase 4 shifts focus from feature delivery to hardening, automation, and long-term maintainability.

### Workstreams

| # | Workstream | Priority | Key Deliverables |
|---|-----------|----------|------------------|
| 1 | Legacy JS Retirement | High | Remove superseded vanilla JS files, reduce dual-maintenance |
| 2 | Automated CI/CD | High | Lint → build → bundle-check pipeline on every PR |
| 3 | Performance Optimization | Medium | Image optimization (WebP), lazy loading, bundle analysis |
| 4 | Security Hardening | High | CSP refinement, inline script migration, Bootstrap 5 plan |
| 5 | i18n Parity | Medium | Full React integration in `/de/` and `/fr/` pages |
| 6 | Product Search | Low | Client-side search using `products.json` (deferred from Phase 3) |
| 7 | Production Monitoring | Medium | Error boundaries, Core Web Vitals tracking, uptime alerts |

### Sprint Sequencing (5 Sprints, ~10 Weeks)
- **Sprint 1** (Weeks 1–2): Legacy JS audit, CI foundation, i18n parity audit
- **Sprint 2** (Weeks 3–4): Inline script migration, CSP refinement, dependency security
- **Sprint 3** (Weeks 5–6): Image optimization, bundle analysis, Lighthouse CI
- **Sprint 4** (Weeks 7–8): Product search, error tracking, analytics evaluation
- **Sprint 5** (Weeks 9–10): Final cleanup, documentation, Phase 5 preparation

### Success Targets
- Security score: 72% → 90%+
- Lighthouse Performance: 90+
- Legacy JS files: 12 → ≤ 6
- Inline scripts: 61 executable → ≤ 15
- Automated CI: Build + lint + bundle budget enforced

### Details
- See [docs/PHASE_4_IMPLEMENTATION.md](docs/PHASE_4_IMPLEMENTATION.md) for full workstream breakdown and checklists
- See [docs/NEXT_PHASE_DEVELOPMENT_PLAN.md](docs/NEXT_PHASE_DEVELOPMENT_PLAN.md) for detailed sprint execution plan, risk register, and metrics

---

## 🔮 Phase 5: Unified Stack Migration (Target: Q3–Q4 2026)

With hardening complete, Phase 5 supersedes the original Bootstrap 5 / CMS plan with a full-stack migration to **Laravel + React + Inertia.js + Tailwind CSS + Vite**, complemented by a **Python AI microservice** for product recommendations and search.

### Key Initiatives

| # | Initiative | Priority | Description |
|---|-----------|----------|-------------|
| 1 | Laravel + Inertia.js Backend | High | Server-side routing, controllers, Eloquent ORM, i18n, form handling |
| 2 | Tailwind CSS Migration | High | Replace Bootstrap 3.3.x with utility-first Tailwind CSS |
| 3 | Database-Driven Products | High | Migrate products.json to MySQL/PostgreSQL with admin panel |
| 4 | Python AI Service | Medium | Product recommendations, semantic search, image analysis |
| 5 | Unified i18n | Medium | Laravel localization replaces manual EN/DE/FR file duplication |
| 6 | Full-Text Search | Medium | Meilisearch integration replacing deferred client-side search |

### Prerequisites (from Phase 4)
- ✅ Legacy JS cleanup complete (≤ 6 files)
- ✅ CSP hardening in place (no `unsafe-inline`)
- ✅ Performance baseline established (Lighthouse CI)
- ✅ Error tracking deployed
- ✅ Image optimization complete

### Details
See [docs/UNIFIED_STACK_MIGRATION_PLAN.md](docs/UNIFIED_STACK_MIGRATION_PLAN.md) for the comprehensive migration plan including architecture, phase breakdown, component mapping, AI service design, and timeline.
