# The Moon Exports

This is the official website for The Moon Exports, a manufacturer and exporter of handicrafts, specializing in buffalo horn, wood, and resin products.

This repository contains the code for the The Moon Exports website, a platform dedicated to showcasing and selling exquisite handcrafted items. Our products range from unique jewelry pieces and decorative items to functional household goods, all meticulously crafted by skilled artisans.

## About The Moon Exports

The Moon Exports is committed to promoting sustainable and ethical practices. We source our materials responsibly, ensuring that they are by-products of the food industry where applicable. Our artisans then transform these materials into beautiful and durable pieces, each with its own unique character and charm.

## Features

* **Product Showcase:** Browse our extensive collection of crafts, complete with detailed descriptions and high-quality images.
* **Secure Online Shopping:** Enjoy a seamless and secure shopping experience with our integrated e-commerce platform.
* **Artisan Profiles:** Learn more about the talented artisans behind our products and their traditional crafting techniques.
* **Blog:** Stay updated on the latest trends in crafts, artisan spotlights, and sustainable practices through our blog.

## Project Structure

Here's a comprehensive overview of the organized file structure:

```
├── assets/                     # Shared assets across the website
│   ├── css/                   # Shared CSS files (Bootstrap, themes)
│   ├── js/                    # Shared JavaScript libraries
│   └── fonts/                 # Web fonts
├── css/                       # Page-specific CSS files
│   ├── custom.css             # Custom site-wide styles
│   └── theme.css              # Theme and visual styling
├── js/                        # Page-specific JavaScript files
├── images/                    # Website images and media assets
├── german/                    # German language version of the website
├── instagram-tools/           # Instagram tools and utilities section
├── legal/                     # Legal pages (terms, privacy, imprint)
├── buffalo-horn-plates-assets/ # Assets for buffalo horn plates page
├── *.html                     # Main website pages
├── CONTRIBUTING.md            # Developer guidelines and coding standards
└── .editorconfig             # Code formatting configuration
```

### Key Pages
*   **`index.html`**: The main landing page showcasing products and company
*   **`about.html`**: Detailed information about The Moon Exports company
*   **`products.html`**: Overview of all product categories
*   **`horn-crafts.html`**: Buffalo horn handicrafts showcase
*   **`wooden-crafts.html`**: Wooden handicrafts collection
*   **`resin.html`**: Resin products and crafts
*   **`contact.html`**: Contact information and inquiry form

### Multi-language Support
*   **`german/`**: Complete German translation of the website

## Development Guidelines

### Prerequisites
- A modern web browser for testing
- Basic knowledge of HTML, CSS, and JavaScript
- Code editor with EditorConfig support (recommended)

### Coding Standards
This project follows established coding standards for maintainability:

- **File Naming**: Use kebab-case for HTML, CSS, and JS files
- **Code Style**: 2-space indentation, meaningful variable names
- **Documentation**: Comprehensive comments in CSS and JavaScript files
- **Organization**: Shared assets in `assets/`, page-specific files in respective directories

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

### File Organization
- **Shared Bootstrap files**: Located in `assets/css/` and `assets/js/`
- **Custom styles**: `assets/css/custom.css` for global styles
- **Theme styles**: `assets/css/theme.css` for visual theming
- **Page-specific assets**: Organized by functionality

## Running the Website Locally

To view the website, simply open the `index.html` file located in the root directory of this project in your preferred web browser. No build process is required for basic development.

For development with live reloading:
```bash
# If you have Node.js installed, you can use a simple server
npx http-server . -p 8080

# Or using Python 3
python -m http.server 8080

# Or using PHP
php -S localhost:8080
```

## Technologies Used

This website is built using the following technologies:

*   **HTML:** For the basic structure and content of the web pages.
*   **CSS:** For styling and presentation of the website.
*   **JavaScript:** For client-side interactivity and dynamic features.
*   **Bootstrap:** A front-end framework for developing responsive and mobile-first websites.

## Contributing

We welcome contributions to enhance the The Moon Exports website! Whether you're fixing bugs, improving documentation, or adding new features, your help is appreciated.

### Quick Start
1. Fork the repository
2. Create a descriptive branch name (`feature/new-gallery` or `fix/navigation-bug`)
3. Follow the coding standards outlined in [CONTRIBUTING.md](CONTRIBUTING.md)
4. Test your changes locally
5. Submit a pull request with a clear description

### Coding Standards
- Use semantic HTML5 elements
- Follow the established naming conventions (kebab-case for files)
- Add meaningful comments to CSS and JavaScript
- Maintain the organized file structure
- Test across different browsers when possible

For detailed guidelines, please read our [Contributing Guide](CONTRIBUTING.md).

### Reporting Issues
If you find bugs or have suggestions for improvements:
1. Check existing issues to avoid duplicates
2. Create a new issue with a clear description
3. Include steps to reproduce (for bugs)
4. Add screenshots for UI-related issues

## License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License. See the `LICENSE` file for more details.
