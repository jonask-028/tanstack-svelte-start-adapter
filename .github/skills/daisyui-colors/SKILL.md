# DaisyUI 5 Color System

## Semantic Color Names

DaisyUI provides semantic colors that adapt to themes:

- **primary**: Primary brand color
- **primary-content**: Foreground content for primary color
- **secondary**: Secondary brand color
- **secondary-content**: Foreground content for secondary color
- **accent**: Accent brand color
- **accent-content**: Foreground content for accent color
- **neutral**: Neutral dark color for non-saturated UI parts
- **neutral-content**: Foreground content for neutral color
- **base-100**: Base surface color (blank backgrounds)
- **base-200**: Darker shade for elevations
- **base-300**: Even darker shade for elevations
- **base-content**: Foreground content for base color
- **info**: Info color for informative/helpful messages
- **info-content**: Foreground content for info color
- **success**: Success color for success/safe messages
- **success-content**: Foreground content for success color
- **warning**: Warning color for warning/caution messages
- **warning-content**: Foreground content for warning color
- **error**: Error color for error/danger/destructive messages
- **error-content**: Foreground content for error color

## Color Usage Rules

1. **Use semantic colors**: They contain CSS variables that change with the theme
2. **No dark mode variants needed**: Don't use `dark:` prefix with daisyUI colors
3. **Theme adaptability**: `bg-primary` changes color based on active theme
4. **Avoid Tailwind color names for text**: `text-gray-800` on `bg-base-100` becomes unreadable in dark themes
5. **Use content colors**: `*-content` colors have proper contrast with their associated colors
6. **Design with base colors**: Use `base-*` for majority of page, `primary` for important elements

## Example Usage

```html
<!-- Good: Uses semantic colors that adapt to theme -->
<div class="bg-base-100 text-base-content">
  <button class="btn btn-primary">Primary Action</button>
  <div class="alert alert-error">
    <span>Error message</span>
  </div>
</div>

<!-- Avoid: Fixed Tailwind colors don't adapt to theme -->
<div class="bg-white text-gray-800">
  <button class="bg-blue-500 text-white">Button</button>
</div>
```

## Custom Theme Colors

Create custom themes with CSS variables:

```css
@import "tailwindcss";
@plugin "daisyui";
@plugin "daisyui/theme" {
  name: "mytheme";
  default: true;
  prefersdark: false;
  color-scheme: light;

  --color-base-100: oklch(98% 0.02 240);
  --color-base-200: oklch(95% 0.03 240);
  --color-base-300: oklch(92% 0.04 240);
  --color-base-content: oklch(20% 0.05 240);
  --color-primary: oklch(55% 0.3 240);
  --color-primary-content: oklch(98% 0.01 240);
  --color-secondary: oklch(70% 0.25 200);
  --color-secondary-content: oklch(98% 0.01 200);
  --color-accent: oklch(65% 0.25 160);
  --color-accent-content: oklch(98% 0.01 160);
  --color-neutral: oklch(50% 0.05 240);
  --color-neutral-content: oklch(98% 0.01 240);
  --color-info: oklch(70% 0.2 220);
  --color-info-content: oklch(98% 0.01 220);
  --color-success: oklch(65% 0.25 140);
  --color-success-content: oklch(98% 0.01 140);
  --color-warning: oklch(80% 0.25 80);
  --color-warning-content: oklch(20% 0.05 80);
  --color-error: oklch(65% 0.3 30);
  --color-error-content: oklch(98% 0.01 30);

  --radius-selector: 1rem;
  --radius-field: 0.25rem;
  --radius-box: 0.5rem;

  --size-selector: 0.25rem;
  --size-field: 0.25rem;

  --border: 1px;

  --depth: 1;
  --noise: 0;
}
```

### Custom Theme Rules

- All CSS variables above are required
- Colors can be OKLCH, hex, or other formats
- Use [daisyUI theme generator](https://daisyui.com/theme-generator/) for visual customization
- Don't include comments in production code
