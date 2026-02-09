# Phase 3 Implementation Plan - React Migration Final Phase

**Created:** February 2026  
**Status:** 📋 In Progress  
**Previous Phase:** [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) (Complete, October 2025)

**Related Documents:**
- [../react-refactoring.md](../react-refactoring.md) - Overall React migration strategy
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - Completed Phase 2 reference
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Production status
- [Testing Plan](TESTING_PLAN.md) - QA procedures
- [Design System](DESIGN_SYSTEM.md) - Styling specifications

---

## Overview

Phase 3 completes the React migration by converting remaining interactive components into modular bundles. This phase covers form enhancements, content interaction patterns (accordion, modal, lightbox), utility widgets, and accessibility features. Several components have already been built but require HTML integration and cross-language deployment.

## Current Progress

### ✅ Components Built (Pending Integration)

| Component | File | Bundle Size | Gzipped | Status |
|-----------|------|------------|---------|--------|
| Contact Form | `ContactForm.tsx` | 1.52 KB | 0.79 KB | Built, needs HTML integration |
| FAQ Accordion | `FAQAccordion.tsx` | 1.15 KB | 0.65 KB | Built, needs HTML integration |
| Product Modal | `ProductModal.tsx` | 4.49 KB | 1.86 KB | Built, partial HTML integration |
| Background | `Background.tsx` | 1.93 KB | 0.82 KB | Built, integrated in `index.html` |

### 📋 Components To Build

| Component | Bundle Name | Priority | Notes |
|-----------|-------------|----------|-------|
| Gallery Lightbox | `gallery.js` | Medium | Standalone image viewer; ProductModal has built-in lightbox |
| Testimonials | `testimonials.js` | Medium | Carousel or fade-in customer quotes |
| Search Bar | `search.js` | Low | Autocomplete product/page search |
| Cookie Settings | `cookie-settings.js` | High | Granular consent management panel |
| Accessibility Widget | `accessibility.js` | Medium | Font size, contrast, reduced-motion toggles |
| Scroll-to-Top | `scroll-top.js` | Low | Smooth-scroll back to top |

---

## Phase 3A: Integrate Existing Components

### Priority 1 — Contact Form

**Component:** `react/src/components/ContactForm.tsx`  
**Entry point:** `react/src/entries/contact-form.tsx`  
**Bundle:** `js/dist/contact-form.js` (1.52 KB)  
**Mount point:** `#contact-form[data-react="contact-form"]`

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

**Integration steps:**
1. Add `data-react="faq"` attribute to the FAQ section container in `faq.html`
2. Add `<script type="module" src="js/dist/faq.js" defer></script>` before `</body>`
3. Replicate to `/de/faq.html` and `/fr/faq.html`
4. Ensure static HTML FAQ items match React-rendered output for hydration
5. Test keyboard navigation and ARIA expand/collapse states

**Features:**
- Accessible accordion pattern (`aria-expanded`, `aria-controls`, `aria-hidden`)
- Only one item open at a time
- Uses `btn-crafts` and `toggle-crafts` design system classes
- 3 FAQ items (materials, shipping, custom designs)

### Priority 3 — Product Modal (Complete Integration)

**Component:** `react/src/components/ProductModal.tsx`  
**Entry point:** `react/src/entries/product-modal.tsx`  
**Bundle:** `js/dist/product-modal.js` (4.49 KB)  
**Mount point:** `.product-modal[data-react="product-modal"]`

**Current state:** Partially integrated in `index.html` (lines 272-276). Needs:
1. Verify product data source (`useProducts` hook, `products.json`)
2. Add integration to product-specific pages (`products.html`, `horn-crafts.html`, etc.)
3. Test lightbox gallery navigation (arrow keys, thumbnails)
4. Validate multi-language support (EN/DE/FR locale detection)
5. Test variant selection and image switching
6. Ensure modal overlay traps focus and Escape key closes

**Features:**
- Multi-language product names and descriptions
- Built-in lightbox gallery with keyboard navigation
- Product variant selection
- Responsive modal overlay with ARIA dialog role
- Data-driven from `products.json` via `useProducts` hook

---

## Phase 3B: New Components

### Cookie Settings Panel

**Priority:** High  
**Bundle target:** `cookie-settings.js` (< 3 KB)  
**Mount point:** `.cookie-settings[data-react="cookie-settings"]`

**Requirements:**
- Granular consent categories: Essential (always on), Analytics, Marketing
- Toggle switches for each category
- Save preferences to `localStorage['tme_cookie_consent_v1']`
- Integrate with existing `useConsent` hook and `js/consent.js`
- Link from footer privacy/cookie policy section
- Accessible toggle controls with labels

**Implementation approach:**
1. Create `react/src/components/CookieSettings.tsx`
2. Create `react/src/entries/cookie-settings.tsx`
3. Add entry to `react/vite.config.ts`
4. Bridge with `window.TheMoonExports.Consent` namespace
5. Add mount point in `legal/privacy.html` and footer area

### Gallery Lightbox

**Priority:** Medium  
**Bundle target:** `gallery.js` (< 3 KB)  
**Mount point:** `.gallery-lightbox[data-react="gallery"]`

**Requirements:**
- Standalone image gallery viewer (separate from ProductModal's built-in lightbox)
- Swipe navigation on touch devices
- Keyboard navigation (arrow keys, Escape to close)
- Zoom capability on click/pinch
- Thumbnails strip for quick navigation
- Lazy loading for off-screen images

**Note:** Evaluate whether ProductModal's lightbox is sufficient or if a standalone component is needed for non-product image galleries.

### Testimonials

**Priority:** Medium  
**Bundle target:** `testimonials.js` (< 3 KB)  
**Mount point:** `.testimonials[data-react="testimonials"]`

**Requirements:**
- Customer quote carousel or fade-in display
- Auto-advance with pause on hover
- Accessible carousel pattern with live region
- Star ratings (optional)
- Responsive layout for mobile/desktop

### Accessibility Widget

**Priority:** Medium  
**Bundle target:** `accessibility.js` (< 3 KB)  
**Mount point:** `.accessibility-widget[data-react="accessibility"]`

**Requirements:**
- Font size increase/decrease/reset controls
- High contrast mode toggle
- Reduced motion preference toggle
- Preferences persisted in `localStorage`
- Floating button to open/close panel
- Respects `prefers-reduced-motion` and `prefers-contrast` media queries

### Search Bar

**Priority:** Low  
**Bundle target:** `search.js` (< 3 KB)  
**Mount point:** `#search-bar[data-react="search"]`

**Requirements:**
- Client-side search across product pages
- Autocomplete suggestions from product data
- Accessible combobox pattern (`role="combobox"`, `aria-autocomplete`)
- Debounced input handling
- Results link to product pages

### Scroll-to-Top Button

**Priority:** Low  
**Bundle target:** `scroll-top.js` (< 1 KB)  
**Mount point:** `.scroll-top[data-react="scroll-top"]`

**Requirements:**
- Appears after scrolling past first viewport height
- Smooth scroll to top on click
- Accessible button with `aria-label`
- Fade-in/fade-out animation
- Respects `prefers-reduced-motion`

---

## Build Configuration

### Current Vite Entry Points (13 total)

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

  // Phase 3 (4 entries — existing)
  'contact-form': './src/entries/contact-form.tsx',
  faq: './src/entries/faq.tsx',
  'product-modal': './src/entries/product-modal.tsx',
  background: './src/entries/background.tsx',
}
```

### Phase 3 Entries To Add

```typescript
// Add to vite.config.ts as components are built:
'cookie-settings': './src/entries/cookie-settings.tsx',
gallery: './src/entries/gallery.tsx',
testimonials: './src/entries/testimonials.tsx',
accessibility: './src/entries/accessibility.tsx',
search: './src/entries/search.tsx',
'scroll-top': './src/entries/scroll-top.tsx',
```

---

## Bundle Size Budget

### All Phase Bundles (Current Build)

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
| 3 | background.js | 1.93 KB | 0.82 KB |
| 3 | product-modal.js | 4.49 KB | 1.86 KB |
| — | Shared chunks | 141.68 KB | 46.14 KB |

**Phase 1 Total:** 6.08 KB (2.50 KB gzipped)  
**Phase 2 Total:** 10.88 KB (5.09 KB gzipped)  
**Phase 3 Total (built so far):** 9.09 KB (4.12 KB gzipped)  
**Phase 3 Target (remaining):** ~12 KB (< 6 KB gzipped)

All individual bundles must remain under 7 KB. Target 1-3 KB per component.

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
- [ ] Contact Form integrated into `contact.html`
- [ ] Contact Form replicated to `/de/contact.html` and `/fr/contact.html`
- [ ] FAQ Accordion integrated into `faq.html`
- [ ] FAQ Accordion replicated to `/de/faq.html` and `/fr/faq.html`
- [ ] Product Modal fully integrated across product pages
- [ ] Background component verified on `index.html`

### Phase 3B: Build New Components
- [ ] Cookie Settings component created and integrated
- [ ] Gallery Lightbox component created (or decision to use ProductModal lightbox)
- [ ] Testimonials component created and integrated
- [ ] Accessibility Widget created and integrated
- [ ] Search Bar created and integrated
- [ ] Scroll-to-Top Button created and integrated

### Phase 3C: Quality Assurance
- [ ] All bundles under 7 KB target
- [ ] No console errors on page load
- [ ] All `data-react` mount points hydrate correctly
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile responsiveness verified
- [ ] Keyboard navigation works for all interactive components
- [ ] Screen reader testing (ARIA attributes correct)
- [ ] Consent gating verified for analytics-aware components
- [ ] Lighthouse audit shows no performance regression
- [ ] `/de/` and `/fr/` pages function identically to English

### Phase 3D: Documentation & Cleanup
- [ ] Bundle sizes documented with build output
- [ ] `react-refactoring.md` Phase 3 checklist updated
- [ ] `PRODUCTION_READINESS_SUMMARY.md` updated with Phase 3 status
- [ ] `TESTING_PLAN.md` updated with Phase 3 test items
- [ ] Legacy JS removed for migrated components (where safe)

---

## Architecture Alignment

This implementation follows the core principles from the project conventions:

✅ **Progressive Enhancement**: React hydrates existing HTML, never mounts to empty containers  
✅ **Schema Compatibility**: All components use existing `window.TheMoonExports.*` namespace  
✅ **Bundle Size Target**: All built bundles 1.15-4.49 KB (< 7 KB target)  
✅ **Consent Gating**: Analytics tracking via `useConsent()`/`useTracking()` respects consent  
✅ **Hydration Markers**: All `data-react="..."` attributes in place  
✅ **Static HTML First**: HTML remains crawlable, Bootstrap classes preserved  
✅ **No Breaking Changes**: Legacy `js/navigation.js` and `js/consent.js` unchanged  
✅ **TypeScript First**: All new components authored in `.tsx`  
✅ **No New jQuery**: Vanilla JS or React only  

---

## Recommended Implementation Order

1. **Cookie Settings** (High priority — privacy compliance)
2. **Contact Form integration** (High impact — direct user interaction)
3. **FAQ Accordion integration** (High impact — user information)
4. **Product Modal full integration** (Medium — enhance product browsing)
5. **Testimonials** (Medium — social proof)
6. **Accessibility Widget** (Medium — inclusive design)
7. **Scroll-to-Top** (Low — convenience)
8. **Search Bar** (Low — requires product data indexing)
9. **Gallery Lightbox** (Evaluate — may not be needed if ProductModal lightbox suffices)

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Bundle size creep | Performance regression | Enforce 7 KB per-component limit; monitor with build output |
| Hydration mismatch | Console errors, flickering | Match static HTML byte-for-byte before hydrating |
| Consent compliance gaps | Legal exposure | Gate all analytics behind `useConsent()`; audit quarterly |
| Multi-language drift | Inconsistent user experience | Use locale detection pattern from ProductModal; sync EN/DE/FR |
| Legacy JS conflicts | Runtime errors | Test interop via `window.TheMoonExports.*`; remove legacy only after React is stable |

---

## Files To Create (Phase 3B)

### Components
- `react/src/components/CookieSettings.tsx`
- `react/src/components/GalleryLightbox.tsx` (if needed)
- `react/src/components/Testimonials.tsx`
- `react/src/components/AccessibilityWidget.tsx`
- `react/src/components/SearchBar.tsx`
- `react/src/components/ScrollToTop.tsx`

### Entry Points
- `react/src/entries/cookie-settings.tsx`
- `react/src/entries/gallery.tsx` (if needed)
- `react/src/entries/testimonials.tsx`
- `react/src/entries/accessibility.tsx`
- `react/src/entries/search.tsx`
- `react/src/entries/scroll-top.tsx`

### Documentation
- `docs/PHASE_3_IMPLEMENTATION.md` (this file)

### Modified
- `react/vite.config.ts` (add new entry points as components are built)
- `index.html` (add mount points and script tags)
- `/de/index.html` (mirror EN changes)
- `/fr/index.html` (mirror EN changes)
- `contact.html`, `faq.html`, `products.html` (add React integration)
- `react/src/types/global.d.ts` (add new type declarations as needed)

---

## See Also

- [../react-refactoring.md](../react-refactoring.md) - Overall migration roadmap and TypeScript strategy
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - Completed Phase 2 reference
- [Modular Components](MODULAR_COMPONENTS.md) - Legacy component architecture
- [Production Readiness Summary](PRODUCTION_READINESS_SUMMARY.md) - Overall project status
- [Testing Plan](TESTING_PLAN.md) - QA procedures
- [Background Component](BACKGROUND_COMPONENT.md) - Background component reference

---

*Phase 3 Planning Date: February 2026*  
*Last Updated: February 2026*
