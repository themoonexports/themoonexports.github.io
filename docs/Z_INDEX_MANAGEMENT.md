# Z-Index Management System

**Last Updated:** November 1, 2025  
**Status:** ✅ Production Ready  
**Location:** `css/z-index.css`

## Overview

The z-index management system centralizes all visual stacking order definitions into a single, dedicated CSS module. This prevents overlapping issues and makes the visual hierarchy explicit and maintainable.

## Motivation

**Problems Solved:**
- **Overlapping Issues:** Header, carousel, and Google Translate widget were conflicting
- **Scattered Definitions:** z-index values spread across one.css made debugging difficult
- **Accidental Overwrites:** Monolithic CSS file changes could break stacking order
- **Maintainability:** No single source of truth for visual layering

## Architecture

### File Structure
```
css/
├── z-index.css          # Main z-index management system
de/css/
├── z-index.css          # @import from canonical
fr/css/
├── z-index.css          # @import from canonical
legal/css/
├── z-index.css          # @import from canonical
instago/css/
├── z-index.css          # @import from canonical
```

### CSS Load Order
```html
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/z-index.css" rel="stylesheet">      <!-- MUST load before one.css -->
<link href="css/one.css" rel="stylesheet">
<link href="css/dropdown-social.css" rel="stylesheet">
<link href="css/carousel.css" rel="stylesheet">
<link href="css/crafts-ui.css" rel="stylesheet">
```

**Critical:** `z-index.css` must load immediately after Bootstrap to establish the stacking context before any component styles.

## Z-Index Hierarchy

### CSS Variables
```css
:root {
  --z-background: 0;           /* Page background */
  --z-content: 1;              /* General content */
  --z-carousel: 1;             /* Carousel container */
  --z-carousel-caption: 10;    /* Carousel text overlays */
  --z-product-overlay: 999;    /* Product category overlays */
  --z-dropdown: 1000;          /* Dropdown menus */
  --z-header: 1030;            /* Fixed header/navbar */
  --z-modal: 1040;             /* Modal dialogs */
  --z-cookie-banner: 1050;     /* Cookie consent banner */
  --z-google-translate: 1050;  /* Google Translate widget */
  --z-tooltip: 1060;           /* Tooltips (future use) */
}
```

### Visual Stacking Order
```
┌─────────────────────────────────────┐
│ Tooltip (1060)                      │  ← Highest
├─────────────────────────────────────┤
│ Cookie Banner & Google Translate    │
│ (1050)                              │
├─────────────────────────────────────┤
│ Modals (1040)                       │
├─────────────────────────────────────┤
│ Header/Navbar (1030)                │
├─────────────────────────────────────┤
│ Dropdown Menus (1000)               │
├─────────────────────────────────────┤
│ Product Overlays (999)              │
├─────────────────────────────────────┤
│ Carousel Captions (10)              │
├─────────────────────────────────────┤
│ Carousel & Content (1)              │
├─────────────────────────────────────┤
│ Background (0)                      │  ← Lowest
└─────────────────────────────────────┘
```

## Applied Classes

### Navigation & Dropdowns
```css
.navbar-fixed-top,
.navbar-fixed-bottom {
  z-index: var(--z-header) !important;
}

.dropdown-menu {
  z-index: var(--z-dropdown) !important;
}
```

### Carousel System
```css
.carousel,
.carousel.slide {
  position: relative;
  z-index: var(--z-carousel);
}

.carousel-caption {
  z-index: var(--z-carousel-caption) !important;
}
```

### Modals & Overlays
```css
.modal,
.modal-backdrop,
.modal-overlay {
  z-index: var(--z-modal) !important;
}
```

### Cookie Consent
```css
.cookie-banner {
  z-index: var(--z-cookie-banner) !important;
}
```

### Google Translate
```css
#google_translate_element,
div#google_translate_element {
  z-index: var(--z-google-translate) !important;
}

.goog-te-banner-frame {
  z-index: var(--z-google-translate) !important;
}
```

### Product Overlays
```css
.productcat .cattitle {
  z-index: var(--z-product-overlay) !important;
}
```

## React Component Integration

### ProductModal Component
**File:** `react/src/components/ProductModal.tsx`

Uses `.modal-overlay` class which is managed by `z-index.css`:
```tsx
<div className="modal-overlay" role="dialog" aria-modal="true">
  <div className="modal-content card-crafts">
    {/* Modal content */}
  </div>
</div>
```

**Z-Index Applied:** `var(--z-modal)` (1040)

### Header Component
**File:** `react/src/components/Header.tsx`

Uses `.navbar-fixed-top` class which is managed by `z-index.css`:
```tsx
<nav className="navbar navbar-default navbar-fixed-top" id="nav-main">
  {/* Navigation content */}
</nav>
```

**Z-Index Applied:** `var(--z-header)` (1030)

### Pattern: CSS Classes Over Inline Styles
All React components rely on CSS classes for z-index management rather than inline styles. This ensures:
- **Consistency:** All components use the same stacking order
- **Maintainability:** Update z-index.css once, affects all components
- **Debugging:** Easy to trace z-index issues to single source

## Migration Notes

### Before (Scattered Definitions)
```css
/* In one.css - line 85 */
.dropdown-menu {
  z-index: 1000;
}

/* In one.css - line 340 */
.cookie-banner {
  z-index: 1050;
}

/* In one.css - line 1010 */
.carousel-caption {
  z-index: 10;
}

/* In one.css - line 1513 */
.modal-overlay {
  z-index: 1050;
}
```

### After (Centralized Management)
```css
/* In z-index.css */
:root {
  --z-dropdown: 1000;
  --z-cookie-banner: 1050;
  --z-carousel-caption: 10;
  --z-modal: 1040;
}

.dropdown-menu { z-index: var(--z-dropdown) !important; }
.cookie-banner { z-index: var(--z-cookie-banner) !important; }
.carousel-caption { z-index: var(--z-carousel-caption) !important; }
.modal-overlay { z-index: var(--z-modal) !important; }
```

### Changes in one.css
Removed hardcoded z-index values and replaced with comments:
```css
/* Before */
.dropdown-menu {
  position: absolute;
  z-index: 1000;
  /* ... */
}

/* After */
.dropdown-menu {
  position: absolute;
  /* z-index managed by z-index.css */
  /* ... */
}
```

## Usage Guidelines

### ✅ DO
- **Always load z-index.css before one.css**
- **Use CSS variables:** `z-index: var(--z-header);`
- **Add new layers to z-index.css:** Keep all z-index definitions centralized
- **Use !important:** Ensures z-index isn't accidentally overridden
- **Document changes:** Update this file when adding new z-index values

### ❌ DON'T
- **Never add z-index to one.css or component CSS:** Always use z-index.css
- **Don't use inline styles for z-index:** Use CSS classes
- **Don't skip loading z-index.css:** Visual stacking will break
- **Don't create arbitrary z-index values:** Use the established hierarchy

### Adding New Z-Index Layers

1. **Identify the need:** What component needs layering?
2. **Choose appropriate layer:** Where does it fit in the hierarchy?
3. **Add CSS variable to :root:**
   ```css
   :root {
     --z-new-component: 500;
   }
   ```
4. **Apply to component:**
   ```css
   .new-component {
     z-index: var(--z-new-component) !important;
   }
   ```
5. **Update documentation:** Add entry to this file
6. **Test across pages:** Verify no overlapping issues

## Debugging Z-Index Issues

### Browser DevTools Inspection
```javascript
// In browser console - list all elements with z-index
Array.from(document.querySelectorAll('*'))
  .filter(el => window.getComputedStyle(el).zIndex !== 'auto')
  .map(el => ({
    element: el,
    zIndex: window.getComputedStyle(el).zIndex,
    position: window.getComputedStyle(el).position
  }))
  .sort((a, b) => parseInt(b.zIndex) - parseInt(a.zIndex))
  .forEach(item => console.log(item));
```

### Common Issues
1. **Element not showing above another:**
   - Check if element has `position: relative/absolute/fixed`
   - Verify z-index.css is loaded
   - Inspect computed z-index in DevTools

2. **Modal behind header:**
   - Ensure `.modal-overlay` has higher z-index than `.navbar-fixed-top`
   - Check if parent has lower z-index (creates stacking context)

3. **Dropdown behind carousel:**
   - Verify `.dropdown-menu` (1000) > `.carousel` (1)
   - Check if carousel has unnecessary high z-index

## Testing Checklist

After modifying z-index.css:

- [ ] Header stays above carousel when scrolling
- [ ] Dropdown menus appear above all content
- [ ] Modals appear above header
- [ ] Cookie banner visible above all content
- [ ] Google Translate widget doesn't overlap header
- [ ] Carousel captions visible above carousel images
- [ ] Product overlays visible on hover
- [ ] No console errors on page load
- [ ] Works across all locales (en, de, fr)
- [ ] Mobile responsive (test on <768px)

## Browser Compatibility

**Supported:** All modern browsers (Chrome, Firefox, Safari, Edge)  
**CSS Variables:** IE11+ (with PostCSS fallback if needed)  
**Position Fixed:** All browsers

## Performance Impact

**Load Time:** Negligible (~1KB file, loads early in cascade)  
**Render Performance:** No impact (z-index is GPU-accelerated)  
**Paint Layers:** Optimized with `will-change` where needed

## Related Documentation

- [DIRECTORY_STRUCTURE.md](./DIRECTORY_STRUCTURE.md) - CSS architecture overview
- [PRODUCTION_READINESS_SUMMARY.md](./PRODUCTION_READINESS_SUMMARY.md) - Production checklist
- [TESTING_PLAN.md](./TESTING_PLAN.md) - QA testing procedures

## Changelog

### 2025-11-01 - Initial Implementation
- Extracted z-index management from one.css
- Created dedicated z-index.css module
- Added locale variants via @import
- Updated all HTML files with new load order
- Integrated with React components (ProductModal, Header)
- Fixed overlapping issues: header/carousel/google-translate
- Added comprehensive CSS variable system
- Documented stacking hierarchy

---

**Maintainer:** The Moon Exports Development Team  
**Questions:** Refer to [.aicontext](../.aicontext) for architectural guidance
