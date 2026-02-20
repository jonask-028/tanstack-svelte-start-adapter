# DaisyUI 5 Mockup Components

Components that mimic the appearance of devices and interfaces.

## Mockup Browser

```html
<div class="mockup-browser">
  <div class="mockup-browser-toolbar">
    <div class="input">https://daisyui.com</div>
  </div>
  <div class="px-4 py-16">
    <h1>Hello!</h1>
    <p>This looks like a browser window.</p>
  </div>
</div>

<!-- With background -->
<div class="mockup-browser bg-base-300">
  <div class="mockup-browser-toolbar">
    <div class="input">https://example.com</div>
  </div>
  <div class="bg-base-200 px-4 py-16">Content here</div>
</div>
```

## Mockup Window

```html
<div class="mockup-window bg-base-300">
  <div class="bg-base-200 px-4 py-16">
    <h1>Hello!</h1>
    <p>This looks like an OS window.</p>
  </div>
</div>

<!-- With border -->
<div class="mockup-window bg-base-300 border">
  <div class="bg-base-200 px-4 py-16">Content here</div>
</div>
```

## Mockup Phone

```html
<div class="mockup-phone">
  <div class="mockup-phone-camera"></div>
  <div class="mockup-phone-display">
    <div class="artboard artboard-demo phone-1">
      <h1>Hi.</h1>
      <p>This looks like an iPhone.</p>
    </div>
  </div>
</div>

<!-- With app content -->
<div class="mockup-phone">
  <div class="mockup-phone-camera"></div>
  <div class="mockup-phone-display">
    <div class="artboard phone-1">
      <!-- Your app UI goes here -->
      <div class="navbar">
        <div class="navbar-start">
          <a class="btn btn-ghost">App Name</a>
        </div>
      </div>
      <div class="p-4">
        <p>App content</p>
      </div>
    </div>
  </div>
</div>
```

## Mockup Code

```html
<div class="mockup-code">
  <pre data-prefix="$"><code>npm i daisyui</code></pre>
  <pre data-prefix=">"><code>installing...</code></pre>
  <pre data-prefix=">"><code>Done!</code></pre>
</div>

<!-- Different prefixes -->
<div class="mockup-code">
  <pre data-prefix="1"><code>function hello() {</code></pre>
  <pre data-prefix="2"><code>  console.log('Hello World!');</code></pre>
  <pre data-prefix="3"><code>}</code></pre>
</div>

<!-- With highlighting -->
<div class="mockup-code">
  <pre data-prefix="$"><code>npm i daisyui</code></pre>
  <pre
    data-prefix=">"
    class="bg-warning text-warning-content"
  ><code>installing...</code></pre>
  <pre
    data-prefix=">"
    class="bg-success text-success-content"
  ><code>Done!</code></pre>
</div>

<!-- Different colors for different lines -->
<div class="mockup-code">
  <pre data-prefix="$"><code>npm i daisyui</code></pre>
  <pre data-prefix=">" class="text-warning"><code>installing...</code></pre>
  <pre data-prefix=">" class="text-success"><code>Done!</code></pre>
</div>
```

**Note**: Use `data-prefix` to show text before each line. Add background/text colors to highlight specific lines. Use `<code>` tag for syntax highlighting (requires additional library).

## Artboard

Useful for phone mockups and demos:

```html
<!-- Phone sizes -->
<div class="artboard phone-1">320×568</div>
<div class="artboard phone-2">375×667</div>
<div class="artboard phone-3">414×736</div>
<div class="artboard phone-4">375×812</div>
<div class="artboard phone-5">414×896</div>
<div class="artboard phone-6">320×1024</div>

<!-- Tablet -->
<div class="artboard tablet">768×1024</div>

<!-- Desktop -->
<div class="artboard artboard-horizontal">1280×720</div>

<!-- Demo mode (with border) -->
<div class="artboard artboard-demo phone-1">
  <p>Demo content</p>
</div>
```

## List (for mockups)

Display information in rows:

```html
<ul class="list">
  <li class="list-row">
    <span>📧</span>
    <span>Email</span>
    <span>user@example.com</span>
  </li>
  <li class="list-row">
    <span>📱</span>
    <span>Phone</span>
    <span>+1 234 567 8900</span>
  </li>
  <li class="list-row">
    <span>🏠</span>
    <span>Address</span>
    <span>123 Main St</span>
  </li>
</ul>

<!-- Second child fills remaining space by default -->
<ul class="list">
  <li class="list-row">
    <span>Icon</span>
    <span>This grows to fill space</span>
    <span>Value</span>
  </li>
</ul>

<!-- Make different child grow -->
<ul class="list">
  <li class="list-row">
    <span>Fixed</span>
    <span>Fixed</span>
    <span class="list-col-grow">This grows</span>
  </li>
</ul>

<!-- Force wrap -->
<ul class="list">
  <li class="list-row">
    <span>Label</span>
    <span class="list-col-wrap">This wraps to next line</span>
  </li>
</ul>
```
