# React Refactoring Plan

## Objectives
- Introduce a progressive React layer without blocking current GitHub Pages hosting.
- Reuse existing vanilla JS utilities (`js/utils.js`, `js/navigation.js`, `js/forms.js`, `js/consent.js`) where practical.
- Preserve current SEO-critical markup (`index.html`, structured data, meta tags) and load order.
- Maintain zero-build option during migration; add React build only for pages that opt in.

## Migration Strategy
1. **Assess Existing Modules**
   - Catalogue reusable logic: navigation dropdown, newsletter validation, analytics consent, auto year update.
   - Tag DOM anchors in current HTML to ease hydration (e.g., `<div data-react-root="header">`).

2. **Bootstrapping React**
   - Add lightweight bundler (Vite) in a parallel `react/` directory; ensure output is plain ES modules placed under `js/dist/`.
   - Configure build to emit legacy-friendly bundles (ES2017) for current browsers, with separate chunks per component.
   - Include React runtime via CDN fallback to avoid blocking if bundle fails.

3. **Component Conversion Phases**
   - Phase 1: Header/navigation (`masthead`), newsletter form, cookie banner. Each component hydrates into existing markup.
   - Phase 2: Carousel and product category grid, reusing image assets and Bootstrap classes.
   - Phase 3: Footer and trust badges, ensuring analytics scripts remain deferred through consent API.

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
