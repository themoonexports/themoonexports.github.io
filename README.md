# The Moon Exports

Modern, performance‑optimized, trilingual (EN / DE / FR) handicrafts website showcasing premium buffalo horn, wood, resin and related artisan products.

## 1. Overview
The site provides:
* Product category landing pages (horn, wood, resin, decor, plates, bowls, etc.)
* Company, contact and FAQ information
* Internationalized content (full German + French localized directories)
* Technical & enterprise SEO foundation (sitemap, hreflang, robots, security headers)

## 2. Internationalization (i18n)
Implemented language versions:
* EN (root)
* DE (`/de/`)
* FR (`/fr/`)

Features:
* Cross‑language navigation flags
* Proper `<link rel="alternate" hreflang="...">` tags including `x-default`
* Consistent translated meta titles / descriptions

## 3. SEO & Infrastructure
Implemented (see `docs/` for detailed reports):
* Enhanced `sitemap.xml` with hreflang + image metadata
* Enterprise `robots.txt` (multi‑bot directives, crawl optimization, security exclusions)
* Secure / performance `.htaccess` (HTTPS enforcement, compression, caching, security headers)
* Structured data (Organization / WebSite JSON-LD seeds) – extensible for Product / Breadcrumb / FAQ
* Canonicals + language alternates
* Performance oriented lazy loading pattern (placeholder -> data-src)

Planned / Pending:
* Google Search Console & Bing verification rollout (tokens partially present)
* Additional schema (Product, FAQ, ImageObject)
* Core Web Vitals continuous monitoring automation
* Replace placeholder French flag asset with finalized tricolor SVG

## 4. Project Structure (High Level)
Refer to [`docs/DIRECTORY_STRUCTURE.md`](docs/DIRECTORY_STRUCTURE.md) for exhaustive detail.

Core Files (root): `index.html`, `about.html`, `products.html`, `contact.html`, product detail pages, `sitemap.xml`, `robots.txt`, `.htaccess`, `BingSiteAuth.xml`.

Key Directories:
* `css/`, `js/`, `images/`, `fonts/` – assets
* `de/`, `fr/` – localized site trees (mirrored structure)
* `docs/` – strategy, SEO, security, design, testing, organization reports
* `tools/` – experimental & test utilities (e.g. future redesign prototypes)
* `data/` – export/import data (e.g. marketplace feeds)
* `backup/` & `temp/` – archival / transient workspaces

## 5. Development Workflow
Lightweight static workflow.
1. Edit / add HTML / assets
2. Validate hreflang consistency across language mirrors
3. Update `sitemap.xml` if new public URL introduced
4. Run link + image path sanity checks (manual or planned script)
5. Deploy (GitHub Pages / static host) – ensure `.htaccess` rules supported (if Apache)

Recommended Future Tooling:
* Automated sitemap regeneration script
* Lint script for hreflang + canonical integrity
* Lighthouse CI (performance & SEO budget tracking)

## 6. Performance & Security Highlights
* GZIP / deflate compression enabled
* Cache control for static assets
* Minimal blocking resources (legacy Bootstrap kept for compatibility; future migration path available)
* Security headers: HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy (see `.htaccess`)

## 7. Roadmap (Next Iterations)
| Priority | Item | Status |
|----------|------|--------|
| High | Search Console + Bing verification finalization | Pending |
| High | Structured data: Product / FAQ / Breadcrumb | Pending |
| Medium | Modern homepage redesign A/B test (`tools/`) | In progress |
| Medium | SVG flag assets + accessibility alt improvements | Pending |
| Medium | Automated sitemap + hreflang validator | Planned |
| Low | Progressive image loading (native `loading=lazy`) migration | Planned |
| Low | Lighthouse CI integration | Planned |

## 8. Running Locally
Open `index.html` in a browser. No build step required. Optionally serve via a lightweight server for header testing (e.g. `python -m http.server`).

## 9. Technologies
* HTML5 / CSS3 (Bootstrap legacy + custom)
* Vanilla JavaScript (no heavy framework)
* JSON-LD structured data blocks
* Apache configuration via `.htaccess`

## 10. Contributing
1. Fork repository
2. Create feature branch (`feat/<topic>`)
3. Make focused commits (imperative style)
4. Ensure hreflang + sitemap consistency if adding pages
5. Open PR with summary + any SEO impact notes

## 11. License
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (see `LICENSE`). Commercial resale or direct cloning for commercial purposes is prohibited without consent.

## 12. Contact
* Author / Maintainer: Kamran Khan
* Email: (GitHub no‑reply configured for commits)
* Website: https://www.themoonexports.com/

---
Concise project summary: Trilingual, SEO‑hardened, security‑aware static commerce showcase with planned evolution toward richer schema, performance automation and modern UI refresh.
