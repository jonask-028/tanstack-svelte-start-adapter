# DaisyUI 5 Data Display Components

Components for displaying data and information.

## Table

```html
<div class="overflow-x-auto">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Company</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Littel, Schaden and Vandervort</td>
      </tr>
      <tr>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Zemlak, Daniel and Leannon</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Zebra stripes -->
<table class="table table-zebra">
  <!-- Content -->
</table>

<!-- Pin rows (sticky header) -->
<table class="table table-pin-rows">
  <!-- Content -->
</table>

<!-- Pin columns (sticky first column) -->
<table class="table table-pin-cols">
  <!-- Content -->
</table>

<!-- Sizes -->
<table class="table table-xs">
  ...
</table>
<table class="table table-sm">
  ...
</table>
<table class="table table-md">
  ...
</table>
<table class="table table-lg">
  ...
</table>
<table class="table table-xl">
  ...
</table>
```

**Note**: Wrap table in `overflow-x-auto` for horizontal scrolling on small screens.

## Stats

```html
<div class="stats">
  <div class="stat">
    <div class="stat-title">Total Page Views</div>
    <div class="stat-value">89,400</div>
    <div class="stat-desc">21% more than last month</div>
  </div>
</div>

<!-- Multiple stats -->
<div class="stats">
  <div class="stat">
    <div class="stat-figure">📊</div>
    <div class="stat-title">Downloads</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div class="stat">
    <div class="stat-figure">👥</div>
    <div class="stat-title">New Users</div>
    <div class="stat-value">4,200</div>
    <div class="stat-desc">↗︎ 400 (22%)</div>
  </div>

  <div class="stat">
    <div class="stat-figure">💰</div>
    <div class="stat-title">New Registers</div>
    <div class="stat-value">1,200</div>
    <div class="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>

<!-- Vertical -->
<div class="stats stats-vertical">
  <div class="stat">...</div>
  <div class="stat">...</div>
</div>

<!-- With actions -->
<div class="stat">
  <div class="stat-title">Account balance</div>
  <div class="stat-value">$89,400</div>
  <div class="stat-actions">
    <button class="btn btn-sm btn-success">Add funds</button>
  </div>
</div>
```

## Progress

```html
<progress class="progress" value="70" max="100"></progress>

<!-- Colors -->
<progress class="progress progress-primary" value="70" max="100"></progress>
<progress class="progress progress-secondary" value="70" max="100"></progress>
<progress class="progress progress-accent" value="70" max="100"></progress>
<progress class="progress progress-info" value="70" max="100"></progress>
<progress class="progress progress-success" value="70" max="100"></progress>
<progress class="progress progress-warning" value="70" max="100"></progress>
<progress class="progress progress-error" value="70" max="100"></progress>

<!-- Indeterminate (no value attribute) -->
<progress class="progress"></progress>
```

## Radial Progress

```html
<div
  class="radial-progress"
  style="--value:70;"
  aria-valuenow="70"
  role="progressbar"
>
  70%
</div>

<!-- Different values -->
<div
  class="radial-progress"
  style="--value:0;"
  aria-valuenow="0"
  role="progressbar"
>
  0%
</div>
<div
  class="radial-progress"
  style="--value:50;"
  aria-valuenow="50"
  role="progressbar"
>
  50%
</div>
<div
  class="radial-progress"
  style="--value:100;"
  aria-valuenow="100"
  role="progressbar"
>
  100%
</div>

<!-- Custom size and thickness -->
<div
  class="radial-progress"
  style="--value:70; --size:12rem; --thickness:2px;"
  aria-valuenow="70"
  role="progressbar"
>
  70%
</div>
```

**Note**: Must include `aria-valuenow` for accessibility. Use `div` not `progress` tag.

## Countdown

```html
<span class="countdown">
  <span style="--value:15;">15</span>
</span>

<!-- Full countdown -->
<span class="countdown">
  <span style="--value:15;">15</span>: <span style="--value:10;">10</span>:
  <span style="--value:24;">24</span>
</span>
```

**Note**: Value must be 0-999. Update `--value` and text content with JS. Add `aria-live="polite"` and `aria-label` for accessibility.

## Kbd (Keyboard Key)

```html
<kbd class="kbd">ctrl</kbd>
<kbd class="kbd">alt</kbd>
<kbd class="kbd">del</kbd>

<!-- Sizes -->
<kbd class="kbd kbd-xs">⌘</kbd>
<kbd class="kbd kbd-sm">⌘</kbd>
<kbd class="kbd kbd-md">⌘</kbd>
<kbd class="kbd kbd-lg">⌘</kbd>
<kbd class="kbd kbd-xl">⌘</kbd>

<!-- Combination -->
<div>
  <kbd class="kbd">ctrl</kbd>
  +
  <kbd class="kbd">shift</kbd>
  +
  <kbd class="kbd">del</kbd>
</div>
```

## Skeleton

```html
<div class="skeleton h-4 w-28"></div>
<div class="skeleton h-4 w-full"></div>
<div class="skeleton h-32 w-32"></div>

<!-- Text skeleton -->
<div class="skeleton skeleton-text">Loading data...</div>

<!-- In card -->
<div class="card">
  <div class="skeleton h-32 w-full"></div>
  <div class="card-body">
    <div class="skeleton h-4 w-28"></div>
    <div class="skeleton h-4 w-full"></div>
    <div class="skeleton h-4 w-full"></div>
  </div>
</div>
```

## Divider

```html
<div class="divider">OR</div>

<!-- Vertical -->
<div class="divider divider-vertical">OR</div>

<!-- Horizontal (default) -->
<div class="divider divider-horizontal">OR</div>

<!-- Colors -->
<div class="divider divider-primary">OR</div>
<div class="divider divider-secondary">OR</div>
<div class="divider divider-accent">OR</div>

<!-- Placement -->
<div class="divider divider-start">Start</div>
<div class="divider divider-end">End</div>

<!-- Without text -->
<div class="divider"></div>
```

## Status

Tiny icon for showing status (online, offline, etc.):

```html
<span class="status"></span>
<span class="status status-primary"></span>
<span class="status status-success"></span>
<span class="status status-error"></span>

<!-- Sizes -->
<span class="status status-xs"></span>
<span class="status status-sm"></span>
<span class="status status-md"></span>
<span class="status status-lg"></span>
<span class="status status-xl"></span>

<!-- Common usage with avatar -->
<div class="avatar">
  <div class="w-24">
    <img src="user.jpg" alt="User" />
  </div>
  <span class="status status-success"></span>
</div>
```

## Loading

```html
<span class="loading loading-spinner"></span>
<span class="loading loading-dots"></span>
<span class="loading loading-ring"></span>
<span class="loading loading-ball"></span>
<span class="loading loading-bars"></span>
<span class="loading loading-infinity"></span>

<!-- Sizes -->
<span class="loading loading-spinner loading-xs"></span>
<span class="loading loading-spinner loading-sm"></span>
<span class="loading loading-spinner loading-md"></span>
<span class="loading loading-spinner loading-lg"></span>
<span class="loading loading-spinner loading-xl"></span>

<!-- In button -->
<button class="btn">
  <span class="loading loading-spinner"></span>
  Loading
</button>
```

## Chat

```html
<div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10">
      <img src="user1.jpg" alt="User" />
    </div>
  </div>
  <div class="chat-header">
    Obi-Wan Kenobi
    <time class="text-xs opacity-50">12:45</time>
  </div>
  <div class="chat-bubble">You were the Chosen One!</div>
  <div class="chat-footer">
    <span class="opacity-50">Delivered</span>
  </div>
</div>

<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10">
      <img src="user2.jpg" alt="User" />
    </div>
  </div>
  <div class="chat-header">Anakin</div>
  <div class="chat-bubble">I hate you!</div>
</div>

<!-- Colors -->
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-primary">Primary</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-secondary">Secondary</div>
</div>
<div class="chat chat-start">
  <div class="chat-bubble chat-bubble-accent">Accent</div>
</div>
```

**Note**: Use `chat-start` for left-aligned messages, `chat-end` for right-aligned.
