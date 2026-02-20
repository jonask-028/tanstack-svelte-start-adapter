# DaisyUI 5 Advanced Components

Advanced and specialized components.

## Carousel

```html
<div class="carousel">
  <div class="carousel-item">
    <img src="image1.jpg" alt="Item 1" />
  </div>
  <div class="carousel-item">
    <img src="image2.jpg" alt="Item 2" />
  </div>
  <div class="carousel-item">
    <img src="image3.jpg" alt="Item 3" />
  </div>
</div>

<!-- Full-width items -->
<div class="carousel">
  <div class="carousel-item w-full">
    <img src="image1.jpg" class="w-full" alt="Item 1" />
  </div>
  <div class="carousel-item w-full">
    <img src="image2.jpg" class="w-full" alt="Item 2" />
  </div>
</div>

<!-- Vertical -->
<div class="carousel carousel-vertical">
  <div class="carousel-item h-full">
    <img src="image1.jpg" alt="Item 1" />
  </div>
  <div class="carousel-item h-full">
    <img src="image2.jpg" alt="Item 2" />
  </div>
</div>

<!-- Center alignment -->
<div class="carousel carousel-center">
  <div class="carousel-item">
    <img src="image1.jpg" alt="Item 1" />
  </div>
</div>
```

## Dropdown

```html
<!-- Using details/summary (recommended) -->
<details class="dropdown">
  <summary class="btn">Open Menu</summary>
  <ul
    class="dropdown-content menu bg-base-200 rounded-box z-[1] w-52 p-2 shadow"
  >
    <li><button>Item 1</button></li>
    <li><button>Item 2</button></li>
  </ul>
</details>

<!-- Using popover API -->
<button popovertarget="my-dropdown" style="anchor-name:--my-anchor">
  Open Menu
</button>
<ul
  class="dropdown-content menu bg-base-200 rounded-box w-52 p-2"
  popover
  id="my-dropdown"
  style="position-anchor:--my-anchor"
>
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
</ul>

<!-- Placements -->
<details class="dropdown dropdown-top">
  <summary>Top</summary>
  <ul class="dropdown-content">
    ...
  </ul>
</details>

<details class="dropdown dropdown-bottom">
  <summary>Bottom</summary>
  <ul class="dropdown-content">
    ...
  </ul>
</details>

<details class="dropdown dropdown-left">
  <summary>Left</summary>
  <ul class="dropdown-content">
    ...
  </ul>
</details>

<details class="dropdown dropdown-right">
  <summary>Right</summary>
  <ul class="dropdown-content">
    ...
  </ul>
</details>

<!-- Hover to open -->
<details class="dropdown dropdown-hover">
  <summary>Hover me</summary>
  <ul class="dropdown-content">
    ...
  </ul>
</details>

<!-- Force open/close -->
<details class="dropdown dropdown-open">...</details>
<details class="dropdown dropdown-close">...</details>
```

## Swap

```html
<!-- Using checkbox -->
<label class="swap">
  <input type="checkbox" />
  <div class="swap-on">ON</div>
  <div class="swap-off">OFF</div>
</label>

<!-- Rotate animation -->
<label class="swap swap-rotate">
  <input type="checkbox" />
  <div class="swap-on">😊</div>
  <div class="swap-off">😢</div>
</label>

<!-- Flip animation -->
<label class="swap swap-flip">
  <input type="checkbox" />
  <div class="swap-on">ON</div>
  <div class="swap-off">OFF</div>
</label>

<!-- Using class (control with JS) -->
<div class="swap">
  <div class="swap-on">ON</div>
  <div class="swap-off">OFF</div>
</div>
<!-- Add/remove 'swap-active' class to toggle -->

<!-- Indeterminate state -->
<label class="swap">
  <input type="checkbox" />
  <div class="swap-on">✓</div>
  <div class="swap-off">✗</div>
  <div class="swap-indeterminate">~</div>
</label>
```

## Indicator

```html
<div class="indicator">
  <span class="indicator-item badge badge-secondary">new</span>
  <button class="btn">Inbox</button>
</div>

<!-- Multiple indicators -->
<div class="indicator">
  <span class="indicator-item badge badge-primary">99+</span>
  <span class="indicator-item badge badge-error indicator-bottom">!</span>
  <button class="btn">Messages</button>
</div>

<!-- Positions -->
<div class="indicator">
  <span class="indicator-item indicator-top indicator-start">▲</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>

<div class="indicator">
  <span class="indicator-item indicator-top indicator-center">▲</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>

<div class="indicator">
  <span class="indicator-item indicator-top indicator-end">▲</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>

<div class="indicator">
  <span class="indicator-item indicator-middle indicator-start">◀</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>

<div class="indicator">
  <span class="indicator-item indicator-middle indicator-end">▶</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>

<div class="indicator">
  <span class="indicator-item indicator-bottom indicator-start">▼</span>
  <div class="grid h-32 w-32 bg-base-300">content</div>
</div>
```

## Mask

```html
<!-- Shapes -->
<img src="image.jpg" class="mask mask-squircle" />
<img src="image.jpg" class="mask mask-heart" />
<img src="image.jpg" class="mask mask-hexagon" />
<img src="image.jpg" class="mask mask-hexagon-2" />
<img src="image.jpg" class="mask mask-decagon" />
<img src="image.jpg" class="mask mask-pentagon" />
<img src="image.jpg" class="mask mask-diamond" />
<img src="image.jpg" class="mask mask-square" />
<img src="image.jpg" class="mask mask-circle" />
<img src="image.jpg" class="mask mask-star" />
<img src="image.jpg" class="mask mask-star-2" />
<img src="image.jpg" class="mask mask-triangle" />
<img src="image.jpg" class="mask mask-triangle-2" />
<img src="image.jpg" class="mask mask-triangle-3" />
<img src="image.jpg" class="mask mask-triangle-4" />

<!-- Half masks -->
<img src="image.jpg" class="mask mask-half-1" />
<img src="image.jpg" class="mask mask-half-2" />

<!-- With custom size -->
<img src="image.jpg" class="mask mask-squircle w-24 h-24" />
```

## Stack

Visually stacks elements on top of each other:

```html
<div class="stack">
  <div class="card bg-primary text-primary-content">
    <div class="card-body">A</div>
  </div>
  <div class="card bg-primary text-primary-content">
    <div class="card-body">B</div>
  </div>
  <div class="card bg-primary text-primary-content">
    <div class="card-body">C</div>
  </div>
</div>

<!-- With modifiers -->
<div class="stack stack-top">...</div>
<div class="stack stack-bottom">...</div>
<div class="stack stack-start">...</div>
<div class="stack stack-end">...</div>
```

## Diff

Side-by-side comparison:

```html
<figure class="diff aspect-16/9">
  <div class="diff-item-1">
    <img src="image1.jpg" alt="Before" />
  </div>
  <div class="diff-item-2">
    <img src="image2.jpg" alt="After" />
  </div>
  <div class="diff-resizer"></div>
</figure>
```

**Note**: Add aspect ratio class (`aspect-16/9`, `aspect-square`, etc.) to maintain proportions.

## Dock (Bottom Navigation)

```html
<div class="dock">
  <button>
    <svg>...</svg>
    <span class="dock-label">Home</span>
  </button>
  <button class="dock-active">
    <svg>...</svg>
    <span class="dock-label">Search</span>
  </button>
  <button>
    <svg>...</svg>
    <span class="dock-label">Profile</span>
  </button>
</div>

<!-- Sizes -->
<div class="dock dock-xs">...</div>
<div class="dock dock-sm">...</div>
<div class="dock dock-md">...</div>
<div class="dock dock-lg">...</div>
<div class="dock dock-xl">...</div>
```

**Note**: Add `<meta name="viewport" content="viewport-fit=cover">` for iOS responsiveness.

## FAB (Floating Action Button)

```html
<!-- Single FAB -->
<div class="fab">
  <button class="btn btn-lg btn-circle">+</button>
</div>

<!-- With speed dial (vertical) -->
<div class="fab">
  <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
    +
  </div>
  <button class="btn btn-lg btn-circle">1</button>
  <button class="btn btn-lg btn-circle">2</button>
  <button class="btn btn-lg btn-circle">3</button>
</div>

<!-- With labels -->
<div class="fab">
  <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
    +
  </div>
  <div>Create Post<button class="btn btn-lg btn-circle">📝</button></div>
  <div>Upload Photo<button class="btn btn-lg btn-circle">📷</button></div>
  <div>Share<button class="btn btn-lg btn-circle">🔗</button></div>
</div>

<!-- With close button -->
<div class="fab">
  <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
    +
  </div>
  <div class="fab-close">
    Close <span class="btn btn-circle btn-lg btn-error">✕</span>
  </div>
  <button class="btn btn-lg btn-circle">1</button>
  <button class="btn btn-lg btn-circle">2</button>
</div>

<!-- Flower layout (quarter circle) -->
<div class="fab fab-flower">
  <div tabindex="0" role="button" class="btn btn-lg btn-circle btn-primary">
    +
  </div>
  <button class="btn btn-lg btn-circle">1</button>
  <button class="btn btn-lg btn-circle">2</button>
  <button class="btn btn-lg btn-circle">3</button>
</div>
```

## Hover 3D

Adds 3D tilt effect on hover:

```html
<div class="hover-3d my-12 mx-2">
  <figure class="max-w-100 rounded-2xl">
    <img src="card.jpg" alt="Card" />
  </figure>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
  <div></div>
</div>
```

**Note**: Must have exactly 9 children (1 content + 8 empty divs for hover zones). Content should be non-interactive.

## Hover Gallery

Shows multiple images on horizontal hover:

```html
<figure class="hover-gallery max-w-60">
  <img src="product1.jpg" />
  <img src="product2.jpg" />
  <img src="product3.jpg" />
  <img src="product4.jpg" />
</figure>
```

**Note**: Can include up to 10 images. Images should have same dimensions. Needs max-width.

## Text Rotate

Rotates through multiple text lines:

```html
<span class="text-rotate text-3xl">
  <span>
    <span>DESIGN</span>
    <span>DEVELOP</span>
    <span>DEPLOY</span>
    <span>SCALE</span>
    <span>MAINTAIN</span>
    <span>REPEAT</span>
  </span>
</span>

<!-- In sentence with colors -->
<span>
  Providing AI Agents for
  <span class="text-rotate">
    <span>
      <span class="bg-teal-400 text-teal-800 px-2">Designers</span>
      <span class="bg-red-400 text-red-800 px-2">Developers</span>
      <span class="bg-blue-400 text-blue-800 px-2">Managers</span>
    </span>
  </span>
</span>

<!-- Custom duration -->
<span class="text-rotate duration-12000">
  <span>
    <span>Line 1</span>
    <span>Line 2</span>
  </span>
</span>
```

**Note**: Must have 2-6 spans. Default duration is 10000ms. Use `duration-{value}` for custom duration.

## Tooltip

```html
<div class="tooltip" data-tip="Hello">
  <button class="btn">Hover me</button>
</div>

<!-- Positions -->
<div class="tooltip tooltip-top" data-tip="Top">...</div>
<div class="tooltip tooltip-bottom" data-tip="Bottom">...</div>
<div class="tooltip tooltip-left" data-tip="Left">...</div>
<div class="tooltip tooltip-right" data-tip="Right">...</div>

<!-- Colors -->
<div class="tooltip tooltip-primary" data-tip="Primary">...</div>
<div class="tooltip tooltip-secondary" data-tip="Secondary">...</div>
<div class="tooltip tooltip-accent" data-tip="Accent">...</div>
<div class="tooltip tooltip-info" data-tip="Info">...</div>
<div class="tooltip tooltip-success" data-tip="Success">...</div>
<div class="tooltip tooltip-warning" data-tip="Warning">...</div>
<div class="tooltip tooltip-error" data-tip="Error">...</div>

<!-- Force open -->
<div class="tooltip tooltip-open" data-tip="Always visible">...</div>
```
