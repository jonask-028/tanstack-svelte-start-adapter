# DaisyUI 5 Layout Components

Components for page structure and layout.

## Navbar

```html
<div class="navbar">
  <div class="navbar-start">
    <a class="btn btn-ghost">Logo</a>
  </div>
  <div class="navbar-center">
    <ul class="menu menu-horizontal">
      <li><button>Home</button></li>
      <li><button>About</button></li>
    </ul>
  </div>
  <div class="navbar-end">
    <button class="btn btn-primary">Login</button>
  </div>
</div>
```

Suggested: Use `bg-base-200` for background color.

## Drawer

```html
<div class="drawer">
  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content">
    <!-- Page content -->
    <label for="my-drawer" class="btn drawer-button">Open drawer</label>
  </div>
  <div class="drawer-side">
    <label
      for="my-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
    ></label>
    <ul class="menu bg-base-200 min-h-full w-80 p-4">
      <li><button>Sidebar Item 1</button></li>
      <li><button>Sidebar Item 2</button></li>
    </ul>
  </div>
</div>
```

**Placements**: `drawer-end` (drawer on right side)

**Modifiers**: `drawer-open` (always visible), `lg:drawer-open` (visible on large screens)

**Important**: All page content must be inside `drawer-content`. Navbar and footer should be inside it, not outside drawer.

## Footer

```html
<footer class="footer">
  <nav>
    <h6 class="footer-title">Services</h6>
    <a>Branding</a>
    <a>Design</a>
    <a>Marketing</a>
  </nav>
  <nav>
    <h6 class="footer-title">Company</h6>
    <a>About us</a>
    <a>Contact</a>
    <a>Jobs</a>
  </nav>
</footer>

<!-- Centered -->
<footer class="footer footer-center">
  <nav>
    <a>About</a>
    <a>Contact</a>
  </nav>
  <p>Copyright © 2024</p>
</footer>

<!-- Responsive -->
<footer class="footer sm:footer-horizontal">
  <!-- Content -->
</footer>
```

Suggested: Use `bg-base-200` for background color.

## Hero

```html
<div class="hero min-h-screen">
  <div class="hero-content">
    <div>
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Welcome to our website</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>

<!-- With overlay on background image -->
<div class="hero min-h-screen" style="background-image: url(bg.jpg);">
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <div>
      <h1 class="text-5xl font-bold">Hello there</h1>
      <p class="py-6">Welcome to our website</p>
      <button class="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
```

## Tabs

```html
<!-- Using radio inputs (recommended for tab content) -->
<div role="tablist" class="tabs tabs-box">
  <input type="radio" name="my_tabs" class="tab" aria-label="Tab 1" checked />
  <div role="tabpanel" class="tab-content">
    <p>Tab 1 content</p>
  </div>

  <input type="radio" name="my_tabs" class="tab" aria-label="Tab 2" />
  <div role="tabpanel" class="tab-content">
    <p>Tab 2 content</p>
  </div>
</div>

<!-- Using buttons -->
<div role="tablist" class="tabs">
  <button role="tab" class="tab">Tab 1</button>
  <button role="tab" class="tab tab-active">Tab 2</button>
  <button role="tab" class="tab">Tab 3</button>
</div>
```

**Styles**: `tabs-box`, `tabs-border`, `tabs-lift`

**Placements**: `tabs-top`, `tabs-bottom`

## Collapse (Accordion)

```html
<!-- Using details/summary -->
<details class="collapse">
  <summary class="collapse-title">Click to expand</summary>
  <div class="collapse-content">
    <p>Content goes here</p>
  </div>
</details>

<!-- With modifiers -->
<details class="collapse collapse-arrow">
  <summary class="collapse-title">With arrow</summary>
  <div class="collapse-content">
    <p>Content</p>
  </div>
</details>

<details class="collapse collapse-plus">
  <summary class="collapse-title">With plus icon</summary>
  <div class="collapse-content">
    <p>Content</p>
  </div>
</details>

<!-- Radio-based accordion (only one open at a time) -->
<div class="collapse">
  <input type="radio" name="my-accordion" checked="checked" />
  <div class="collapse-title">Item 1</div>
  <div class="collapse-content">
    <p>Content 1</p>
  </div>
</div>
<div class="collapse">
  <input type="radio" name="my-accordion" />
  <div class="collapse-title">Item 2</div>
  <div class="collapse-content">
    <p>Content 2</p>
  </div>
</div>
```

**Note**: Radio inputs with same `name` work together - only one can be open at a time.

## Breadcrumbs

```html
<div class="breadcrumbs">
  <ul>
    <li><a>Home</a></li>
    <li><a>Documents</a></li>
    <li>Current Page</li>
  </ul>
</div>

<!-- With icons -->
<div class="breadcrumbs">
  <ul>
    <li><a>🏠 Home</a></li>
    <li><a>📄 Documents</a></li>
    <li>📝 Current</li>
  </ul>
</div>
```

## Steps

```html
<ul class="steps">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Choose plan</li>
  <li class="step">Purchase</li>
  <li class="step">Receive Product</li>
</ul>

<!-- Vertical -->
<ul class="steps steps-vertical">
  <li class="step step-primary">Step 1</li>
  <li class="step">Step 2</li>
  <li class="step">Step 3</li>
</ul>

<!-- With data-content -->
<ul class="steps">
  <li class="step step-primary" data-content="✓">Register</li>
  <li class="step step-primary" data-content="✓">Choose plan</li>
  <li class="step" data-content="?">Purchase</li>
</ul>
```

## Timeline

```html
<ul class="timeline">
  <li>
    <div class="timeline-start">2015</div>
    <div class="timeline-middle">🎯</div>
    <div class="timeline-end">First event</div>
  </li>
  <li>
    <div class="timeline-start">2020</div>
    <div class="timeline-middle">⭐</div>
    <div class="timeline-end">Second event</div>
  </li>
  <li>
    <div class="timeline-start">2024</div>
    <div class="timeline-middle">✨</div>
    <div class="timeline-end">Latest event</div>
  </li>
</ul>

<!-- Horizontal -->
<ul class="timeline timeline-horizontal">
  <!-- Items -->
</ul>

<!-- Compact (all items on one side) -->
<ul class="timeline timeline-compact">
  <!-- Items -->
</ul>

<!-- Snap icons to start -->
<ul class="timeline timeline-snap-icon">
  <!-- Items -->
</ul>
```

## Toast

```html
<div class="toast">
  <div class="alert alert-info">
    <span>New message arrived.</span>
  </div>
</div>

<!-- Positioning -->
<div class="toast toast-top toast-start">
  <div class="alert">Top Start</div>
</div>

<div class="toast toast-top toast-center">
  <div class="alert">Top Center</div>
</div>

<div class="toast toast-top toast-end">
  <div class="alert">Top End</div>
</div>

<div class="toast toast-bottom toast-start">
  <div class="alert">Bottom Start</div>
</div>

<div class="toast toast-bottom toast-center">
  <div class="alert">Bottom Center</div>
</div>

<div class="toast toast-bottom toast-end">
  <div class="alert">Bottom End</div>
</div>

<!-- Middle positions -->
<div class="toast toast-middle toast-start">
  <div class="alert">Middle Start</div>
</div>
```
