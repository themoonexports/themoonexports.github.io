# Background Component

The `Background` React component provides a modular, configurable way to manage the website's background styling dynamically. This component was refactored from static CSS to enable runtime theme changes and progressive enhancement.

## Features

- **Theme Variants**: Support for default solid color, gradient, and image backgrounds
- **Progressive Enhancement**: Works without JavaScript (CSS fallback remains in place)
- **Runtime Configuration**: Change background via data attributes or JavaScript API
- **Smooth Transitions**: Applies background changes without page reload
- **Type-Safe**: Full TypeScript support with props interface

## Installation

The Background component is already bundled and available at `js/dist/background.js`.

## Usage

### Method 1: HTML Data Attributes (Recommended)

Add a mount point to your HTML with configuration via data attributes:

```html
<body>
  <!-- Add this div anywhere in your page -->
  <div 
    data-react="background" 
    data-variant="default"
    data-custom-color="#191919"
    style="display: none;"
  ></div>
  
  <!-- Load the background component -->
  <script type="module" src="js/dist/background.js"></script>
</body>
```

#### Available Data Attributes

- `data-variant`: Theme variant (`"default"` | `"gradient"` | `"image"`)
- `data-image-url`: Background image URL (required when `variant="image"`)
- `data-overlay-opacity`: Image overlay opacity, 0-1 (default: `0.85`)
- `data-custom-color`: Custom background color, overrides variant

### Method 2: JavaScript API

Configure background via `window.TheMoonExports` object:

```html
<script>
  window.TheMoonExports = window.TheMoonExports || {};
  window.TheMoonExports.backgroundConfig = {
    variant: "gradient",
    // imageUrl: "images/texture.jpg",
    // overlayOpacity: 0.9,
    // customColor: "#1a1a1a"
  };
</script>
<script type="module" src="js/dist/background.js"></script>
```

### Method 3: Direct Component Import

For advanced use cases, import the component directly in your React code:

```tsx
import { Background } from "@components/Background";

function App() {
  return (
    <>
      <Background variant="gradient" />
      {/* Rest of your app */}
    </>
  );
}
```

## Variants

### Default (Solid Color)
```html
<div data-react="background" data-variant="default"></div>
```
Applies a solid dark background (`#191919`).

### Gradient
```html
<div data-react="background" data-variant="gradient"></div>
```
Applies a subtle gradient from `var(--tmx-ink-900)` to `var(--tmx-ink-800)`.

### Image with Overlay
```html
<div 
  data-react="background" 
  data-variant="image"
  data-image-url="images/texture.jpg"
  data-overlay-opacity="0.85"
></div>
```
Applies a background image with a dark overlay. The image is:
- Fixed attachment (parallax effect on scroll)
- Cover-sized (fills viewport)
- Center-positioned
- Overlaid with semi-transparent dark layer

### Custom Color
```html
<div 
  data-react="background" 
  data-custom-color="#2c2c2c"
></div>
```
Applies any custom background color, overriding variant.

## Props Interface

```typescript
export interface BackgroundProps {
  variant?: "default" | "gradient" | "image";
  imageUrl?: string;
  overlayOpacity?: number; // 0-1
  customColor?: string;
}
```

## Integration with Existing CSS

The Background component **supplements** existing CSS, not replaces it:

1. **CSS Fallback**: `body { background-color: #191919; }` in `css/one.css` remains as fallback
2. **CSS Variables**: Component uses `--tmx-ink-*` variables for consistency
3. **Hydration**: Component applies styles to `<body>` element directly
4. **Cleanup**: Resets to default background on unmount

## Examples

### Homepage with Gradient
```html
<div data-react="background" data-variant="gradient"></div>
<script type="module" src="js/dist/background.js"></script>
```

### Product Page with Texture
```html
<div 
  data-react="background" 
  data-variant="image"
  data-image-url="images/product-texture.jpg"
  data-overlay-opacity="0.9"
></div>
<script type="module" src="js/dist/background.js"></script>
```

### Legal Pages with Lighter Background
```html
<div 
  data-react="background" 
  data-custom-color="#232323"
></div>
<script type="module" src="js/dist/background.js"></script>
```

## Migration Guide

To migrate existing pages to use the Background component:

1. **Add mount point** to HTML (preferably near closing `</body>` tag)
2. **Configure variant** via data attributes or window object
3. **Load script**: `<script type="module" src="js/dist/background.js"></script>`
4. **(Optional)** Remove redundant inline background styles from HTML

Example migration:

```html
<!-- BEFORE -->
<body style="background-color: #191919;">
  <!-- content -->
</body>

<!-- AFTER -->
<body>
  <!-- content -->
  <div data-react="background" data-variant="default"></div>
  <script type="module" src="js/dist/background.js"></script>
</body>
```

## Performance Considerations

- **Lightweight**: ~1.93 KB (gzipped: 0.82 KB)
- **Lazy Loading**: Can be loaded after critical content
- **CSS-First**: CSS fallback ensures background visible before JS loads
- **No Layout Shift**: Component doesn't render visible elements, only manages body styles

## Browser Support

- Modern browsers with ES modules support (Chrome 61+, Firefox 60+, Safari 11+, Edge 16+)
- Fallback: Static CSS background applies in older browsers

## Troubleshooting

**Background not changing?**
- Verify `data-react="background"` attribute is present
- Check browser console for errors
- Ensure `background.js` is loaded: check Network tab

**Image not showing?**
- Verify image URL is correct and accessible
- Check `data-variant="image"` is set
- Ensure `data-image-url` attribute contains valid path

**Flickering on page load?**
- Ensure CSS fallback (`body { background-color: #191919; }`) is present
- Load `background.js` as late as possible (near closing `</body>`)

## API Reference

### Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"default" \| "gradient" \| "image"` | `"default"` | Background theme variant |
| `imageUrl` | `string \| undefined` | `undefined` | Background image URL (required for `image` variant) |
| `overlayOpacity` | `number` | `0.85` | Opacity of dark overlay on image (0-1) |
| `customColor` | `string \| undefined` | `undefined` | Custom background color (overrides variant) |

### Data Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-react` | `"background"` | Mount point identifier (required) |
| `data-variant` | `"default" \| "gradient" \| "image"` | Theme variant |
| `data-image-url` | URL string | Background image path |
| `data-overlay-opacity` | `"0"` to `"1"` | Overlay opacity |
| `data-custom-color` | Color string | Custom background color |

## Future Enhancements

Potential improvements for future iterations:

- [ ] Theme presets (e.g., "workshop", "product", "legal")
- [ ] Animation transitions between background changes
- [ ] Multiple background images with carousel/slideshow
- [ ] Parallax scroll effects configuration
- [ ] Dark/light mode toggle integration
- [ ] Background blur effects for glassmorphism
- [ ] Local storage persistence of user-selected themes
