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
   - 🔄 **Phase 2 (Next)**: Footer, carousel, product grid, trust badges
   - 📋 **Phase 3 (Future)**: Contact form, language switcher, social media icons, auto-year update

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
- Set up `react/` workspace with Vite, React 18, and a baseline `tsconfig.json`.
- Refactor `js/navigation.js` and `js/forms.js` to support both CommonJS-style globals and ES module exports, adding `.d.ts` definitions.
- Implement React `Header` component in TypeScript, reuse existing markup and styles, and mount it on `index.html` for pilot testing.
