# UX/UI Bugs — The Moon Exports

> **Audit Date:** 2026-02-18
> **Auditor Role:** Figma Designer / UX Reviewer
> **Scope:** Full-site review across all pages, CSS, JS, React components, and localized versions (EN/DE/FR)
> **Severity Legend:** 🔴 Critical · 🟠 Major · 🟡 Minor · ⚪ Enhancement

---

## Navigation & Header

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 1 | 🟠 | Language switcher hidden on mobile | `css/one.css` (L758–770) | `p.usano, div.usano { display: none; }` hides the DE/FR flags on all viewports below 768 px. Mobile users have no way to switch language. |
| 2 | 🟡 | Language flags lack descriptive alt text | `contact.html` (L91), `about.html` (L97) | Alt text is `"german"` instead of `"Switch to German"`. Screen readers announce a meaningless word. |
| 3 | 🟠 | French flag missing from contact & about pages | `contact.html` (L91), `about.html` (L97) | Only the German flag is shown; the French flag link is missing entirely, unlike `index.html` which includes both. |
| 4 | 🟡 | Dropdown toggle has dual interaction patterns | `index.html` (L157–164) | The Handicrafts link is both a navigation link (`href="products.html"`) and a dropdown toggle. On mobile, tapping it navigates away instead of opening the submenu. |
| 5 | 🟡 | Navbar brand hover lift may obscure dropdown | `css/one.css` (L614–618) | `transform: translateY(-0.125rem)` on `.navbar-brand:hover` causes subtle layout shift that can misalign the fixed navbar border. |
| 6 | 🟠 | No active-page indicator in main nav | All pages | None of the `<li>` items in the main nav receive an `active` class or `aria-current="page"` attribute, so users cannot tell which page they are on. |
| 7 | 🟡 | Skip-to-content link only on index.html | `index.html` (L111) vs. other pages | `contact.html`, `about.html`, product pages, and legal pages lack a skip-navigation link, a WCAG 2.1 requirement. |
| 8 | 🟠 | Blog link present on some pages but not others | `contact.html` (L124), `about.html` (L141) vs. `index.html` | `index.html` has no Blog nav item, while `contact.html` and `about.html` include `<li><a href="/blog">Blog</a></li>`, creating inconsistent navigation. |
| 9 | 🟡 | Hamburger icon bars lack visible color on dark bg | `css/one.css` (L674–687) | `.navbar-toggle` sets `color: #FFFFFF` but Bootstrap 3 `.icon-bar` background defaults may not inherit, leading to invisible bars on certain browsers. |
| 10 | 🔴 | Dropdown menu not keyboard accessible on subpages | `contact.html`, `about.html` | These pages use jQuery `.hover()` for dropdown but provide no keyboard event handler. Tab/Enter cannot open the submenu. |

---

## Carousel / Hero Section

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 11 | 🟠 | No swipe/touch support on carousel | `react/src/components/Carousel.tsx` | Only arrow-key and click interactions are implemented. Mobile users cannot swipe between slides. |
| 12 | 🟡 | Carousel auto-advance lacks `aria-live` | `index.html` (L206–239) | Slide transitions are not announced to screen readers; the `role="listbox"` region has no `aria-live="polite"`. |
| 13 | 🟡 | Carousel control touch targets too small | `css/carousel.css` | Left/right arrows use Bootstrap's default sizing (~30×60 px) which is below the 44×44 px WCAG 2.1 minimum for touch. |
| 14 | 🟡 | Carousel images lack responsive `srcset` | `index.html` (L214, L224) | Fixed `width="1200" height="600"` images are served to all devices, wasting bandwidth on mobile. |
| 15 | 🟠 | Carousel caption text unreadable on bright images | `index.html` (L215–219) | White text over light product photos has no semi-transparent overlay, failing WCAG AA contrast in some slides. |
| 16 | 🟡 | Heading hierarchy broken in carousel | `index.html` (L216 vs. L226) | First slide uses `<h2>`, second slide uses `<h3>`, creating inconsistent heading levels within the same component. |
| 17 | 🟡 | Carousel indicator dots lack focus styles | `index.html` (L207–210) | Indicator `<li>` elements have no visible `:focus` outline for keyboard users. |
| 18 | 🟡 | No pause-on-hover for carousel | `index.html` (L206) | `data-ride="carousel"` auto-advances but there is no `data-pause="hover"` attribute, making it hard for users with motor impairments to interact. |

---

## Product Pages

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 19 | 🔴 | Fixed viewport width breaks mobile | `buffalo-horn-bowls.html`, `horn-decor.html` | `<meta name="viewport" content="width=1024">` forces desktop layout on mobile, making pages unusable on phones. |
| 20 | 🟠 | Product images use placeholder src with lazyload | `horn-crafts.html`, `about.html` | Images use `src="images/placeholder.png" data-src="images/logo.png"` — if lazysizes fails to load, users see a blank placeholder forever. |
| 21 | 🟡 | Product category cards lack hover state feedback | `index.html` (L253–282) | `.productcat` articles have no `:hover` transform, shadow, or color change to indicate interactivity. |
| 22 | 🟠 | Modal images not responsive on small screens | `css/one.css` (L731–736) | The `@media (max-width: 48rem)` rule sets `float: none` but modal dialogs themselves lack `max-width: 100%` containment in their inner wrappers. |
| 23 | 🟡 | Product modal placeholder text stays visible | `index.html` (L361) | `<p aria-live="polite">Loading…</p>` remains visible if React hydration fails, showing perpetual "Loading…" text. |
| 24 | 🟡 | Missing `loading="lazy"` on footer images | `index.html` (L494–498) | Company logo in the trust badges section uses `loading="lazy"` but external PayPal badge uses it too — good. However, `contact.html` (L247, L254) lacks `loading` attributes entirely on footer images. |
| 25 | 🟡 | Product card descriptions truncated inconsistently | `index.html` (L259, L269, L279) | `.productcat-desc` has no `text-overflow: ellipsis` or line-clamp, so long text wraps differently across cards, breaking visual alignment. |
| 26 | 🟡 | `<article>` product cards lack `<time>` or metadata | `index.html` (L254–260) | Using `<article>` semantically implies standalone content but no structured metadata (date, author) is provided, misleading assistive tech. |

---

## Contact Page

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 27 | 🔴 | Google Form iframe not responsive | `contact.html` (L164) | `width="600" height="1200"` creates horizontal scroll on viewports under 600 px. No `max-width: 100%` applied. |
| 28 | 🔴 | Google Maps iframe not responsive | `contact.html` (L158) | `width="400" height="300" frameborder="1"` causes overflow on mobile. The deprecated `frameborder` attribute also causes validation errors. |
| 29 | 🟠 | Multiple unclosed `<p>` tags | `contact.html` (L147–157) | Several `<p>` elements are opened but never closed, creating invalid DOM and unpredictable rendering. |
| 30 | 🟡 | Skype link icon uses wrong FA class | `contact.html` (L154) | `fa fa-skype` uses Font Awesome 4 prefix, but the page loads Font Awesome 6 (`fab fa-skype`). Icon may not render. |
| 31 | 🟡 | WhatsApp icon uses wrong FA class | `contact.html` (L155) | Same issue — `fa fa-whatsapp` should be `fab fa-whatsapp` for FA 6. |
| 32 | 🟡 | Email link uses personal address | `contact.html` (L148) | `href="mailto:kamran@angelic.com"` uses a personal email instead of the business `info@themoonexports.com`. |
| 33 | 🟠 | Contact form iframe has no accessible name | `contact.html` (L164) | `<iframe>` lacks `title` attribute, violating WCAG 4.1.2. Screen readers announce "frame" with no description. |
| 34 | 🟡 | Map iframe has no accessible name | `contact.html` (L158) | Same issue — `<iframe>` for Google Maps lacks `title="Our location"`. |
| 35 | 🟡 | Tweet button loaded without consent check | `contact.html` (L172) | `<script async src="https://platform.twitter.com/widgets.js">` loads without checking consent API, violating the site's own GDPR policy. |

---

## Footer

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 36 | 🟠 | Footer markup inconsistent across pages | `index.html` vs. `contact.html` vs. `about.html` | `index.html` uses `<ul class="footer-links">` with `<nav>` wrappers; `contact.html` and `about.html` use `<p>` tags without `<nav>`. Screen readers interpret these differently. |
| 37 | 🟡 | Copyright year placeholder not replaced | `contact.html` (L261), `about.html` (L369) | Text reads `COPYRIGHT © {{CURRENT_YEAR}}` — the template variable is never replaced because the JS that updates `#current-year` doesn't match the `{{CURRENT_YEAR}}` placeholder format. |
| 38 | 🟡 | Footer social links missing `rel="noopener"` | `contact.html` (L218–222), `about.html` (L195–209) | `target="_blank"` without `rel="noopener noreferrer"` on older pages is a security/privacy concern. `index.html` correctly includes `rel="noopener"`. |
| 39 | 🟡 | Footer social links missing `aria-label` | `contact.html` (L218–222) | Social anchor tags lack `aria-label`; the hidden `<span>` uses `style="display:none"` which is invisible to screen readers (should use `sr-only` class). |
| 40 | 🟡 | External link to smellofmoon.com not indicated | `index.html` (L409), `contact.html` (L194) | External links lack a visual indicator (icon or text) that they open in a new tab, surprising users. |
| 41 | 🟡 | Footer `<address>` tag used inconsistently | `index.html` (L416–419) uses `<address>`; `contact.html` (L198–199) uses `<p>`. Semantic inconsistency across pages. |
| 42 | 🟡 | Footer heading hierarchy jumps from `<h4>` | All pages | Footer sections use `<h4>` headings with no preceding `<h2>` or `<h3>` in the footer, breaking heading hierarchy (WCAG 1.3.1). |

---

## Newsletter / Zoho Form

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 43 | 🟠 | Two different newsletter form implementations | `index.html` (L452–476) vs. `about.html` (L281–338) | `index.html` uses a clean HTML5 form; `about.html` uses the raw Zoho optin widget with inline styles, table layouts, and no accessibility. The experiences are drastically different. |
| 44 | 🟡 | Zoho form width hardcoded to 350 px | `about.html` (L284) | `width: 350px` doesn't scale on small mobile screens (<350 px), causing overflow. |
| 45 | 🟡 | Zoho "Join Now" button color is gray-on-gray | `about.html` (L316) | Button has `background-color: rgb(217, 217, 217); color: rgb(0, 0, 0)` — barely meets WCAG AA contrast and looks disabled. |
| 46 | 🟡 | Newsletter email input placeholder is just "Email" | `index.html` (L461) | No format hint (e.g., "you@example.com"). Users may not understand what's expected. |
| 47 | 🟡 | Newsletter success message uses emoji | `index.html` (L450) | `✓` character may not render consistently across all browsers/devices; use an SVG or FA icon instead. |
| 48 | 🟡 | Newsletter error `aria-describedby` link incorrect | `index.html` (L463) | Input has `aria-describedby="newsletter-error"` which points to a hidden element. When hidden (`display:none`), `aria-describedby` references are ignored by some screen readers. |

---

## Cookie Consent & Privacy

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 49 | 🟠 | Cookie banner "Decline" button low contrast | `css/one.css` (L384–393) | `.cookie-banner__btn--secondary` uses `color: #f4f1e6` on transparent background over `rgba(24,24,24,0.95)`. The text has poor contrast against the semi-transparent bar especially on bright page content beneath. |
| 50 | 🟡 | Cookie banner buttons have no focus ring | `css/one.css` (L378–382) | `:focus` state sets `outline: none`, removing the only keyboard focus indicator. Keyboard users cannot see which button is focused. |
| 51 | 🟡 | Cookie settings panel position conflicts with scroll-to-top | `css/crafts-ui.css` (L169, L181–191) | `.cookie-settings-fixed` is at `bottom: 2rem; right: 6rem` and `.scroll-top-btn` at `bottom: 2rem; right: 2rem`. On narrow screens these overlap. |
| 52 | 🟡 | Cookie settings panel max-width too narrow | `css/crafts-ui.css` (L171) | `max-width: 25rem` may clip checkbox labels on smaller screens, causing text truncation without ellipsis. |

---

## Typography & Color

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 53 | 🟡 | Body font is generic `sans-serif` | `css/one.css` (L2) | No specific font family declared. Renders differently across OS (Helvetica on Mac, Arial on Windows, Roboto on Android). |
| 54 | 🟡 | Heading font is also generic `sans-serif` | `css/one.css` (L452) | Same issue for `h1, h2, h3, h4`. No brand-consistent typography. |
| 55 | 🟡 | `!important` overrides scattered in CSS | `css/one.css` (L705, L712, L769) | Multiple `!important` declarations make style debugging difficult and override responsive adjustments unexpectedly. |
| 56 | 🟡 | Inconsistent text color across pages | `css/one.css` (L6) vs. `contact.html` inline | Body color is `#D3D3D3` in CSS but contact page content inherits `#000` from `.content` context, creating jarring transitions. |
| 57 | 🟡 | `.frontblock.homeb` font-size set to `0.375rem` on mobile | `css/one.css` (L712) | `font-size: 0.375rem!important` (6 px) makes text in the home block completely unreadable on mobile. |
| 58 | 🟡 | Footer link color `#B3B3B3` on `#333` background | `css/one.css` (L502–503) | Contrast ratio is approximately 4.2:1 — passes WCAG AA for large text but fails for body-size text (needs 4.5:1). |
| 59 | 🟡 | Copyright text color `#BABABA` on dark background | `css/one.css` (L663) | Similar to above — borderline WCAG AA compliance for small text at `0.8125rem`. |
| 60 | 🟡 | `.services h2` uses purple border `#A17BB6` | `css/one.css` (L512) | The purple accent is inconsistent with the site's green brand palette; looks like a design leftover from a different theme. |

---

## Responsive Design & Layout

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 61 | 🟠 | About page is a single wall of text | `about.html` (L148–151) | The entire page content is a single `<div class="content">` with no section breaks, images, or visual hierarchy. On desktop, lines exceed 120 characters — poor readability. |
| 62 | 🟡 | Max-width not set for content paragraphs | Multiple HTML files | No `max-width` on `.content` or `<main>` means text lines span the full container width (>1170 px on lg screens), exceeding the 45–75 character ideal line length. |
| 63 | 🟡 | `frontblock.homeb` has fixed height `25rem` | `css/one.css` (L487–491) | Fixed height crops content on small screens and leaves excessive whitespace on large screens. Should use `min-height` or `aspect-ratio`. |
| 64 | 🟡 | Footer columns stack without spacing on mobile | `index.html` footer (L377–443) | `col-md-3` columns stack on mobile with no vertical margin between them, causing content to run together. |
| 65 | 🟡 | `.cf` container fixed height `22.5rem` | `css/one.css` (L817) | Product image crossfade containers have fixed height, clipping images that don't match the exact aspect ratio. |
| 66 | 🟡 | Google Translate element hidden only on xs | `contact.html` (L92) | `class="visible-medium hidden-xs"` is not a valid Bootstrap 3 class. Should be `visible-md-block hidden-xs`. |
| 67 | 🟡 | Masthead padding-top conflicts with header height | `css/one.css` (L420–423, L753–754) | `.masthead { padding-top: 2.1875rem }` is later overridden to `padding-top: 0rem`. The earlier rule causes a brief flash of extra padding on page load. |
| 68 | 🟡 | Product category grid lacks `col-sm` breakpoint | `index.html` (L253) | `col-md-4` jumps from 3-column to 1-column with no 2-column tablet intermediate, causing awkward single-column stretch on medium screens. |

---

## Forms & Inputs

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 69 | 🟠 | React ContactForm lacks loading/disabled state | `react/src/components/ContactForm.tsx` | Submit button is not disabled during submission, allowing duplicate form submissions. |
| 70 | 🟡 | Newsletter form submits to external URL in new tab | `index.html` (L452) | `target="_blank"` on the form action opens Zoho in a new tab, disorienting users who expect inline feedback. |
| 71 | 🟡 | Contact form Google iframe has no fallback | `contact.html` (L164) | Only text "Loading…" shows if iframe fails; no alternative contact method is offered. |
| 72 | 🟡 | Email validation regex too permissive | `index.html` (L604) | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` accepts malformed addresses like `a@b.c`. No domain TLD validation. |
| 73 | 🟡 | Form inputs lack visible labels | `index.html` (L457–462) | Newsletter email input uses `sr-only` label and placeholder only. When placeholder disappears on focus, sighted users lose the label context. |

---

## Accessibility (A11Y)

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 74 | 🟠 | Multiple `<h1>` elements on about page | `about.html` (L148) | The main content `<h1>` plus potential header-level headings create multiple `<h1>` tags — only one is recommended per page (WCAG 1.3.1). |
| 75 | 🟡 | `role="listbox"` on carousel-inner is incorrect | `index.html` (L212) | Carousel slides are not selectable options; `role="listbox"` is semantically wrong. Should be `role="group"` or omitted. |
| 76 | 🟡 | Images use `alt=""` inconsistently vs. decorative | Multiple pages | Some decorative images have descriptive alt text (noise), while meaningful images sometimes have empty or vague alt text. |
| 77 | 🟡 | Focusable elements inside hidden dropdown | `index.html` (L166–191) | Dropdown menu items are focusable via Tab even when menu is `display: none` in some browser/AT combinations. Links should have `tabindex="-1"` when hidden. |
| 78 | 🟡 | `figcaption` positioned absolute with opacity:0 | `css/one.css` (L794–813) | Generic `figcaption` styles make all `<figcaption>` elements invisible by default. This conflicts with `.dropdown-hero-caption` which should be visible. |
| 79 | 🟡 | Accessibility widget checkboxes lack labels | `react/src/components/AccessibilityWidget.tsx` | Checkboxes for high-contrast and reduced-motion toggling may lack associated `<label>` elements, making them inaccessible. |
| 80 | 🟡 | `body cz-shortcut-listen="true"` non-standard attr | `contact.html` (L77), `about.html` (L83) | Non-standard attribute from a browser extension left in source. Should be removed. |
| 81 | 🟡 | Error boundary div always in DOM | `index.html` (L114–116) | `<div id="error-boundary" style="display: none;">` is rendered for every visitor. When it appears, its styling (none defined) is generic and unhelpful. |

---

## Localization (DE/FR)

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 82 | 🟠 | Copy-paste error: "Cinque Terre" alt text | `de/index.html`, `fr/index.html` | Language flag images have `alt="Cinque Terre"` — an Italian landmark name instead of the language name. |
| 83 | 🟠 | German/French pages missing updated footer | `de/index.html`, `fr/index.html` | Footer structure on localized pages doesn't match the updated `index.html` footer (missing newsletter section, trust badges, testimonials). |
| 84 | 🟡 | Localized pages missing `<link rel="canonical">` | `de/index.html`, `fr/index.html` | No canonical URL set on localized pages, potentially causing duplicate content SEO issues. |
| 85 | 🟡 | Localized pages missing OG/Twitter meta tags | `de/index.html`, `fr/index.html` | Social sharing metadata is absent on localized pages, resulting in poor previews when shared. |
| 86 | 🟡 | German page missing hreflang for French | `de/index.html` | Should include `<link rel="alternate" hreflang="fr">` to cross-reference the French version. |
| 87 | 🟡 | Localized pages still load English `consent.js` | `de/index.html`, `fr/index.html` | Cookie consent strings are in English even on German/French pages — GDPR requires consent UI in the user's language. |

---

## Performance & Loading

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 88 | 🟡 | Font Awesome loaded twice on about page | `about.html` (L15–16) | Two `<link>` tags load FA from different CDNs (`cdnjs.cloudflare.com` and `use.fontawesome.com`), doubling CSS download. |
| 89 | 🟡 | jQuery version mismatch across pages | `index.html` (L526) vs. `contact.html` (L267) | `index.html` loads jQuery 3.6.0; `contact.html` and `about.html` load jQuery 3.7.1. Version inconsistency may cause subtle behavior differences. |
| 90 | 🟡 | 14 React module scripts loaded on index.html | `index.html` (L532–545) | Each `<script type="module">` triggers a separate HTTP request. Should be bundled or use a single entry point for non-critical components. |
| 91 | 🟡 | Google Translate script loaded without consent | `contact.html` (L98), `about.html` (L102) | `translate.google.com` script is loaded eagerly and outside the consent gate, potentially setting cookies before consent. |
| 92 | 🟡 | Carousel first image is eager but second is lazy | `index.html` (L214 vs. L224) | Correct pattern, but the second image's `loading="lazy"` may cause a visible pop-in during auto-advance since it's only one swipe away. Consider preloading both. |

---

## Security & Inline Code

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 93 | 🟡 | PayPal link uses `javascript:window.open` onclick | `about.html` (L361), `contact.html` (L253) | Inline `onclick="javascript:window.open(…)"` is a CSP violation risk and uses the deprecated `javascript:` pseudo-protocol. |
| 94 | 🟡 | Inline `<style>` blocks in HTML body | `about.html` (L223–277), `contact.html` (L234–242) | Zoho CSS embedded directly in the `<body>` causes render-blocking re-paints and makes styles hard to maintain. |
| 95 | 🟡 | SRI hash mismatch on jQuery | `index.html` (L526) | The `integrity` attribute hash for jQuery 3.6.0 may not match the actual CDN file, causing the script to fail silently in strict CSP environments. |

---

## React Component-Specific

| # | Severity | Bug | File(s) | Details |
|---|----------|-----|---------|---------|
| 96 | 🟡 | ScrollToTop button visibility flickers on scroll | `react/src/components/ScrollToTop.tsx` | No debounce on scroll listener — rapid show/hide toggling causes visual jitter on fast scrolling. |
| 97 | 🟡 | AccessibilityWidget font-size changes not announced | `react/src/components/AccessibilityWidget.tsx` | A+/A−/Reset buttons change `document.documentElement.style.fontSize` but provide no `aria-live` feedback to confirm the change. |
| 98 | 🟡 | Testimonials section empty without React | `index.html` (L480) | `<div class="testimonials" data-react="testimonials"></div>` renders as empty space if JS fails, leaving a confusing gap in the layout. |
| 99 | 🟡 | ProductGrid fallback shows "Loading…" forever | `index.html` (L361) | If the React `product-modal` component fails to mount, the static fallback `<p>Loading…</p>` persists indefinitely with no timeout or error state. |
| 100 | 🟡 | No global React error boundary | All React entry points | Individual component failures crash silently. No `ErrorBoundary` wrapper provides user-facing fallback or error reporting. |

---

## Summary

| Severity | Count |
|----------|-------|
| 🔴 Critical | 4 |
| 🟠 Major | 18 |
| 🟡 Minor | 78 |
| **Total** | **100** |

### Top Priority Fixes
1. **Bug #19** — Fix `viewport` meta on product pages to `width=device-width` (mobile-breaking)
2. **Bug #27–28** — Make iframes responsive on contact page
3. **Bug #10** — Add keyboard support to dropdown on subpages
4. **Bug #1** — Provide mobile language switching mechanism
5. **Bug #37** — Fix copyright year template variable across all pages
