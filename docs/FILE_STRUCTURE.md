# File Structure Guide

Quick reference for The Moon Exports website file organization.

## 📁 Directory Structure

```
themoonexports.github.io/
├── 📄 Main Website Pages
│   ├── index.html                    # Homepage
│   ├── about.html                    # Company information
│   ├── products.html                 # Product overview
│   ├── contact.html                  # Contact form
│   ├── horn-crafts.html             # Buffalo horn products
│   ├── wooden-crafts.html           # Wooden handicrafts
│   ├── resin.html                   # Resin products
│   └── faq.html                     # Frequently asked questions
│
├── 🎨 Assets (Shared Resources)
│   ├── css/                         # Shared stylesheets
│   │   ├── bootstrap.min.css        # Bootstrap framework
│   │   ├── custom.css               # Site-wide custom styles
│   │   └── theme.css                # Visual theme styles
│   ├── js/                          # Shared JavaScript
│   │   └── bootstrap.min.js         # Bootstrap JavaScript
│   └── fonts/                       # Web fonts
│
├── 🎨 Page-Specific Assets
│   ├── css/                         # Page-specific styles
│   │   ├── custom.css               # Main site custom styles
│   │   └── theme.css                # Main site theme
│   ├── js/                          # Page-specific JavaScript
│   │   ├── application.js           # Main application logic
│   │   └── bootstrap.min.js         # Bootstrap components
│   └── images/                      # Website images and media
│
├── 🌍 Multi-Language Support
│   └── german/                      # German version
│       ├── index.html               # German homepage
│       ├── css/custom.css           # German-specific styles
│       ├── js/application.js        # German-specific scripts
│       └── fonts/                   # German-specific fonts
│
├── 🔧 Special Sections
│   ├── instagram-tools/             # Instagram tools section
│   ├── legal/                       # Legal pages (terms, privacy)
│   └── buffalo-horn-plates-assets/  # Specific product assets
│
└── 📚 Documentation
    ├── README.md                    # Project overview
    ├── CONTRIBUTING.md              # Developer guidelines
    ├── CHANGELOG.md                 # Change history
    └── .editorconfig               # Code formatting rules
```

## 🎯 Quick Reference

### Adding New Pages
1. Create HTML file in root directory using kebab-case naming
2. Link to shared CSS: `assets/css/bootstrap.min.css`, `css/custom.css`
3. Include page-specific styles in `css/` if needed
4. Follow HTML structure from existing pages

### Adding New Styles
- **Global styles**: Add to `assets/css/custom.css`
- **Theme changes**: Modify `assets/css/theme.css`
- **Page-specific**: Create new file in `css/` directory

### Adding New Scripts
- **Global functionality**: Add to `assets/js/` for sharing
- **Page-specific**: Create in `js/` directory
- **Always include JSDoc comments**

### Multi-Language Support
- Create corresponding files in `german/` directory
- Maintain same structure as main site
- Use relative paths that work from subdirectory

## 📝 Naming Conventions

- **Files**: kebab-case (e.g., `buffalo-horn-plates.html`)
- **Directories**: kebab-case or descriptive names
- **CSS Classes**: kebab-case (e.g., `.product-card`)
- **JavaScript Variables**: camelCase (e.g., `productList`)

## 🔍 Finding Files

| Looking for... | Check directory |
|-----------------|-----------------|
| Main website pages | Root directory (`*.html`) |
| Shared CSS/JS | `assets/css/`, `assets/js/` |
| Images | `images/` |
| German version | `german/` |
| Legal pages | `legal/` |
| Instagram tools | `instagram-tools/` |
| Documentation | Root directory (`*.md`) |

For detailed development guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).