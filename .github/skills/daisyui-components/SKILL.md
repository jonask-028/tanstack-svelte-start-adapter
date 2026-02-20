# DaisyUI 5 Common Components

Quick reference for frequently used components.

## Button

```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-link">Link</button>

<!-- Sizes -->
<button class="btn btn-xs">Tiny</button>
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>

<!-- Modifiers -->
<button class="btn btn-wide">Wide</button>
<button class="btn btn-block">Block</button>
<button class="btn btn-circle">+</button>
<button class="btn btn-square">□</button>
```

**Colors**: `btn-neutral`, `btn-primary`, `btn-secondary`, `btn-accent`, `btn-info`, `btn-success`, `btn-warning`, `btn-error`

**Styles**: `btn-outline`, `btn-dash`, `btn-soft`, `btn-ghost`, `btn-link`

**Behaviors**: `btn-active`, `btn-disabled`

## Card

```html
<div class="card">
  <figure><img src="image.jpg" alt="Description" /></figure>
  <div class="card-body">
    <h2 class="card-title">Card Title</h2>
    <p>Card content goes here</p>
    <div class="card-actions">
      <button class="btn btn-primary">Action</button>
    </div>
  </div>
</div>

<!-- With border -->
<div class="card card-border">...</div>

<!-- Side layout -->
<div class="card card-side">...</div>

<!-- Sizes -->
<div class="card card-xs">...</div>
<div class="card card-sm">...</div>
<div class="card card-md">...</div>
<div class="card card-lg">...</div>
<div class="card card-xl">...</div>
```

## Modal

```html
<!-- Using dialog element (recommended) -->
<button onclick="my_modal.showModal()">Open Modal</button>
<dialog id="my_modal" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">Modal Title</h3>
    <p class="py-4">Modal content</p>
    <div class="modal-action">
      <form method="dialog">
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
```

**Placements**: `modal-top`, `modal-middle`, `modal-bottom`, `modal-start`, `modal-end`

## Alert

```html
<div role="alert" class="alert">
  <span>Default alert</span>
</div>

<div role="alert" class="alert alert-info">
  <span>Info alert</span>
</div>

<div role="alert" class="alert alert-success">
  <span>Success alert</span>
</div>

<div role="alert" class="alert alert-warning">
  <span>Warning alert</span>
</div>

<div role="alert" class="alert alert-error">
  <span>Error alert</span>
</div>

<!-- Styles -->
<div role="alert" class="alert alert-outline">Outline</div>
<div role="alert" class="alert alert-soft">Soft</div>
```

## Input

```html
<input type="text" placeholder="Type here" class="input" />
<input type="text" placeholder="Primary" class="input input-primary" />

<!-- Sizes -->
<input type="text" class="input input-xs" />
<input type="text" class="input input-sm" />
<input type="text" class="input input-md" />
<input type="text" class="input input-lg" />
<input type="text" class="input input-xl" />

<!-- With label -->
<label class="input">
  <span class="label">Email</span>
  <input type="email" placeholder="you@example.com" />
</label>

<!-- Floating label -->
<label class="floating-label">
  <input type="text" placeholder="Type here" class="input" />
  <span>Email Address</span>
</label>
```

**Colors**: `input-neutral`, `input-primary`, `input-secondary`, `input-accent`, `input-info`, `input-success`, `input-warning`, `input-error`

## Badge

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-ghost">Ghost</span>
<span class="badge badge-outline">Outline</span>

<!-- Sizes -->
<span class="badge badge-xs">XS</span>
<span class="badge badge-sm">SM</span>
<span class="badge badge-md">MD</span>
<span class="badge badge-lg">LG</span>
<span class="badge badge-xl">XL</span>
```

## Avatar

```html
<!-- Single avatar -->
<div class="avatar">
  <div class="w-24">
    <img src="avatar.jpg" alt="User" />
  </div>
</div>

<!-- Avatar group -->
<div class="avatar-group -space-x-6">
  <div class="avatar">
    <div class="w-12">
      <img src="user1.jpg" alt="User 1" />
    </div>
  </div>
  <div class="avatar">
    <div class="w-12">
      <img src="user2.jpg" alt="User 2" />
    </div>
  </div>
</div>

<!-- With status -->
<div class="avatar avatar-online">
  <div class="w-24">
    <img src="avatar.jpg" alt="User" />
  </div>
</div>

<!-- Placeholder -->
<div class="avatar avatar-placeholder">
  <div class="w-24">
    <span>JK</span>
  </div>
</div>

<!-- With mask -->
<div class="avatar">
  <div class="mask mask-squircle w-24">
    <img src="avatar.jpg" alt="User" />
  </div>
</div>
```

**Note**: Use `w-*` and `h-*` for custom sizes. Use mask classes like `mask-squircle`, `mask-hexagon`, `mask-circle`.

## Join (Button Group)

```html
<div class="join">
  <button class="btn join-item">Button 1</button>
  <button class="btn join-item">Button 2</button>
  <button class="btn join-item">Button 3</button>
</div>

<!-- Vertical -->
<div class="join join-vertical">
  <button class="btn join-item">Button 1</button>
  <button class="btn join-item">Button 2</button>
</div>

<!-- Responsive -->
<div class="join lg:join-horizontal">
  <button class="btn join-item">Button 1</button>
  <button class="btn join-item">Button 2</button>
</div>
```

## Menu

```html
<!-- Vertical menu -->
<ul class="menu">
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
  <li><button>Item 3</button></li>
</ul>

<!-- Horizontal menu -->
<ul class="menu menu-horizontal">
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
</ul>

<!-- With title -->
<ul class="menu">
  <li class="menu-title">Category</li>
  <li><button>Item 1</button></li>
  <li><button>Item 2</button></li>
</ul>

<!-- With submenu -->
<ul class="menu">
  <li>
    <details>
      <summary>Parent</summary>
      <ul>
        <li><button>Child 1</button></li>
        <li><button>Child 2</button></li>
      </ul>
    </details>
  </li>
</ul>
```

**Sizes**: `menu-xs`, `menu-sm`, `menu-md`, `menu-lg`, `menu-xl`
