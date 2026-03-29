---
name: Assets Management
description: "Guidelines for managing and referencing assets (images, logos, fonts, etc.) in the project."
---

# Assets Management

All static assets (artes) for this project are located in the `public` directory at the project root.

## Asset Structure

The assets are organized into the following subdirectories within `public/`:

- `/public/images`: General project images, backgrounds, and photos.
- `/public/logos`: Brand logos and icons.
- `/public/fonts`: Custom project fonts.
- `/public/favicon.png`: Main site favicon.

## How to Reference Assets

When referencing these assets in your code (HTML, TSX, CSS), you MUST use absolute paths starting from the root (which points to the `public` directory in Next.js/Vite):

- **Correct**: `<img src="/images/hero-banner.png" />`
- **Incorrect**: `<img src="../../public/images/hero-banner.png" />` or any relative path.

## Conventions

1. **Naming**: Use lowercase with hyphens for asset filenames (e.g., `company-logo.svg`).
2. **Formats**: 
   - Icons: Use SVG for scalability.
   - Images: Use WebP or high-quality PNG/JPG.
3. **Accessibility**: Always include descriptive `alt` tags when using images in components.

## Examples

Using with Next.js `Image` component:
```tsx
import Image from 'next/image'

export const Logo = () => (
  <Image 
    src="/logos/brand-logo.svg" 
    alt="Camvia Brand Logo" 
    width={150} 
    height={50} 
  />
)
```

Directly in CSS:
```css
.hero {
  background-image: url('/images/hero-bg.webp');
}
```
