# Directory Structure - The Moon Exports Website

**Last Updated:** November 1, 2025

**Related Documents:**
- [Organization Report](ORGANIZATION_REPORT.md) - Reorganization details and metrics
- [Declutter Changelog](DECLUTTER_CHANGELOG.md) - Historical cleanup actions
- [AI Context Summary](AI_CONTEXT_SUMMARY.md) - AI-optimized file organization
- [Background Component](BACKGROUND_COMPONENT.md) - React background component guide
- [Modular Components](MODULAR_COMPONENTS.md) - React component architecture

---

## Overview
This document describes the organized directory structure for The Moon Exports website project, including the React component architecture and modular CSS system.

## Root Directory (Production Critical Files)
```
/
├── index.html              # Main landing page - PRIMARY ENTRY POINT
├── about.html              # Company information
├── products.html           # Product catalog
├── contact.html            # Contact form
├── faq.html               # Frequently asked questions
├── 404.html / 404.shtml   # Error pages
├── sitemap.xml            # SEO sitemap
├── robots.txt             # Search engine directives
├── BingSiteAuth.xml       # Bing verification
├── favicon.ico            # Site icon
├── CNAME                  # Domain configuration
├── firebase.json          # Hosting configuration
├── .htaccess             # Server configuration
├── database.rules.json    # Firebase rules
├── package.json          # Dependencies
├── package-lock.json     # Dependency lock
└── LICENSE               # License file
```

## Product Pages (Root Level)
```
├── horn-crafts.html           # Buffalo horn products
├── wooden-crafts.html         # Wood handicrafts
├── resin.html                 # Resin products
├── buffalo-horn-plates.html   # Specific category
├── buffalo-horn-bowls.html    # Specific category
└── horn-decor.html           # Decorative items
```

## Content Directories
```
├── css/                      # Stylesheets (Modular CSS Architecture)
│   ├── bootstrap.min.css     # Framework styles (base)
│   ├── one.css              # Core site styles + design tokens
│   ├── dropdown-social.css  # Dropdown styling module
│   ├── crafts-ui.css        # Crafts utility classes (buttons, inputs, cards)
│   └── locale variants/     # @import wrappers for locales
├── js/                       # JavaScript files
│   ├── bootstrap.min.js      # Framework scripts
│   ├── navigation.js         # Dropdown manager + accessibility
│   ├── forms.js             # FormHandler + Zoho integration
│   ├── consent.js           # Cookie banner + onReady queue
│   └── dist/                # React component bundles (ESM)
│       ├── header.js         # Header component (3.46 KB)
│       ├── footer.js         # Footer component (2.66 KB)
│       ├── carousel.js       # Carousel component (2.41 KB)
│       ├── newsletter.js     # Newsletter form (2.27 KB)
│       ├── background.js     # Background manager (1.93 KB)
│       ├── trust-badges.js   # Trust badges (1.85 KB)
│       ├── social-links.js   # Social media links (1.70 KB)
│       ├── contact-form.js   # Contact form (1.52 KB)
│       ├── product-grid.js   # Product grid (1.27 KB)
│       ├── faq.js           # FAQ accordion (1.15 KB)
│       ├── product-modal.js  # Product modal (4.49 KB)
│       ├── language-switcher.js  # Language switcher (0.99 KB)
│       ├── consent.js        # Consent manager (0.35 KB)
│       └── chunks/          # Shared React chunks
│           ├── client-*.js   # React client runtime (134.92 KB)
│           └── index-*.js    # Shared component code (6.76 KB)
├── images/                   # Media assets
│   ├── product photos
│   ├── logos and branding
│   └── carousel images
├── fonts/                    # Web fonts
├── de/                       # German localization
│   ├── index.html
│   └── css/
│       ├── dropdown-social.css  # @import from canonical
│       └── one.css             # Locale-specific overrides
├── fr/                       # French localization
│   ├── index.html
│   └── css/
│       ├── dropdown-social.css  # @import from canonical
│       └── one.css             # Locale-specific overrides
├── legal/                    # Legal pages
│   ├── privacy.html
│   ├── terms.html
│   ├── imprint.html
│   └── css/
│       └── dropdown-social.css  # @import from canonical
└── instago/                  # Instagram landing page
    ├── index.html
    └── css/
        └── dropdown-social.css  # @import from canonical
```

## Organizational Directories
```
├── docs/                     # Documentation
│   ├── PRODUCTION_READINESS_SUMMARY.md
│   ├── SECURITY_CHECKLIST.md
│   ├── SEO_INFRASTRUCTURE.md
│   ├── TESTING_PLAN.md
│   ├── BACKGROUND_COMPONENT.md       # Background React component
│   ├── BACKGROUND_REFACTORING_SUMMARY.md
│   ├── MODULAR_COMPONENTS.md
│   ├── DESIGN_SYSTEM.md
│   └── AI_CONTEXT_SUMMARY.md
├── react/                    # React component source
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Carousel.tsx
│   │   │   ├── NewsletterForm.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── FAQAccordion.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── ProductModal.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── SocialLinks.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── Background.tsx
│   │   ├── entries/         # Component entry points (for bundling)
│   │   │   ├── header.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── carousel.tsx
│   │   │   ├── newsletter.tsx
│   │   │   ├── contact-form.tsx
│   │   │   ├── faq.tsx
│   │   │   ├── product-grid.tsx
│   │   │   ├── product-modal.tsx
│   │   │   ├── trust-badges.tsx
│   │   │   ├── social-links.tsx
│   │   │   ├── language-switcher.tsx
│   │   │   ├── background.tsx
│   │   │   └── consent.ts
│   │   ├── hooks/           # React custom hooks
│   │   │   ├── useConsent.ts
│   │   │   └── useTracking.ts
│   │   ├── types/           # TypeScript type definitions
│   │   │   └── global.d.ts
│   │   └── utils/           # Utility functions
│   ├── vite.config.ts       # Vite build configuration
│   ├── tsconfig.json        # TypeScript configuration
│   ├── package.json         # React dependencies
│   └── package-lock.json
├── tools/                    # Development scripts
│   ├── check-production-readiness.sh
│   ├── ai-organize-files.sh
│   └── tests/               # Test HTML files
│       ├── comprehensive-validation.html
│       ├── diagnostic-icons.html
│       ├── test-dropdown-carets.html
│       ├── test-social-icons.html
│       ├── quick-fix-test.html
│       └── final-test.html
├── data/                     # Data files and exports
│   └── fruugo.csv
├── backup/                   # Backup and archived files
│   ├── Buffalo Horn Plates filtered_files/
│   ├── Kamran-Khan.vcf
│   └── about-horn-plates.htm
└── temp/                     # Temporary development files
    └── placeholder.gif
```

## Hidden/Config Directories
```
├── .git/                  # Git repository
├── .github/               # GitHub configuration
├── .vscode/               # VS Code settings
├── .idx/                  # IDX environment
├── .firebaserc           # Firebase project config
├── .gitignore            # Git ignore rules
└── .aicontext            # AI agent guidance
```

## File Organization Rules

### Production Critical (Keep in Root)
- All HTML pages served directly to users
- Configuration files (firebase.json, .htaccess, etc.)
- SEO files (sitemap.xml, robots.txt, etc.)
- Domain and hosting files (CNAME, etc.)

### CSS Architecture (Modular System)
- **css/z-index.css**: Z-index management system (CRITICAL: prevents overlapping)
- **css/one.css**: Core styles + CSS design tokens (variables)
- **css/dropdown-social.css**: Dropdown menu styling module
- **css/carousel.css**: Carousel component styling
- **css/crafts-ui.css**: Utility classes (btn-crafts, input-crafts, card-crafts, chip-crafts)
- **Locale CSS**: @import from canonical sources to avoid duplication
- **Load Order**: bootstrap → z-index.css → one.css → dropdown-social.css → carousel.css → crafts-ui.css

### React Components (react/src/)
- **components/**: React component definitions (.tsx)
- **entries/**: Hydration entry points for each component
- **hooks/**: Custom React hooks (useConsent, useTracking)
- **types/**: TypeScript type definitions
- **Build Output**: js/dist/*.js (ES modules)

### Legacy JavaScript (js/)
- **navigation.js**: Dropdown manager with accessibility features
- **forms.js**: FormHandler class + Zoho CRM integration
- **consent.js**: Cookie consent banner + onReady callback queue
- **Interop**: React components call legacy via window.TheMoonExports.*

### Documentation (docs/)
- Development guides and assessments
- Testing plans and security checklists
- AI context and organization guides
- Component-specific documentation

### Development Tools (tools/)
- Build and validation scripts
- Development automation
- Testing utilities (tools/tests/)

### Data Files (data/)
- CSV exports and data files
- Analytics exports
- Backup data (not user-facing)

### Backup Files (backup/)
- Old file versions
- Personal files (VCF contacts, etc.)
- Temporary extracted data
- Archived content

### Temporary Files (temp/)
- Development placeholders
- Build artifacts
- Temporary assets

## Benefits of This Organization

1. **Clean Root Directory**: Only production-critical files visible
2. **Logical Grouping**: Related files grouped by purpose
3. **AI Agent Friendly**: Clear separation makes AI navigation easier
4. **Maintainable**: Easy to find and update specific file types
5. **Deployment Ready**: Production files clearly separated from development
6. **Modular CSS**: Isolated modules (dropdown, crafts-ui) for easy maintenance
7. **Progressive Enhancement**: React hydrates existing HTML, works without JS
8. **Type Safety**: Full TypeScript support in React components
9. **Build Optimization**: Vite bundles with code splitting and tree shaking

## Maintenance Guidelines

1. **New Documentation**: Add to `docs/` directory
2. **New Scripts**: Add to `tools/` directory  
3. **Data Exports**: Place in `data/` directory
4. **Old Files**: Move to `backup/` before deletion
5. **Temporary Work**: Use `temp/` directory
6. **React Components**: Add to `react/src/components/` + create entry in `entries/`
7. **CSS Modules**: Add to `css/` with descriptive names, update HTML `<link>` tags
8. **Legacy JS**: Add to `js/` only if not suitable for React
9. **Build Process**: Run `npm run build` in `react/` to update bundles
10. **Locale Files**: Mirror changes across `/de/`, `/fr/` directories

## Git Ignore Strategy

The `.gitignore` file is configured to:
- Ignore `temp/` and `backup/` directories
- Exclude personal files (*.vcf)
- Skip temporary files (*.tmp, *.backup, *.old)
- Prevent accidental commit of sensitive data
- **Keep** `js/dist/` tracked (React build outputs committed for GitHub Pages)
- Ignore `node_modules/` in react directory

## Architecture Overview

### Hybrid Static + React Architecture
```
Static HTML (Server-rendered)
    ↓
Progressive Enhancement with React (Client hydration)
    ↓
Legacy JS Interop (window.TheMoonExports.*)
    ↓
Modular CSS Cascade (Bootstrap → one.css → modules → utilities)
```

### CSS Cascade Order
1. **bootstrap.min.css** - Base framework
2. **one.css** - Core styles + design tokens (CSS variables)
3. **dropdown-social.css** - Dropdown styling module
4. **crafts-ui.css** - Utility classes for components

### Component Hydration Flow
1. HTML page loads with static content + hydration markers (`data-react="component-name"`)
2. React bundle loads (`<script type="module" src="js/dist/component.js">`)
3. Component hydrates existing DOM (not replacing, enhancing)
4. Legacy scripts initialize via `window.TheMoonExports` API
5. Components call legacy functions when needed (e.g., `Navigation.init()`)

### Build Process
```bash
cd react/
npm install          # Install dependencies
npm run dev         # Development server (Vite on :5173)
npm run build       # Production build → js/dist/
npm run lint        # TypeScript + ESLint checks
```

This structure maintains all dependencies while providing a clean, organized workspace for both human developers and AI agents.

---

## See Also

- [Organization Report](ORGANIZATION_REPORT.md) - Reorganization results and benefits
- [AI Context Summary](AI_CONTEXT_SUMMARY.md) - AI agent file navigation
- [Declutter Changelog](DECLUTTER_CHANGELOG.md) - Historical cleanup actions
- [Background Component](BACKGROUND_COMPONENT.md) - React background component usage
- [Background Refactoring Summary](BACKGROUND_REFACTORING_SUMMARY.md) - Technical implementation details
- [Modular Components](MODULAR_COMPONENTS.md) - React component architecture guide
- [Design System](DESIGN_SYSTEM.md) - CSS design tokens and styling conventions
- [Testing Plan](TESTING_PLAN.md) - QA procedures and test coverage

---

*Last Updated: November 1, 2025*
