# The Moon Exports Design System (Baseline v1)

Purpose: Canonical reference of the current (2025) visual design so future refactors (e.g. React SPA) preserve look & feel.

## Core Principles
- Dark handcrafted aesthetic (dark charcoal canvas + light neutral text)
- High contrast headings; understated body copy
- Simple geometric blocks (panels, product tiles, process steps)
- Minimal animation (opacity fades + scale on hover)
- Mobile-first resilience (critical breakpoints 660px & 768px)

## Design Tokens
```
COLORS
  Body Background        #191919
  Global Text            #D3D3D3
  Headings Text          #FFFFFF
  Navbar Bg              #000000
  Navbar Border Bottom   #333333
  Footer Bg              #333333
  Footer Link Text       #B3B3B3
  Divider / Light Border rgba(255,255,255,0.13)
  Panel Heading BG       #f5f5f5
  Panel Heading Text     #333333
  Services Accent (edge) #A17BB6
  Accent Green (btn)     #4F8E10 (hover/active #447712)
  Category Overlay Base  rgba(0,0,0,0.10)
  Category Overlay Hover rgba(0,0,0,0.51)
  Figure Hover Overlay   rgba(0,0,0,0.60)
  Dropdown Menu BG       #333333
  Dropdown Item Text     #D2D2D2
  Dropdown Hover Text    #219521
  Status Green Block     #6AB520
  Error Block Red        #B54820
  Utility Palette
     Green Block  .green  #5CA316
     Blue Block   .blue   #007EE1
     Purple Block .yellow #A17BB6
     Red Block    .red    #EB3C00
SOCIAL PLATFORM COLORS (custom circles)
  Facebook  #1877f2
  Twitter/X #1da1f2
  Instagram Gradient 45°: #f09433 -> #e6683c -> #dc2743 -> #cc2366 -> #bc1888
  Pinterest #bd081c
  LinkedIn  #0077b5
```

### Typography
```
Base Font Family: system sans-serif (fallback stack). Future: replace with explicit stack e.g. "Inter, system-ui, sans-serif".
Base Body Size: Browser default (≈16px)
Body Line-Height: Inherited (implicit ~1.4)
Headings: h1–h4 share sans-serif + white (#fff)
  h1 (hero): 60px desktop; 34px ≤660px
  h2 (home hero sub / process): 28px hero; 46px section titles; 18px on narrow viewports
  h3: contextual / bold medium (carousel uses 24px → 15px small screens)
  h4: section / footer titles, white (#F2F2F2 in footer)
Button Text: Uppercase inherits default sizing
Navigation Links: 16px uppercase (#cbcbcb default → white on hover/active)
Carousel Captions: Centered, text-shadow 0 1px 2px rgba(0,0,0,0.98)
```

### Spacing & Layout
```
Global Body Top Padding: 75px (50px ≤768px)
Navbar Height: 110px desktop → 50px mobile
Section Vertical Padding: 35px (front blocks)
Front Hero (home): Height 400px; alternate hero blocks 300px / 220px
Process Row: Top border 5px solid #333 + colored block backgrounds
Copyright Bar: Top margin 30px, padding 10px 0
Footer Padding: 35px top, 10px bottom
Social Icon Legacy Base: padding 8px, margin-right 10px, font-size 20px, background #000
  Icon Content Area: 24px width, text-align center
Product Category Overlay: Padding-top 168px normal → 155px hover
```

### Imagery & Overlays
- Hero / front blocks use fixed-height background images (non-parallax)
- Product category tiles: absolute overlay with semi-transparent dark layer + text shadow
- Figures use hover state: opacity fade of top image (A/B image stack) + figcaption fade-in (0 → 0.60) with transition 0.5s

### Components
1. Navbar
   - Dark solid; uppercase links; dropdown preview image inside first dropdown item
   - Hover opens dropdown (CSS + jQuery); caret shown via border triangle (not icon font)
2. Carousel
   - Standard Bootstrap (indicators + caption). Caption centrally stacked (h3, h2, CTA button)
3. Buttons (.btn-primary)
   - Green solid (#4F8E10) with flat hover (#447712) no glow
4. Category Grid (.productcat)
   - Image + overlay title; on hover overlay darkens and shifts text upward (padding change)
5. Process Blocks (.process .col-md-3)
   - Four color-coded squares using utility color classes
6. Panels (.panel-default)
   - Bold heading, light gray panel heading background
7. Social Icons
   - Legacy Core System (.socialm from de/css/one.css):
     * padding: 8px; margin-right: 10px; font-size: 20px; background-color: #000;
     * Icon content: width 24px, text-align center
   - Enhanced System (main css/one.css):
     * Adds: color #fff, text-decoration none, display inline-block, platform-specific bg colors
     * Adds: hover transforms (scale 1.1), border-radius 50%, enhanced fallback content
   - Future: Inline SVG sprite (no external font dependency)
8. Dropdown Menu
   - Dark background (#333); light gray text; green highlight on hover
9. Modal Content / Tables
   - Force black text in modal body for readability

### Interaction & Motion
```
Hover Transitions: opacity & scale (social icons scale 1.1 in enhanced system, figures fade, overlay lighten)
Transition Timing: 0.3s (icons) / 0.5s (figures & overlays)
No complex easing (default ease)
Legacy Note: Original .socialm (de/css) has no hover effects; enhancements added later in main css
```

### Responsive Behavior
```
Breakpoints Explicitly Styled:
  ≤660px: Hero h2 shrinks; hero h1 34px; hero subtitle text adjustments
  ≤768px: Navbar condenses, min-height 50px; body top padding reduced; hide language flag (.usano)
  ≥768px: Dropdown width fixed (348px x 140px); spaced nav alignment margin-top 50px
Images: Many images forced width:100% inside .col-md-6 / general responsive containers
```

### Accessibility Notes
- High contrast text on dark backgrounds
- Text shadows on hero to ensure readability over imagery
- Hidden span labels inside social links (screen reader support)
- Hover-only dropdown (consider keyboard focus enhancement in future iteration)

### Icon Strategy
```
Current Production (main css/one.css): Enhanced Font Awesome 6 system with:
  - Platform-specific background colors & circular styling
  - Hover effects (scale 1.1, opacity 0.8)
  - Advanced fallback content & href-based targeting
  
Legacy Base (de/css/one.css): Minimal Font Awesome system:
  - Basic padding/margins only
  - Black background (#000), no hover effects
  - Simple .fa/.fab width constraint (24px)
  
Migration Path: Font Awesome 6 CDN → Inline SVG sprite → eliminate external dependency
Caret: Pure CSS triangle (borders), explicitly shielded from FA overrides
```

### Shadows & Effects
```
Text Shadow (hero/captions): 0 1px 2px rgba(0,0,0,0.98) / 1px 1px 1px #000 in hero titles
Figure Box Shadow: 1px subtle neutral (#000 alpha 0.1)
```

### Code Conventions Snapshot
- Avoid over-nesting; rely on Bootstrap grid classes
- High-specificity overrides used only for Font Awesome caret conflict
- Central file: `css/one.css` (monolithic; candidate for modularization later)
- **Social Media Evolution**: `de/css/one.css` preserves original minimal .socialm; main css enhanced with colors, circles, hover effects

### Social Media System Variants
```
LEGACY (de/css/one.css):
.socialm a { padding: 8px; margin-right: 10px; font-size: 20px; background-color: #000; }
.socialm .fa { width: 24px; text-align: center; }

ENHANCED (main css/one.css):
+ color: #fff; text-decoration: none; display: inline-block;
+ border-radius: 50%; width/height: 40px; line-height: 24px;
+ platform-specific backgrounds, hover transforms, advanced fallbacks
```

### (Mild suggestion if not already defined)
 Future Migration Mapping (React SPA)
```
Layout Wrapper:  Navbar + Footer → components/Layout.tsx
Hero Section(s):  frontblock.* → components/Hero.tsx (variant prop)
Category Grid:    productcat → components/CategoryCard.tsx
Process Row:      process.* → components/ProcessSteps.tsx
Social Icons:     Extract to SocialLinks.tsx (SVG set)
Design Tokens:    Create tokens.ts (export const colors, spacing, breakpoints)
Global Styles:    globals.css (dark theme base) + module CSS / styled system
```

### Preservation Checklist
- Keep dark palette & simple accent blocks
- Maintain hero height proportions (400 / 300 / 220)
- Retain product tile overlay interaction
- Preserve social brand color circles
- Preserve caret triangle (no icon substitution)
- Keep figure hover fade effect & dual-image stacking

### Risks When Refactoring
| Risk | Mitigation |
|------|------------|
| CDN Font Awesome failure breaks brand icons | Replace with inline SVG + existing textual fallback |
| Over-aggressive CSS purging removes utility classes | Maintain safelist in purge config |
| Hero readability lost with new images | Enforce text-shadow & contrast audit |
| Dropdown hover lost on touch | Add touch/click accessible disclosure logic |

### Immediate Opportunities
- Introduce CSS variables for color tokens
- Consolidate media queries & reduce repetition
- Migrate social icons to inline SVG set
- Add prefers-reduced-motion respect (skip scale/opacity transitions)

---
Source of truth: `css/one.css` (751 lines at capture). Keep this document as frontend standard to follow.
