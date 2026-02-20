# UX/UI Bugs — The Moon Exports

> **Audit Date:** 2026-02-20 (updated)
> **Auditor Role:** Figma Designer / UX Reviewer + Copilot Coding Agent
> **Scope:** Full-site review across all pages, CSS, JS, React components, and localized versions (EN/DE/FR)
> **Severity Legend:** 🔴 Critical · 🟠 Major · 🟡 Minor · ⚪ Enhancement

---

## Navigation & Header

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 1 | 🟠 | Language switcher hidden on mobile | `css/one.css` (L758–770) | `p.usano, div.usano { display: none; }` hides the DE/FR flags on all viewports below 768 px. Mobile users have no way to switch language. | Open |
| 2 | 🟡 | Language flags lack descriptive alt text | `contact.html` (L91), `about.html` (L97) | Alt text is `"german"` instead of `"Switch to German"`. Screen readers announce a meaningless word. | Open |
| 3 | 🟠 | French flag missing from contact & about pages | `contact.html` (L91), `about.html` (L97) | Only the German flag is shown; the French flag link is missing entirely, unlike `index.html` which includes both. | Open |
| 4 | 🟡 | Dropdown toggle has dual interaction patterns | `index.html` (L157–164) | The Handicrafts link is both a navigation link (`href="products.html"`) and a dropdown toggle. On mobile, tapping it navigates away instead of opening the submenu. | Open |
| 5 | 🟡 | Navbar brand hover lift may obscure dropdown | `css/one.css` (L614–618) | `transform: translateY(-0.125rem)` on `.navbar-brand:hover` causes subtle layout shift that can misalign the fixed navbar border. | Open |
| 6 | 🟠 | No active-page indicator in main nav | `index.html` | `index.html` Home `<li>` now carries `class="active"` and `aria-current="page"`. Other pages still need the same treatment. | ✅ Fixed (index.html) |
| 7 | 🟡 | Skip-to-content link only on index.html | `index.html` (L111) vs. other pages | `contact.html`, `about.html`, product pages, and legal pages lack a skip-navigation link, a WCAG 2.1 requirement. | Open |
| 8 | 🟠 | Blog link present on some pages but not others | `contact.html` (L124), `about.html` (L141) vs. `index.html` | `index.html` has no Blog nav item, while `contact.html` and `about.html` include `<li><a href="/blog">Blog</a></li>`, creating inconsistent navigation. | Open |
| 9 | 🟡 | Hamburger icon bars lack visible color on dark bg | `css/one.css` (L674–687) | `.navbar-toggle` sets `color: #FFFFFF` but Bootstrap 3 `.icon-bar` background defaults may not inherit, leading to invisible bars on certain browsers. | Open |
| 10 | 🔴 | Dropdown menu not keyboard accessible on subpages | `contact.html`, `about.html` | These pages use jQuery `.hover()` for dropdown but provide no keyboard event handler. Tab/Enter cannot open the submenu. | Open |
| 77 | 🟡 | Focusable elements inside hidden dropdown | `index.html`, `js/navigation.js` | Dropdown menu items were focusable via Tab even when `display:none`. Fixed: items now carry `tabindex="-1"` in static HTML; `navigation.js` removes/restores the attribute on open/close. | ✅ Fixed |

---

## Carousel / Hero Section

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 11 | 🟠 | No swipe/touch support on carousel | `react/src/components/Carousel.tsx` | Fixed: `onTouchStart`/`onTouchEnd` handlers added; swipe fires `goToNext`/`goToPrevious` when horizontal delta ≥ 50 px and horizontal movement dominates. | ✅ Fixed |
| 12 | 🟡 | Carousel auto-advance lacks `aria-live` | `index.html` (L206–239) | Slide transitions are not announced to screen readers; the `role="listbox"` region has no `aria-live="polite"`. | ✅ Fixed |
| 13 | 🟡 | Carousel control touch targets too small | `css/carousel.css` | Mobile breakpoint controls bumped from `2.5rem × 2.5rem` (40 px) to `2.75rem × 2.75rem` (44 px), meeting WCAG 2.1 SC 2.5.5. | ✅ Fixed |
| 14 | 🟡 | Carousel images lack responsive `srcset` | `index.html` (L214, L224) | Fixed `width="1200" height="600"` images are served to all devices, wasting bandwidth on mobile. | Open |
| 15 | 🟠 | Carousel caption text unreadable on bright images | `index.html` (L215–219) | Caption already has `background: rgba(0,0,0,0.3)` and `text-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.8)`. Overlay is present; flagged for monitoring with real photography. | Open |
| 16 | 🟡 | Heading hierarchy broken in carousel | `index.html` (L216 vs. L226) | First slide uses `<h2>`, second slide uses `<h3>`, creating inconsistent heading levels within the same component. | ✅ Fixed |
| 17 | 🟡 | Carousel indicator dots lack focus styles | `index.html`, `react/src/components/Carousel.tsx` | Static HTML indicators now carry `tabindex="0"` and `role="button"`; React indicators also receive `tabindex`, `role="button"`, `aria-current`, and `onKeyDown` handler. CSS focus ring already existed. | ✅ Fixed |
| 18 | 🟡 | No pause-on-hover for carousel | `index.html` (L206) | `data-pause="hover"` attribute added. | ✅ Fixed |

---

## Product Pages

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 19 | 🔴 | Fixed viewport width breaks mobile | `buffalo-horn-bowls.html`, `horn-decor.html` | `<meta name="viewport" content="width=1024">` forces desktop layout on mobile, making pages unusable on phones. | ✅ Fixed |
| 20 | 🟠 | Product images use placeholder src with lazyload | `horn-crafts.html`, `about.html` | Images use `src="images/placeholder.png" data-src="images/logo.png"` — if lazysizes fails to load, users see a blank placeholder forever. | Open |
| 21 | 🟡 | Product category cards lack hover state feedback | `index.html` (L253–282) | `.productcat` articles have no `:hover` transform, shadow, or color change to indicate interactivity. | ✅ Fixed |
| 22 | 🟠 | Modal images not responsive on small screens | `css/one.css` (L731–736) | The `@media (max-width: 48rem)` rule sets `float: none` but modal dialogs themselves lack `max-width: 100%` containment in their inner wrappers. | Open |
| 23 | 🟡 | Product modal placeholder text stays visible | `index.html` (L361) | `<p aria-live="polite">Loading…</p>` remains visible if React hydration fails, showing perpetual "Loading…" text. | ✅ Fixed |
| 24 | 🟡 | Missing `loading="lazy"` on footer images | `contact.html` (L247, L254) | `contact.html` lacks `loading` attributes entirely on footer images. | Open |
| 25 | 🟡 | Product card descriptions truncated inconsistently | `css/one.css` | `.productcat-desc` now uses `-webkit-line-clamp: 2` with `min-height: 2.45rem`, making all three cards align consistently regardless of text length. | ✅ Fixed |
| 26 | 🟡 | `<article>` product cards lack structured metadata | `index.html` (L254–260) | Using `<article>` semantically implies standalone content but no structured metadata (date, author) is provided, misleading assistive tech. | Open |
| 68 | 🟡 | Product category grid lacks `col-sm` breakpoint | `index.html` | `col-md-4` jumped from 3-column to 1-column with no 2-column tablet intermediate. Each column now also carries `col-sm-6`. | ✅ Fixed |

---

## Contact Page

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 27 | 🔴 | Google Form iframe not responsive | `contact.html` (L164) | `width="600" height="1200"` creates horizontal scroll on viewports under 600 px. No `max-width: 100%` applied. | ✅ Fixed |
| 28 | 🔴 | Google Maps iframe not responsive | `contact.html` (L158) | `width="400" height="300" frameborder="1"` causes overflow on mobile. The deprecated `frameborder` attribute also causes validation errors. | ✅ Fixed |
| 29 | 🟠 | Multiple unclosed `<p>` tags | `contact.html` (L147–157) | Several `<p>` elements are opened but never closed, creating invalid DOM and unpredictable rendering. | ✅ Fixed |
| 30 | 🟡 | Skype link icon uses wrong FA class | `contact.html` (L154) | `fa fa-skype` uses Font Awesome 4 prefix, but the page loads Font Awesome 6 (`fab fa-skype`). Icon may not render. | ✅ Fixed |
| 31 | 🟡 | WhatsApp icon uses wrong FA class | `contact.html` (L155) | Same issue — `fa fa-whatsapp` should be `fab fa-whatsapp` for FA 6. | ✅ Fixed |
| 32 | 🟡 | Email link uses personal address | `contact.html` (L148) | `href="mailto:kamran@angelic.com"` uses a personal email instead of the business `info@themoonexports.com`. | ✅ Fixed |
| 33 | 🟠 | Contact form iframe has no accessible name | `contact.html` (L164) | `<iframe>` lacks `title` attribute, violating WCAG 4.1.2. Screen readers announce "frame" with no description. | ✅ Fixed |
| 34 | 🟡 | Map iframe has no accessible name | `contact.html` (L158) | Same issue — `<iframe>` for Google Maps lacks `title="Our location"`. | ✅ Fixed |
| 35 | 🟡 | Tweet button loaded without consent check | `contact.html` (L172) | `<script async src="https://platform.twitter.com/widgets.js">` loads without checking consent API, violating the site's own GDPR policy. | Open |

---

## Footer

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 36 | 🟠 | Footer markup inconsistent across pages | `index.html` vs. `contact.html` vs. `about.html` | `index.html` uses `<ul class="footer-links">` with `<nav>` wrappers; `contact.html` and `about.html` use `<p>` tags without `<nav>`. Screen readers interpret these differently. | Open |
| 37 | 🟡 | Copyright year placeholder not replaced | `contact.html` (L261), `about.html` (L369) | Text reads `COPYRIGHT © {{CURRENT_YEAR}}` — the template variable is never replaced because the JS that updates `#current-year` doesn't match the `{{CURRENT_YEAR}}` placeholder format. | ✅ Fixed |
| 38 | 🟡 | Footer social links missing `rel="noopener"` | `contact.html` (L218–222), `about.html` (L195–209) | `target="_blank"` without `rel="noopener noreferrer"` on older pages is a security/privacy concern. `index.html` correctly includes `rel="noopener"`. | ✅ Fixed |
| 39 | 🟡 | Footer social links missing `aria-label` | `contact.html` (L218–222) | Social anchor tags lack `aria-label`; the hidden `<span>` uses `style="display:none"` which is invisible to screen readers (should use `sr-only` class). | ✅ Fixed |
| 40 | 🟡 | External link to smellofmoon.com not indicated | `index.html` (L409), `contact.html` (L194) | External links lack a visual indicator (icon or text) that they open in a new tab, surprising users. | Open |
| 41 | 🟡 | Footer `<address>` tag used inconsistently | `index.html` (L416–419) uses `<address>`; `contact.html` (L198–199) uses `<p>`. Semantic inconsistency across pages. | Open |
| 42 | 🟡 | Footer heading hierarchy jumps from `<h4>` | All pages | Footer sections use `<h4>` headings with no preceding `<h2>` or `<h3>` in the footer, breaking heading hierarchy (WCAG 1.3.1). | Open |
| 64 | 🟡 | Footer columns stack without spacing on mobile | `css/one.css` | `col-md-3` columns stacked on mobile with no vertical margin. Fixed: `@media (max-width: 47.9375rem) { footer.footer-bottom .col-md-3 { margin-bottom: 1.5rem; } }` added. | ✅ Fixed |

---

## Newsletter / Zoho Form

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 43 | 🟠 | Two different newsletter form implementations | `index.html` (L452–476) vs. `about.html` (L281–338) | `index.html` uses a clean HTML5 form; `about.html` uses the raw Zoho optin widget with inline styles, table layouts, and no accessibility. The experiences are drastically different. | Open |
| 44 | 🟡 | Zoho form width hardcoded to 350 px | `about.html` (L284) | `width: 350px` doesn't scale on small mobile screens (<350 px), causing overflow. | Open |
| 45 | 🟡 | Zoho "Join Now" button color is gray-on-gray | `about.html` (L316) | Button has `background-color: rgb(217, 217, 217); color: rgb(0, 0, 0)` — barely meets WCAG AA contrast and looks disabled. | Open |
| 46 | 🟡 | Newsletter email input placeholder is just "Email" | `index.html` (L461) | No format hint (e.g., "you@example.com"). Users may not understand what's expected. | ✅ Fixed |
| 47 | 🟡 | Newsletter success message uses emoji | `index.html` (L450) | `✓` character may not render consistently across all browsers/devices; use an SVG or FA icon instead. | Open |
| 48 | 🟡 | Newsletter error `aria-describedby` link incorrect | `index.html` (L463) | Input has `aria-describedby="newsletter-error"` which points to a hidden element. When hidden (`display:none`), `aria-describedby` references are ignored by some screen readers. | ✅ Fixed |

---

## Cookie Consent & Privacy

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 49 | 🟠 | Cookie banner "Decline" button low contrast | `css/one.css` | `.cookie-banner__btn--secondary` border opacity raised from 0.4 → 0.7 and a faint background (`rgba(244,241,230,0.08)`) added to ensure the button shape is visible even over bright underlying content. | ✅ Fixed |
| 50 | 🟡 | Cookie banner buttons have no focus ring | `css/one.css` (L378–382) | `:focus` state sets `outline: none`, removing the only keyboard focus indicator. Keyboard users cannot see which button is focused. | ✅ Fixed |
| 51 | 🟡 | Cookie settings panel position conflicts with scroll-to-top | `css/crafts-ui.css` | `.cookie-settings-fixed` was at `bottom: 2rem; right: 6rem` — on narrow screens this overlapped the scroll-to-top button at `bottom: 2rem; right: 2rem`. Fixed to `bottom: 5rem; right: 2rem` so both elements stack vertically without overlap. | ✅ Fixed |
| 52 | 🟡 | Cookie settings panel max-width too narrow | `css/crafts-ui.css` (L171) | `max-width: 25rem` may clip checkbox labels on smaller screens, causing text truncation without ellipsis. | Open |

---

## Typography & Color

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 53 | 🟡 | Body font is generic `sans-serif` | `css/one.css` (L2) | No specific font family declared. Renders differently across OS (Helvetica on Mac, Arial on Windows, Roboto on Android). | Open |
| 54 | 🟡 | Heading font is also generic `sans-serif` | `css/one.css` (L452) | Same issue for `h1, h2, h3, h4`. No brand-consistent typography. | Open |
| 55 | 🟡 | `!important` overrides scattered in CSS | `css/one.css` (L705, L712, L769) | Multiple `!important` declarations make style debugging difficult and override responsive adjustments unexpectedly. | Open |
| 56 | 🟡 | Inconsistent text color across pages | `css/one.css` (L6) vs. `contact.html` inline | Body color is `#D3D3D3` in CSS but contact page content inherits `#000` from `.content` context, creating jarring transitions. | Open |
| 57 | 🟡 | `.frontblock.homeb` font-size set to `0.375rem` on mobile | `css/one.css` (L712) | `font-size: 0.375rem!important` (6 px) makes text in the home block completely unreadable on mobile. | ✅ Fixed |
| 58 | 🟡 | Footer link color `#B3B3B3` on `#333` background | `css/one.css` (L502–503) | Contrast ratio is approximately 4.2:1 — passes WCAG AA for large text but fails for body-size text (needs 4.5:1). | Open |
| 59 | 🟡 | Copyright text color `#BABABA` on dark background | `css/one.css` (L663) | Similar to above — borderline WCAG AA compliance for small text at `0.8125rem`. | Open |
| 60 | 🟡 | `.services h2` uses purple border `#A17BB6` | `css/one.css` (L512) | The purple accent is inconsistent with the site's green brand palette; looks like a design leftover from a different theme. | Open |

---

## Responsive Design & Layout

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 61 | 🟠 | About page is a single wall of text | `about.html` (L148–151) | The entire page content is a single `<div class="content">` with no section breaks, images, or visual hierarchy. On desktop, lines exceed 120 characters — poor readability. | Open |
| 62 | 🟡 | Max-width not set for content paragraphs | Multiple HTML files | No `max-width` on `.content` or `<main>` means text lines span the full container width (>1170 px on lg screens), exceeding the 45–75 character ideal line length. | Open |
| 63 | 🟡 | `frontblock.homeb` has fixed height `25rem` | `css/one.css` (L487–491) | Fixed height crops content on small screens and leaves excessive whitespace on large screens. Should use `min-height` or `aspect-ratio`. | Open |
| 65 | 🟡 | `.cf` container fixed height `22.5rem` | `css/one.css` (L817) | Product image crossfade containers have fixed height, clipping images that don't match the exact aspect ratio. | Open |
| 66 | 🟡 | Google Translate element hidden only on xs | `contact.html` (L92) | `class="visible-medium hidden-xs"` is not a valid Bootstrap 3 class. Should be `visible-md-block hidden-xs`. | ✅ Fixed |
| 67 | 🟡 | Masthead padding-top conflicts with header height | `css/one.css` (L420–423, L753–754) | `.masthead { padding-top: 2.1875rem }` is later overridden to `padding-top: 0rem`. The earlier rule causes a brief flash of extra padding on page load. | Open |

---

## Forms & Inputs

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 69 | 🟠 | React ContactForm lacks loading/disabled state | `react/src/components/ContactForm.tsx` | Submit button is not disabled during submission, allowing duplicate form submissions. | Open |
| 70 | 🟡 | Newsletter form submits to external URL in new tab | `index.html` (L452) | `target="_blank"` on the form action opens Zoho in a new tab, disorienting users who expect inline feedback. | Open |
| 71 | 🟡 | Contact form Google iframe has no fallback | `contact.html` (L164) | Only text "Loading…" shows if iframe fails; no alternative contact method is offered. | Open |
| 72 | 🟡 | Email validation regex too permissive | `index.html` (L604) | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` accepts malformed addresses like `a@b.c`. No domain TLD validation. | Open |
| 73 | 🟡 | Form inputs lack visible labels | `index.html` (L457–462) | Newsletter email input uses `sr-only` label and placeholder only. When placeholder disappears on focus, sighted users lose the label context. | Open |

---

## Accessibility (A11Y)

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 74 | 🟠 | Multiple `<h1>` elements on about page | `about.html` (L148) | The main content `<h1>` plus potential header-level headings create multiple `<h1>` tags — only one is recommended per page (WCAG 1.3.1). | Open |
| 75 | 🟡 | `role="listbox"` on carousel-inner is incorrect | `index.html` (L212) | Carousel slides are not selectable options; `role="listbox"` is semantically wrong. Should be `role="group"` or omitted. | ✅ Fixed |
| 76 | 🟡 | Images use `alt=""` inconsistently vs. decorative | Multiple pages | Some decorative images have descriptive alt text (noise), while meaningful images sometimes have empty or vague alt text. | Open |
| 78 | 🟡 | `figcaption` positioned absolute with opacity:0 | `css/one.css` (L794–813) | Generic `figcaption` styles make all `<figcaption>` elements invisible by default. This conflicts with `.dropdown-hero-caption` which should be visible. | ✅ Fixed |
| 79 | 🟡 | Accessibility widget checkboxes lack labels | `react/src/components/AccessibilityWidget.tsx` | Checkboxes for high-contrast and reduced-motion toggling may lack associated `<label>` elements, making them inaccessible. | Open |
| 80 | 🟡 | `body cz-shortcut-listen="true"` non-standard attr | `contact.html` (L77), `about.html` (L83) | Non-standard attribute from a browser extension left in source. Should be removed. | ✅ Fixed |
| 81 | 🟡 | Error boundary div always in DOM | `index.html` (L114–116) | `<div id="error-boundary" style="display: none;">` is rendered for every visitor. When it appears, its styling (none defined) is generic and unhelpful. | Open |

---

## Localization (DE/FR)

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 82 | 🟠 | Copy-paste error: "Cinque Terre" alt text | `de/index.html`, `fr/index.html` | Language flag images have `alt="Cinque Terre"` — an Italian landmark name instead of the language name. | ✅ Fixed |
| 83 | 🟠 | German/French pages missing updated footer | `de/index.html`, `fr/index.html` | Footer structure on localized pages doesn't match the updated `index.html` footer (missing newsletter section, trust badges, testimonials). | Open |
| 84 | 🟡 | Localized pages missing `<link rel="canonical">` | `de/index.html`, `fr/index.html` | No canonical URL set on localized pages, potentially causing duplicate content SEO issues. | Open |
| 85 | 🟡 | Localized pages missing OG/Twitter meta tags | `de/index.html`, `fr/index.html` | Social sharing metadata is absent on localized pages, resulting in poor previews when shared. | Open |
| 86 | 🟡 | German page missing hreflang for French | `de/index.html` | Should include `<link rel="alternate" hreflang="fr">` to cross-reference the French version. | Open |
| 87 | 🟡 | Localized pages still load English `consent.js` | `de/index.html`, `fr/index.html` | Cookie consent strings are in English even on German/French pages — GDPR requires consent UI in the user's language. | Open |

---

## Performance & Loading

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 88 | 🟡 | Font Awesome loaded twice on about page | `about.html` (L15–16) | Two `<link>` tags load FA from different CDNs (`cdnjs.cloudflare.com` and `use.fontawesome.com`), doubling CSS download. | ✅ Fixed |
| 89 | 🟡 | jQuery version mismatch across pages | `index.html` (L526) vs. `contact.html` (L267) | `index.html` loads jQuery 3.6.0; `contact.html` and `about.html` load jQuery 3.7.1. Version inconsistency may cause subtle behavior differences. | Open |
| 90 | 🟡 | 14 React module scripts loaded on index.html | `index.html` (L532–545) | Each `<script type="module">` triggers a separate HTTP request. Should be bundled or use a single entry point for non-critical components. | Open |
| 91 | 🟡 | Google Translate script loaded without consent | `contact.html` (L98), `about.html` (L102) | `translate.google.com` script is loaded eagerly and outside the consent gate, potentially setting cookies before consent. | Open |
| 92 | 🟡 | Carousel first image is eager but second is lazy | `index.html` (L214 vs. L224) | Correct pattern, but the second image's `loading="lazy"` may cause a visible pop-in during auto-advance since it's only one swipe away. Consider preloading both. | Open |

---

## Security & Inline Code

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 93 | 🟡 | PayPal link uses `javascript:window.open` onclick | `about.html` (L361), `contact.html` (L253) | Inline `onclick="javascript:window.open(…)"` is a CSP violation risk and uses the deprecated `javascript:` pseudo-protocol. | Open |
| 94 | 🟡 | Inline `<style>` blocks in HTML body | `about.html` (L223–277), `contact.html` (L234–242) | Zoho CSS embedded directly in the `<body>` causes render-blocking re-paints and makes styles hard to maintain. | Open |
| 95 | 🟡 | SRI hash mismatch on jQuery | `index.html` (L526) | The `integrity` attribute hash for jQuery 3.6.0 may not match the actual CDN file, causing the script to fail silently in strict CSP environments. | Open |

---

## React Component-Specific

| # | Severity | Bug | File(s) | Details | Status |
|---|----------|-----|---------|---------|--------|
| 96 | 🟡 | ScrollToTop button visibility flickers on scroll | `react/src/components/ScrollToTop.tsx` | Fixed: raw `setState` on every scroll event replaced with a `requestAnimationFrame`-gated update, eliminating rapid show/hide toggling during fast scrolling. | ✅ Fixed |
| 97 | 🟡 | AccessibilityWidget font-size changes not announced | `react/src/components/AccessibilityWidget.tsx` | A+/A−/Reset buttons change `document.documentElement.style.fontSize` but provide no `aria-live` feedback to confirm the change. | Open |
| 98 | 🟡 | Testimonials section empty without React | `index.html` (L480) | `<div class="testimonials" data-react="testimonials"></div>` renders as empty space if JS fails, leaving a confusing gap in the layout. | ✅ Fixed |
| 99 | 🟡 | ProductGrid fallback shows "Loading…" forever | `index.html` (L361) | If the React `product-modal` component fails to mount, the static fallback `<p>Loading…</p>` persists indefinitely with no timeout or error state. | ✅ Fixed |
| 100 | 🟡 | No global React error boundary | All React entry points | Individual component failures crash silently. No `ErrorBoundary` wrapper provides user-facing fallback or error reporting. | Open |

---

## Summary

| Severity | Total | Fixed | Open |
|----------|-------|-------|------|
| 🔴 Critical | 4 | 3 | 1 |
| 🟠 Major | 18 | 7 | 11 |
| 🟡 Minor | 78 | 31 | 47 |
| **Total** | **100** | **41** | **59** |

### Fixes Applied in This Session (Homepage Focus)

| Bug | File(s) Changed | Root Cause | Fix |
|-----|-----------------|-----------|-----|
| #6 — No active-page indicator | `index.html` | Missing `class="active"` and `aria-current` on Home `<li>` | Added `class="active"` to Home `<li>` and `aria-current="page"` to its `<a>` |
| #11 — No swipe/touch on carousel | `react/src/components/Carousel.tsx` | No touch event handlers wired up | Added `onTouchStart`/`onTouchEnd` with `useRef` tracking; swipe fires when horizontal delta ≥ 50 px and dominates vertical delta |
| #13 — Carousel touch targets too small | `css/carousel.css` | Mobile breakpoint controls were `2.5rem` (40 px) — below WCAG 44 px minimum | Bumped to `2.75rem` (44 px) |
| #17 — Carousel indicators not keyboard-focusable | `index.html`, `Carousel.tsx` | `<li>` indicators had no `tabindex`, `role`, or keyboard handler | Added `tabindex="0"`, `role="button"`, `aria-current`, `aria-label`, and `onKeyDown` Enter/Space handler to each indicator |
| #25 — Product desc truncated inconsistently | `css/one.css` | No overflow or clamp rule on `.productcat-desc` | Added `-webkit-line-clamp: 2`, `overflow: hidden`, and `min-height: 2.45rem` |
| #49 — Decline button low contrast | `css/one.css` | Border `rgba(244,241,230,0.4)` too faint; `background: transparent` invisible over bright content below banner | Raised border opacity to `0.7`; added `rgba(244,241,230,0.08)` background tint |
| #51 — Cookie settings overlaps scroll-to-top | `css/crafts-ui.css` | Both elements were anchored to `bottom: 2rem` on the right edge | Moved cookie settings to `bottom: 5rem; right: 2rem` — clear vertical gap above scroll-to-top |
| #64 — Footer stacks with no spacing on mobile | `css/one.css` | No margin between stacked `col-md-3` columns below 768 px | Added `@media (max-width: 47.9375rem) { footer.footer-bottom .col-md-3 { margin-bottom: 1.5rem; } }` |
| #68 — Product grid jumps 3→1 col on tablet | `index.html` | Only `col-md-4` applied to each product card | Added `col-sm-6` to each card column for 2-up tablet layout |
| #77 — Hidden dropdown items keyboard-reachable | `index.html`, `js/navigation.js` | Menu item `<a>` tags had no `tabindex` when menu was `display:none` | Static HTML items get `tabindex="-1"`; `navigation.js` `open()` removes the attribute and `close()` re-adds it |
| #96 — ScrollToTop flicker on fast scroll | `react/src/components/ScrollToTop.tsx` | `setState` called synchronously on every scroll event | Gated state update behind `requestAnimationFrame` using a `useRef` guard to coalesce rapid events |

### Remaining Top Priorities

1. **Bug #10** (🔴) — Add keyboard support to dropdown on `contact.html` / `about.html` (replace jQuery hover-only with `navigation.js`)
2. **Bug #1** (🟠) — Make language switcher visible on mobile
3. **Bug #3** (🟠) — Add French flag to `contact.html` and `about.html`; fix alt text
4. **Bug #69** (🟠) — Disable ContactForm submit button while request is in-flight
5. **Bug #83** (🟠) — Sync DE/FR footer with updated `index.html` structure

---

## Homepage Malformed Rendering — Root Causes & Fixes

> **Identified:** 2026-02-18 · **Updated:** 2026-02-20
> **Scope:** `index.html` homepage rendering issues visible in browser

| # | Bug Ref | Issue | Root Cause | Status |
|---|---------|-------|------------|--------|
| A | #16 | Carousel slide 2 uses `<h3>` while slide 1 uses `<h2>` | Static HTML had mismatched heading tags across slides | ✅ Fixed |
| B | New | Carousel shows "The Truth is The Everlasting" after React hydration | `Carousel.tsx` slide data did not match `index.html` static HTML — hydration mismatch | ✅ Fixed |
| C | New | Carousel shows single "Enquiry" button instead of "Get a Quote" + "Explore Crafts" | React `Carousel.tsx` hardcoded a single CTA | ✅ Fixed |
| D | #75 | `role="listbox"` on carousel-inner is semantically incorrect | Incorrect ARIA role; slides are not selectable options | ✅ Fixed |
| E | #12 | Carousel slide transitions not announced to screen readers | Missing `aria-live="polite"` on `carousel-inner` | ✅ Fixed |
| F | #18 | Carousel auto-advances with no pause on hover | Missing `data-pause="hover"` attribute | ✅ Fixed |
| G | #78 | Generic `figcaption` styles hide dropdown hero caption | `css/one.css` applied `position: absolute; opacity: 0` to all `figcaption` | ✅ Fixed |
| H | #57 | `.frontblock.homeb` text is 6 px on mobile — completely unreadable | `font-size: 0.375rem!important` inside mobile media query | ✅ Fixed |
| I | #50 | Cookie banner buttons have no visible focus ring | `outline: none` on `.cookie-banner__btn:focus` | ✅ Fixed |
| J | #21 | Product category cards have no hover state feedback | `.productcat` had no `:hover` styles | ✅ Fixed |
| K | #48 | Newsletter `aria-describedby` references a hidden element | `aria-describedby="newsletter-error"` with static `display:none` error div | ✅ Fixed |
| L | #46 | Newsletter email placeholder is just "Email" | Placeholder text gave no format hint | ✅ Fixed |
| M | #98 | Testimonials section renders as an empty gap when React fails | `data-react="testimonials"` container had no fallback content | ✅ Fixed |
| N | #99 | "Featured Products" shows "Loading…" forever if React fails | No timeout or error fallback on `product-modal` mount point | ✅ Fixed |
| O | #11 | No swipe/touch support — mobile users cannot swipe between slides | `Carousel.tsx` had no touch event handlers | ✅ Fixed |
| P | #13 | Carousel prev/next controls below 44 px touch target on mobile | Mobile breakpoint set controls to `2.5rem` (40 px) | ✅ Fixed |
| Q | #17 | Carousel indicator dots not keyboard-focusable | `<li>` indicators had no `tabindex`, `role`, or `onKeyDown` | ✅ Fixed |
| R | #25 | Product category card descriptions truncate inconsistently | No line-clamp or `min-height` on `.productcat-desc` | ✅ Fixed |
| S | #49 | Cookie banner "Decline" button invisible over light content beneath banner | `background: transparent` + `border: rgba(…,0.4)` made button undetectable | ✅ Fixed |
| T | #51 | Cookie settings gear button overlaps scroll-to-top on narrow screens | Both elements at `bottom: 2rem` on right edge | ✅ Fixed |
| U | #64 | Footer columns run together with no gap when stacked on mobile | No vertical margin between `col-md-3` blocks below 768 px | ✅ Fixed |
| V | #68 | Product grid jumps from 3 columns directly to 1 column on tablets | Missing `col-sm-6` intermediate breakpoint | ✅ Fixed |
| W | #77 | Hidden dropdown menu items reachable via Tab | Menu item links had no `tabindex="-1"` when menu was closed | ✅ Fixed |
| X | #96 | Scroll-to-top button flickers on fast scroll | `setState` called on every scroll event without coalescing | ✅ Fixed |
