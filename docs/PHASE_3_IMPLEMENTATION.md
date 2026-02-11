# Phase 3 Implementation - React Migration Final Phase

**Created:** February 2026  
**Status:** ✅ Implementation Complete  
**Previous Phase:** [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) (Complete, October 2025)

**Related Documents:**
- [../react-refactoring.md](../react-refactoring.md) - Overall React migration strategy
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - Completed Phase 2 reference
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Production status
- [Testing Plan](TESTING_PLAN.md) - QA procedures
- [Design System](DESIGN_SYSTEM.md) - Styling specifications

---

## Overview

Phase 3 completes the React migration by converting remaining interactive components into modular bundles. This phase covers form enhancements, content interaction patterns (accordion, modal, lightbox), utility widgets, and accessibility features.

## Bundle Sizes (Production Build)

### Phase 3 Components

| Component | Bundle Size | Gzipped | Status |
|-----------|------------|---------|--------|
| `scroll-top.js` | 0.85 KB | 0.50 KB | ✅ Built & integrated |
| `faq.js` | 1.15 KB | 0.65 KB | ✅ Built & integrated |
| `contact-form.js` | 1.52 KB | 0.79 KB | ✅ Built & integrated |
| `testimonials.js` | 1.86 KB | 0.97 KB | ✅ Built & integrated |
| `background.js` | 1.93 KB | 0.82 KB | ✅ Built & integrated |
| `accessibility.js` | 2.39 KB | 0.92 KB | ✅ Built & integrated |
| `cookie-settings.js` | 2.71 KB | 1.01 KB | ✅ Built & integrated |
| `product-modal.js` | 4.49 KB | 1.86 KB | ✅ Built & integrated |

**Phase 3 Total:** ~16.90 KB uncompressed (~7.52 KB gzipped)

---

## Phase 3A: Integrated Existing Components

### ✅ Contact Form

**Component:** `react/src/components/ContactForm.tsx`  
**Entry point:** `react/src/entries/contact-form.tsx`  
**Bundle:** `js/dist/contact-form.js` (1.52 KB)  
**Mount point:** `#contact-form[data-react="contact-form"]`
**Integrated in:** `contact.html`

**Integration steps:**
1. Add `data-react="contact-form"` attribute to the contact form container in `contact.html`
2. Add `<script type="module" src="js/dist/contact-form.js" defer></script>` before `</body>`
3. Replicate to `/de/contact.html` and `/fr/contact.html`
4. Verify Zoho form action URL matches existing form
5. Test email validation, success/error states, and consent-aware tracking

**Features:**
- Email validation with regex
- Zoho CRM integration (form action POST)
- Consent-aware Google Analytics and Yandex Metrica tracking
- Accessible error/success alerts (`role="alert"`)
- Uses `input-crafts` and `btn-crafts` design system classes

### Priority 2 — FAQ Accordion

**Component:** `react/src/components/FAQAccordion.tsx`  
**Entry point:** `react/src/entries/faq.tsx`  
**Bundle:** `js/dist/faq.js` (1.15 KB)  
**Mount point:** `.faq-section[data-react="faq"]`
**Integrated in:** `faq.html`

**Features:**
- Accessible accordion pattern (`aria-expanded`, `aria-controls`, `aria-hidden`)
- Only one item open at a time
- Uses `btn-crafts` and `toggle-crafts` design system classes
- 3 FAQ items (materials, shipping, custom designs)

### ✅ Product Modal

**Component:** `react/src/components/ProductModal.tsx`  
**Entry point:** `react/src/entries/product-modal.tsx`  
**Bundle:** `js/dist/product-modal.js` (4.49 KB)  
**Mount point:** `.product-modal[data-react="product-modal"]`
**Integrated in:** `index.html`, `products.html`, `/de/index.html`, `/fr/index.html`

**Features:**
- Multi-language product names and descriptions
- Built-in lightbox gallery with keyboard navigation
- Product variant selection
- Responsive modal overlay with ARIA dialog role
- Data-driven from `products.json` via `useProducts` hook

---

## Phase 3B: New Components (Implemented)

### ✅ Cookie Settings Panel

**Component:** `react/src/components/CookieSettings.tsx`  
**Entry point:** `react/src/entries/cookie-settings.tsx`  
**Bundle:** `js/dist/cookie-settings.js` (2.71 KB)  
**Mount point:** `[data-react="cookie-settings"]`
**Integrated in:** `index.html`, `contact.html`, `faq.html`, `products.html`

**Features:**
- Granular consent categories: Essential (always on), Analytics, Marketing
- Checkbox toggles for each category
- Save preferences to `localStorage['tme_cookie_consent_v1']`
- Bridges with `window.TheMoonExports.Consent` namespace
- Accessible toggle controls with labels

### Gallery Lightbox

**Status:** Deferred — ProductModal's built-in lightbox provides gallery functionality with keyboard navigation, thumbnails, and image switching. A standalone gallery lightbox is not needed at this time.

### ✅ Testimonials

**Component:** `react/src/components/Testimonials.tsx`  
**Entry point:** `react/src/entries/testimonials.tsx`  
**Bundle:** `js/dist/testimonials.js` (1.86 KB)  
**Mount point:** `.testimonials[data-react="testimonials"]`
**Integrated in:** `index.html`

**Features:**
- Customer quote carousel with auto-advance (6s interval)
- Pause on hover
- Accessible carousel with `aria-live="polite"` region
- Navigation dots with tab role
- Respects `prefers-reduced-motion`
- 3 customer testimonials

### ✅ Accessibility Widget

**Component:** `react/src/components/AccessibilityWidget.tsx`  
**Entry point:** `react/src/entries/accessibility.tsx`  
**Bundle:** `js/dist/accessibility.js` (2.39 KB)  
**Mount point:** `[data-react="accessibility"]`
**Integrated in:** `index.html`, `contact.html`, `faq.html`, `products.html`

**Features:**
- Font size increase/decrease/reset controls (12-24px range)
- High contrast mode toggle (adds `high-contrast` class)
- Reduced motion preference toggle (adds `reduced-motion` class)
- Preferences persisted in `localStorage['tme_a11y_prefs']`
- Fixed-position floating button (bottom-left corner)
- Expandable panel with card-crafts styling

### Search Bar

**Status:** Deferred to future iteration — requires product data indexing infrastructure.

### ✅ Scroll-to-Top Button

**Component:** `react/src/components/ScrollToTop.tsx`  
**Entry point:** `react/src/entries/scroll-top.tsx`  
**Bundle:** `js/dist/scroll-top.js` (0.85 KB)  
**Mount point:** `[data-react="scroll-top"]`
**Integrated in:** `index.html`, `contact.html`, `faq.html`, `products.html`

**Features:**
- Appears after scrolling past first viewport height
- Smooth scroll to top on click
- Accessible button with `aria-label`
- Fixed position (bottom-right corner)
- Respects `prefers-reduced-motion`

---

## Build Configuration

### Vite Entry Points (17 total)

```typescript
// react/vite.config.ts
input: {
  // Phase 1 (3 entries)
  header: './src/entries/header.tsx',
  consent: './src/entries/consent.ts',
  newsletter: './src/entries/newsletter.tsx',

  // Phase 2 (6 entries)
  'language-switcher': './src/entries/language-switcher.tsx',
  carousel: './src/entries/carousel.tsx',
  'product-grid': './src/entries/product-grid.tsx',
  'social-links': './src/entries/social-links.tsx',
  'trust-badges': './src/entries/trust-badges.tsx',
  footer: './src/entries/footer.tsx',

  // Phase 3 (8 entries)
  'contact-form': './src/entries/contact-form.tsx',
  faq: './src/entries/faq.tsx',
  'product-modal': './src/entries/product-modal.tsx',
  background: './src/entries/background.tsx',
  'cookie-settings': './src/entries/cookie-settings.tsx',
  'scroll-top': './src/entries/scroll-top.tsx',
  accessibility: './src/entries/accessibility.tsx',
  testimonials: './src/entries/testimonials.tsx',
}
```

---

## Bundle Size Budget

### All Phase Bundles (Production Build)

| Phase | Component | Size | Gzipped |
|-------|-----------|------|---------|
| 1 | consent.js | 0.35 KB | 0.27 KB |
| 1 | newsletter.js | 2.27 KB | 1.02 KB |
| 1 | header.js | 3.46 KB | 1.21 KB |
| 2 | language-switcher.js | 0.99 KB | 0.58 KB |
| 2 | product-grid.js | 1.27 KB | 0.68 KB |
| 2 | social-links.js | 1.70 KB | 0.82 KB |
| 2 | trust-badges.js | 1.85 KB | 0.89 KB |
| 2 | carousel.js | 2.41 KB | 1.06 KB |
| 2 | footer.js | 2.66 KB | 1.06 KB |
| 3 | faq.js | 1.15 KB | 0.65 KB |
| 3 | contact-form.js | 1.52 KB | 0.79 KB |
| 3 | testimonials.js | 1.86 KB | 0.97 KB |
| 3 | background.js | 1.93 KB | 0.82 KB |
| 3 | accessibility.js | 2.39 KB | 0.92 KB |
| 3 | cookie-settings.js | 2.71 KB | 1.01 KB |
| 3 | product-modal.js | 4.49 KB | 1.86 KB |
| 3 | scroll-top.js | 0.85 KB | 0.50 KB |
| — | Shared chunks | 141.68 KB | 46.14 KB |

**Phase 1 Total:** 6.08 KB (2.50 KB gzipped)  
**Phase 2 Total:** 10.88 KB (5.09 KB gzipped)  
**Phase 3 Total:** 16.90 KB (7.52 KB gzipped)  
**All Components Total:** 33.86 KB (15.11 KB gzipped)

All individual bundles under 7 KB target. ✅

---

## HTML Integration Pattern

Each component follows the same integration pattern established in Phase 1 and 2:

### 1. Add Mount Point

```html
<!-- Add data-react attribute to existing HTML element -->
<section class="faq-section" data-react="faq">
  <!-- Existing static HTML content (crawlable) -->
</section>
```

### 2. Add Script Tag

```html
<!-- Before </body>, after other React bundles -->
<script type="module" src="js/dist/faq.js" defer></script>
```

### 3. Multi-Language Deployment

Replicate mount points and script tags to:
- `/de/` pages (German)
- `/fr/` pages (French)

### 4. Consent Integration

Components requiring analytics must use the `useConsent` or `useTracking` hooks:
```tsx
const { analytics } = useConsent();
if (analytics && window.ga) {
  window.ga('send', 'event', 'Category', 'action');
}
```

---

## Migration Checklist

### Phase 3A: Integrate Existing Components
- [x] Contact Form integrated into `contact.html`
- [x] FAQ Accordion integrated into `faq.html`
- [x] Product Modal integrated in `index.html`, `products.html`, `/de/index.html`, `/fr/index.html`
- [x] Background component integrated in `index.html`

### Phase 3B: Build New Components
- [x] Cookie Settings component created and integrated
- [x] Gallery Lightbox — deferred (ProductModal lightbox sufficient)
- [x] Testimonials component created and integrated
- [x] Accessibility Widget created and integrated
- [ ] Search Bar — deferred (requires product data indexing)
- [x] Scroll-to-Top Button created and integrated

### Phase 3C: Quality Assurance
- [x] All bundles under 7 KB target
- [ ] No console errors on page load
- [ ] All `data-react` mount points hydrate correctly
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation works for all interactive components
- [ ] Screen reader testing (ARIA attributes correct)
- [ ] Consent gating verified for analytics-aware components
- [ ] Lighthouse audit shows no performance regression

### Phase 3D: Documentation & Cleanup
- [x] Bundle sizes documented with build output
- [x] `react-refactoring.md` Phase 3 checklist updated
- [x] `TESTING_PLAN.md` updated with Phase 3 test items
- [ ] Legacy JS removed for migrated components (where safe)

---

## Architecture Alignment

This implementation follows the core principles from the project conventions:

✅ **Progressive Enhancement**: React hydrates existing HTML, never mounts to empty containers  
✅ **Schema Compatibility**: All components use existing `window.TheMoonExports.*` namespace  
✅ **Bundle Size Target**: All built bundles 0.85-4.49 KB (< 7 KB target)  
✅ **Consent Gating**: Analytics tracking via `useConsent()`/`useTracking()` respects consent  
✅ **Hydration Markers**: All `data-react="..."` attributes in place  
✅ **Static HTML First**: HTML remains crawlable, Bootstrap classes preserved  
✅ **No Breaking Changes**: Legacy `js/navigation.js` and `js/consent.js` unchanged  
✅ **TypeScript First**: All new components authored in `.tsx`  
✅ **No New jQuery**: Vanilla JS or React only  

---

## Files Created (Phase 3)

### Components
- `react/src/components/CookieSettings.tsx` ✅
- `react/src/components/Testimonials.tsx` ✅
- `react/src/components/AccessibilityWidget.tsx` ✅
- `react/src/components/ScrollToTop.tsx` ✅

### Entry Points
- `react/src/entries/cookie-settings.tsx` ✅
- `react/src/entries/testimonials.tsx` ✅
- `react/src/entries/accessibility.tsx` ✅
- `react/src/entries/scroll-top.tsx` ✅

### Modified
- `react/vite.config.ts` (added 4 new entry points, 17 total)
- `index.html` (added testimonials, cookie-settings, scroll-top, accessibility mount points and scripts)
- `contact.html` (added contact-form mount point and Phase 3 scripts)
- `faq.html` (added faq mount point and Phase 3 scripts)
- `products.html` (added Phase 3 utility widget scripts)
- `css/crafts-ui.css` (added styles for all Phase 3 components)
- `docs/PHASE_3_IMPLEMENTATION.md` (this file)

### Deferred
- Gallery Lightbox — ProductModal's built-in lightbox is sufficient
- Search Bar — requires product data indexing infrastructure

---

## See Also

- [../react-refactoring.md](../react-refactoring.md) - Overall migration roadmap and TypeScript strategy
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - Completed Phase 2 reference
- [Modular Components](MODULAR_COMPONENTS.md) - Legacy component architecture
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Overall project status
- [Testing Plan](TESTING_PLAN.md) - QA procedures
- [Background Component](BACKGROUND_COMPONENT.md) - Background component reference

---

*Phase 3 Implementation Date: February 2026*  
*Last Updated: February 2026*
