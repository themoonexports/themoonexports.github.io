# Dropdown Revamp Plan

## Purpose
Guide a redesign of the primary navigation dropdown (modular) so it communicates The Moon Exports craft aesthetic, improves usability/accessibility, and remains maintainable across localized variants of the site.

---

## Current State (Oct 31, 2025)
- **Markup** (`index.html`, similar duplicates in `de/index.html`, `fr/index.html`, `instago/index.html`, `legal/index.html`):
  ```html
  <li class="dropdown">
      <a href="products.html" class="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded="false">
          Handicrafts<span class="caret"></span>
      </a>
      <ul class="dropdown-menu">
          <a href="products.html"><img class="hidden-xs lazyload" src="images/dropdown.jpg"/></a>
          <li><a href="horn-crafts.html">Horn Crafts</a></li>
          <li><a href="buffalo-horn-plates.html">Buffalo Horn Plates</a></li>
          <li><a href="wooden-crafts.html">Wooden Crafts</a></li>
          <li><a href="resin.html">Resin Products</a></li>
      </ul>
  </li>
  ```
  - Image tag is a direct child of `<ul>` (invalid HTML) and lacks alt text.
  - Only one dropdown item; no sub-grouping or descriptions.
- **Styling** (`css/one.css`):
  - Responsive block at lines ~340-375 sets fixed width `348px` and height `140px`, plus static image sizing.
  - Global `.dropdown-menu` styles (lines ~448-470) use flat `#333` background, minimal hover feedback, Bootstrap defaults.
  - Hover display controlled by `.navbar-nav .dropdown:hover .dropdown-menu { display: block; }` near line 621 (no transition, no mobile fallback).
- **Behavior** (`index.html` inline script ~lines 500-520):
  - Adds `mouseenter`/`mouseleave` listeners to dropdowns, toggling `display` property (no touch support, no focus handling).
  - Other localized pages still rely on jQuery `.hover()` handlers.
- **Assets**: single static image `images/dropdown.jpg` reused as hero for dropdown.
- **Accessibility**:
  - Keyboard navigation limited (no focus management under submenu).
  - `aria-expanded` never updated; `role="button"` used on anchor but activation tied to hover only.

---

## Pain Points & Constraints
- Visual style feels dated; limited connection to brand textures or craftsmanship motif.
- Invalid HTML structure and repeated code across language variants complicate enhancements.
- Hover-only behavior fails on touch devices and screen readers.
- Hard-coded dimensions break for translated labels or additional links.
- Multiple implementations (vanilla JS vs jQuery) create maintenance risk.
- Need to keep bundle lightweight (static site, no build pipeline) and stay aligned with existing Bootstrap 3 baseline.

---

## Ideal State
1. **Visual**: Dropdown reflects artisan theme (rich textures, subtle gradients, handcrafted cues) while remaining legible and lightweight.
2. **Structure**: Valid semantic markup (`<ul>`/`<li>` hierarchy, optional `<figure>` for imagery) shared via includes/partials where possible.
3. **Accessibility**: Keyboard operable (focus trapping inside menu, ESC closes), ARIA attributes updated dynamically, touch-friendly tap targets.
4. **Responsiveness**: Layout adapts for narrow viewports (stacked items, optional image hide) without hard-coded heights.
5. **Maintainability**: Styles consolidated in one SCSS/CSS block, behavior handled in reusable script (vanilla preferred), mirrored across localized pages through includes.
6. **Performance**: Minimal additional assets, leverage existing typography/colors, avoid large background images.

---

## Implementation Plan
1. **Audit & Consolidate**
   - Extract current dropdown markup into shared include (`includes/header.html`) that can be imported in localized pages, or ensure updates are scripted across pages.
   - Remove invalid `<a>` directly inside `<ul>`; wrap image within `<li>` or replace with CSS background.
2. **Define Design Tokens**
   - Confirm color palette (#5CA316 green, supporting neutrals) and typography (existing fonts or introduce fallback serif for crafts theme).
   - Choose accent textures (CSS gradients, subtle patterns) that do not require new assets.
3. **Markup Refactor**
   - Update structure to:
     ```html
     <li class="dropdown" data-nav="handicrafts">
       <button class="dropdown-toggle" type="button" aria-expanded="false" aria-haspopup="true">
         Handicrafts <span class="caret" aria-hidden="true"></span>
       </button>
       <ul class="dropdown-menu" role="menu">
         <li class="dropdown-hero" role="presentation">
           <a href="products.html" class="dropdown-hero-link">
             <figure>
               <img src="images/dropdown.jpg" alt="Handicrafts overview" />
               <figcaption>Discover handcrafted horn, wood, and resin collections.</figcaption>
             </figure>
           </a>
         </li>
         <!-- menu items with role="presentation" and anchor role="menuitem" -->
       </ul>
     </li>
     ```
   - Fall back to `<a>` toggles if switching to `<button>` conflicts with Bootstrap JS (verify before finalizing).
4. **CSS Redesign**
   - Create new section in `css/one.css` (or dedicated partial) for "Navigation Dropdown - Crafts Theme".
   - Implement gradients, borders, spacing, responsive behavior (`@media` queries) and transitions.
   - Add focus states, keyboard-visible outlines, and reduce reliance on fixed widths/heights.
   - Provide mobile adjustments (stacked menu, full-width dropdown, hide hero image below breakpoint).
5. **Behavior Improvements**
   - Replace manual hover script with utility that:
     - Handles click/touch to toggle `aria-expanded`.
     - Closes dropdown on ESC, outside click, or focus leaving menu.
     - Preserves hover open for desktop using `pointerfine` media query if desired.
   - Remove duplicate jQuery hover scripts from localized pages once new script centralizes logic.
6. **Localization & Reuse**
   - Propagate updated markup/styling to `de/`, `fr/`, `instago/`, and `legal/` directories.
   - Ensure translated labels fit within responsive layout; adjust spacing tokens if necessary.
7. **Testing Checklist**
   - Desktop: Chrome, Firefox, Safari – hover, click, keyboard navigation.
   - Mobile: iOS Safari, Android Chrome – tap toggles, scroll behavior.
   - Accessibility: VoiceOver/NVDA quick pass, tab order, aria attributes.
   - Visual regression: confirm header alignment, ensure other menus unaffected.
8. **Documentation & Handoff**
   - Update README or dedicated docs to explain dropdown architecture, dependencies, and customization points.
   - Record key variables (colors, spacing) for future iterations.

---

## Open Questions
- Should dropdown showcase rotate multiple product images or remain a single hero?
  - **Answer (Design)**: Keep a single curated hero for launch. It allows us to craft a focused vignette with handcrafted materials, avoids animation distractions, and keeps load minimal. We can explore a seasonal swap system later if merchandising needs change.
- Any analytics/heatmap data to prioritize items or add CTAs?
  - **Answer (Design)**: Absent analytics, lean on hero hierarchy: hero tile links to `products.html`, primary four links stay as current best sellers. Add a gentle "View all collections" CTA below the list once metrics confirm engagement.
- Are there plans for additional nav items (e.g., Mega menu) that should influence final layout?
  - **Answer (Design)**: No immediate mega menu. Structure the CSS and markup so the menu can stretch to six items without breaking. Leave room for a secondary column should merchandising later request it.
- Can we deprecate jQuery usage site-wide to simplify behavior scripts?
  - **Answer (Design)**: From a UX standpoint yes—prefer a single vanilla JS controller for consistency and lighter footprint. Ensure transitions remain smooth so the crafted feel carries through.

This document serves as the master reference for the upcoming dropdown revamp. Update it as decisions are made or implementation details change.
