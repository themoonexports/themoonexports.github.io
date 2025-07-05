# Contributing to The Moon Exports Website

Thank you for your interest in contributing to The Moon Exports website! This document provides guidelines for maintaining code quality and consistency.

## 📂 Project Structure

```
├── assets/              # Shared assets across the website
│   ├── css/            # Shared CSS files (Bootstrap, custom styles)
│   ├── js/             # Shared JavaScript files
│   └── fonts/          # Web fonts
├── css/                # Page-specific CSS files
├── js/                 # Page-specific JavaScript files
├── images/             # Website images and media
├── german/             # German language version
├── instagram-tools/    # Instagram tools section
├── legal/              # Legal pages (terms, privacy, etc.)
└── *.html              # Main website pages
```

## 🎯 Naming Conventions

### Files and Directories
- **HTML files**: Use kebab-case (e.g., `buffalo-horn-plates.html`)
- **CSS files**: Use kebab-case with descriptive names (e.g., `custom.css`, `theme.css`)
- **JavaScript files**: Use kebab-case (e.g., `application.js`)
- **Directories**: Use kebab-case or descriptive names (e.g., `german/`, `instagram-tools/`)
- **Images**: Use kebab-case with descriptive names (e.g., `buffalo-horn-bowl.jpg`)

### CSS Classes and IDs
- **Classes**: Use kebab-case (e.g., `.product-card`, `.navigation-menu`)
- **IDs**: Use kebab-case (e.g., `#main-carousel`, `#contact-form`)

### JavaScript Variables
- **Variables**: Use camelCase (e.g., `productCategories`, `navigationMenu`)
- **Constants**: Use SCREAMING_SNAKE_CASE (e.g., `MAX_PRODUCTS`, `API_URL`)
- **Functions**: Use camelCase (e.g., `loadProducts()`, `handleFormSubmit()`)

## 📝 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Indent with 2 spaces
- Include proper `alt` attributes for images
- Use lowercase for all HTML tags and attributes
- Close all tags properly

```html
<section class="product-showcase">
  <h2 class="section-title">Our Products</h2>
  <img src="images/horn-craft.jpg" alt="Buffalo horn handicraft bowl" />
</section>
```

### CSS
- Use 2 spaces for indentation
- Include descriptive comments for major sections
- Group related properties together
- Use meaningful class names

```css
/**
 * Product Showcase Section
 * Styles for the main product display area
 */
.product-showcase {
  padding: 2rem 0;
  background-color: #f8f9fa;
}

.product-showcase .section-title {
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
}
```

### JavaScript
- Use 2 spaces for indentation
- Include JSDoc comments for functions
- Use meaningful variable names
- Handle errors gracefully

```javascript
/**
 * Loads product data from the API
 * @param {string} category - Product category to filter by
 * @returns {Promise<Array>} Array of product objects
 */
function loadProducts(category) {
  // Implementation here
}
```

## 🔧 Development Workflow

### Before Making Changes
1. Fork the repository
2. Create a descriptive branch name: `feature/product-gallery` or `fix/navigation-bug`
3. Test your changes locally by opening `index.html` in a browser

### Making Changes
1. Follow the naming conventions outlined above
2. Add meaningful comments to your code
3. Test across different browsers if possible
4. Update documentation if adding new features

### Submitting Changes
1. Ensure your code follows the style guidelines
2. Write clear, descriptive commit messages
3. Submit a pull request with:
   - Clear description of changes
   - Screenshots for UI changes
   - Any additional testing notes

## 📁 Asset Management

### Images
- Optimize images for web (compress large files)
- Use appropriate formats (JPEG for photos, PNG for graphics with transparency)
- Include descriptive `alt` attributes for accessibility

### CSS Organization
- **Bootstrap files**: Keep in `assets/css/` for shared usage
- **Custom styles**: Use `assets/css/custom.css` for global styles
- **Theme styles**: Use `assets/css/theme.css` for visual theming
- **Page-specific styles**: Create separate CSS files only when necessary

### JavaScript Organization
- **Bootstrap JS**: Keep in `assets/js/` for shared usage
- **Custom scripts**: Use descriptive filenames and include proper documentation

## 🌐 Multi-language Support

When working with the German language version (`german/` directory):
- Maintain the same file structure as the main site
- Use relative paths that work from the subdirectory
- Keep styling consistent with the main site

## 🧪 Testing

### Browser Testing
- Test in modern browsers (Chrome, Firefox, Safari, Edge)
- Verify responsive design on different screen sizes
- Check that all links work correctly

### Code Validation
- Validate HTML using W3C HTML Validator
- Ensure CSS follows best practices
- Check for JavaScript errors in browser console

## 📚 Documentation

### Code Comments
- Add comments for complex CSS rules
- Document JavaScript functions with JSDoc
- Explain any browser-specific workarounds

### README Updates
- Update the README.md if you add new features
- Document any new dependencies or build steps
- Keep the project structure section current

## 🚀 Performance Guidelines

- Keep file sizes reasonable
- Use compressed/minified versions of libraries when available
- Optimize images before committing
- Minimize the number of HTTP requests

## ❓ Getting Help

If you have questions about contributing:
1. Check existing issues on GitHub
2. Review this contributing guide
3. Open a new issue with a clear description of your question

Thank you for helping make The Moon Exports website better! 🙏