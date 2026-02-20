# DaisyUI 5 Setup & Configuration

## Installation

DaisyUI 5 requires Tailwind CSS 4.

### Install as dependency (recommended)

```bash
npm i -D daisyui@latest
```

Then add to your CSS file:

```css
@import "tailwindcss";
@plugin "daisyui";
```

**Important**: `tailwind.config.js` is deprecated in Tailwind CSS v4. Do not use it.

### CDN (alternative)

```html
<link
  href="https://cdn.jsdelivr.net/npm/daisyui@5"
  rel="stylesheet"
  type="text/css"
/>
<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
```

## Configuration

### Basic config

```css
@plugin "daisyui";
```

### With specific theme

```css
@plugin "daisyui" {
  themes: light --default;
}
```

### Full config example

```css
@plugin "daisyui" {
  themes:
    light --default,
    dark --prefersdark;
  root: ":root";
  include:;
  exclude:;
  prefix:;
  logs: true;
}
```

### Advanced config with multiple themes

```css
@plugin "daisyui" {
  themes:
    light,
    dark,
    cupcake,
    bumblebee --default,
    emerald,
    corporate,
    synthwave --prefersdark,
    retro,
    cyberpunk,
    valentine,
    halloween,
    garden,
    forest,
    aqua,
    lofi,
    pastel,
    fantasy,
    wireframe,
    black,
    luxury,
    dracula,
    cmyk,
    autumn,
    business,
    acid,
    lemonade,
    night,
    coffee,
    winter,
    dim,
    nord,
    sunset,
    caramellatte,
    abyss,
    silk;
  root: ":root";
  include:;
  exclude: rootscrollgutter, checkbox;
  prefix: daisy-;
  logs: false;
}
```

## Usage Rules

1. Style HTML elements by adding daisyUI class names (component + parts + modifiers)
2. Customize with Tailwind CSS utility classes when needed: `btn px-10`
3. Use `!` suffix for important overrides when specificity conflicts occur: `btn bg-red-500!`
4. Prefer daisyUI/Tailwind classes over custom CSS
5. Make layouts responsive using Tailwind responsive prefixes: `sm:flex lg:grid`
6. Only use existing daisyUI or Tailwind CSS class names
7. Don't add custom fonts unless necessary
8. Don't add `bg-base-100 text-base-content` to body unless necessary
9. Follow Refactoring UI book best practices for design decisions

## Class Categories

- `component`: Required component class (e.g., `btn`, `card`, `modal`)
- `part`: Child parts of a component (e.g., `card-title`, `modal-box`)
- `style`: Specific styling (e.g., `btn-outline`, `alert-soft`)
- `behavior`: Behavior changes (e.g., `btn-active`, `modal-open`)
- `color`: Color variants (e.g., `btn-primary`, `badge-error`)
- `size`: Size variants (e.g., `btn-lg`, `input-sm`)
- `placement`: Positioning (e.g., `modal-top`, `toast-end`)
- `direction`: Direction control (e.g., `join-vertical`, `carousel-horizontal`)
- `modifier`: Other modifications (e.g., `btn-wide`, `card-side`)
- `variant`: Conditional utility prefixes (e.g., `hover:`, `is-drawer-open:`)
