# Modular Component System Documentation

**Last Updated:** October 31, 2025

**Related Documents:**
- [Design System](DESIGN_SYSTEM.md) - Component design specifications
- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - React component migration
- [../react-refactoring.md](../react-refactoring.md) - React refactoring plan

---

## Overview
The Moon Exports website now uses a modular component system for headers and footers, ensuring consistency across all pages while maintaining individual page SEO schema integrity.

## Component Structure

### English Components (Root Level)
- `/includes/header.html` - Standard English header
- `/includes/footer.html` - Standard English footer

### German Components
- `/de/includes/header.html` - German header with translated navigation
- `/de/includes/footer.html` - German footer with translated links

### French Components
- `/fr/includes/header.html` - French header with translated navigation  
- `/fr/includes/footer.html` - French footer with translated links

### Component Loader
- `/js/components.js` - JavaScript utility that auto-detects language and loads appropriate components

## Implementation in HTML Pages

### Required HTML Structure
Each page should include these placeholder divs:

```html
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main-content" class="sr-only sr-only-focusable">Skip to main content</a>

    <!-- Header Component Placeholder -->
    <div id="header-placeholder">
        <!-- Header will be loaded here via JavaScript -->
    </div>

    <main id="main-content" role="main">
        <!-- Page-specific content here -->
        <!-- SEO schema can be included in <head> without compromise -->
    </main>

    <!-- Footer Component Placeholder -->
    <div id="footer-placeholder">
        <!-- Footer will be loaded here via JavaScript -->
    </div>

    <!-- Component Loader Script -->
    <script src="js/components.js"></script>
</body>
```

### Language Detection
The component loader automatically detects language from URL path:
- Default (English): `/` or any path not containing `/de/` or `/fr/`
- German: Any path containing `/de/`
- French: Any path containing `/fr/`

## Component Features

### Header Components Include:
- Logo with proper alt text for each language
- Language switcher flags (excluding current language)
- Navigation menu with translated labels
- Responsive mobile menu with hamburger toggle
- Proper accessibility attributes (ARIA labels, sr-only text)

### Footer Components Include:
- Company information section
- Product links with translated labels
- Contact information
- Social media links with proper accessibility
- Legal links (privacy, terms, imprint, license)
- Copyright notice with auto-updating year
- Bootstrap JavaScript for dropdown functionality

## SEO Benefits

### Preserved Individual Page SEO:
- Each page retains unique `<head>` section
- Individual structured data (JSON-LD) remains uncompromised
- Page-specific meta tags, titles, and descriptions intact
- Canonical URLs and hreflang tags per page

### Component SEO Features:
- Semantic HTML structure (`<nav>`, `<footer>`, `<address>`)
- Proper heading hierarchy (h4 for footer sections)
- Accessibility compliance (ARIA labels, skip links)
- Social media links with `rel="noopener noreferrer"`

## Maintenance Advantages

### Centralized Updates:
- Single file edit updates all pages of that language
- Consistent navigation across entire site
- Easy to add/remove menu items globally
- Simplified social media link management

### Development Benefits:
- Reduced code duplication
- Faster page creation (copy structure, add content)
- Consistent styling and functionality
- Easier testing and quality assurance

## File Paths by Language

### English Pages (Root)
```html
<script src="js/components.js"></script>
<!-- Loads: includes/header.html & includes/footer.html -->
```

### German Pages
```html
<script src="../js/components.js"></script>
<!-- Loads: de/includes/header.html & de/includes/footer.html -->
```

### French Pages  
```html
<script src="../js/components.js"></script>
<!-- Loads: fr/includes/header.html & fr/includes/footer.html -->
```

## Component Customization

### Adding New Navigation Items:
1. Edit appropriate header component file
2. Add new `<li><a href="...">Label</a></li>` in navigation
3. Translate labels for each language version
4. Update dropdown menu if adding subcategories

### Modifying Footer Sections:
1. Edit appropriate footer component file
2. Maintain consistent column structure (`col-md-3`)
3. Update translations in all language versions
4. Test responsive layout on mobile devices

## Technical Implementation

### Component Loading Process:
1. Page loads with placeholder divs
2. `components.js` detects language from URL
3. Fetch API loads appropriate component files
4. Components are inserted into placeholder divs
5. JavaScript initializers run (dropdown effects, year update)

### Error Handling:
- Console warnings for missing placeholder elements
- Fetch error catching and logging
- Graceful degradation if components fail to load

## Migration Guide

### Converting Existing Pages:
1. Copy page-specific content between `<main>` tags
2. Replace header/footer HTML with placeholder divs
3. Add component loader script
4. Test language detection and component loading
5. Verify all links and functionality work correctly

### Quality Assurance Checklist:
- [ ] Navigation menu appears correctly
- [ ] Language switcher flags show (excluding current language)
- [ ] Footer links work and lead to correct pages
- [ ] Social media icons display and link correctly
- [ ] Dropdown menus function on hover
- [ ] Mobile hamburger menu works
- [ ] Copyright year updates automatically
- [ ] Page-specific SEO schema loads correctly

## Future Enhancements

### Planned Improvements:
- Component versioning for cache busting
- Preload hints for component files
- Service worker caching for offline availability
- A/B testing capability for component variations

### Performance Optimizations:
- Inline critical components for above-fold content
- Lazy loading for below-fold footer components
- Minified component files for production
- CDN hosting for component assets

This modular system provides a robust foundation for consistent site-wide navigation and footer content while preserving the flexibility and SEO optimization of individual pages.

---

## See Also

- [Phase 2 Implementation](PHASE_2_IMPLEMENTATION.md) - React component evolution
- [Design System](DESIGN_SYSTEM.md) - Component styling guide
- [../react-refactoring.md](../react-refactoring.md) - Migration strategy

---

*Last Updated: October 31, 2025*
