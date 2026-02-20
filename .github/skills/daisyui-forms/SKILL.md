# DaisyUI 5 Form Components

All form-related components and inputs.

## Input

```html
<input type="text" placeholder="Type here" class="input" />

<!-- Colors -->
<input type="text" class="input input-primary" />
<input type="text" class="input input-secondary" />
<input type="text" class="input input-accent" />
<input type="text" class="input input-info" />
<input type="text" class="input input-success" />
<input type="text" class="input input-warning" />
<input type="text" class="input input-error" />

<!-- Sizes -->
<input type="text" class="input input-xs" />
<input type="text" class="input input-sm" />
<input type="text" class="input input-md" />
<input type="text" class="input input-lg" />
<input type="text" class="input input-xl" />

<!-- Ghost style -->
<input type="text" class="input input-ghost" />
```

## Textarea

```html
<textarea class="textarea" placeholder="Bio"></textarea>

<!-- Colors -->
<textarea class="textarea textarea-primary"></textarea>
<textarea class="textarea textarea-secondary"></textarea>
<textarea class="textarea textarea-accent"></textarea>

<!-- Sizes -->
<textarea class="textarea textarea-xs"></textarea>
<textarea class="textarea textarea-sm"></textarea>
<textarea class="textarea textarea-md"></textarea>
<textarea class="textarea textarea-lg"></textarea>
<textarea class="textarea textarea-xl"></textarea>

<!-- Ghost -->
<textarea class="textarea textarea-ghost"></textarea>
```

## Select

```html
<select class="select">
  <option disabled selected>Pick one</option>
  <option>Option 1</option>
  <option>Option 2</option>
</select>

<!-- Colors -->
<select class="select select-primary">
  <option>Option</option>
</select>

<!-- Sizes -->
<select class="select select-xs">
  <option>Option</option>
</select>
<select class="select select-sm">
  <option>Option</option>
</select>
<select class="select select-md">
  <option>Option</option>
</select>
<select class="select select-lg">
  <option>Option</option>
</select>
<select class="select select-xl">
  <option>Option</option>
</select>

<!-- Ghost -->
<select class="select select-ghost">
  <option>Option</option>
</select>
```

## Checkbox

```html
<input type="checkbox" class="checkbox" />

<!-- Colors -->
<input type="checkbox" class="checkbox checkbox-primary" />
<input type="checkbox" class="checkbox checkbox-secondary" />
<input type="checkbox" class="checkbox checkbox-accent" />
<input type="checkbox" class="checkbox checkbox-neutral" />
<input type="checkbox" class="checkbox checkbox-success" />
<input type="checkbox" class="checkbox checkbox-warning" />
<input type="checkbox" class="checkbox checkbox-info" />
<input type="checkbox" class="checkbox checkbox-error" />

<!-- Sizes -->
<input type="checkbox" class="checkbox checkbox-xs" />
<input type="checkbox" class="checkbox checkbox-sm" />
<input type="checkbox" class="checkbox checkbox-md" />
<input type="checkbox" class="checkbox checkbox-lg" />
<input type="checkbox" class="checkbox checkbox-xl" />
```

## Radio

```html
<input type="radio" name="radio-1" class="radio" />
<input type="radio" name="radio-1" class="radio" checked />

<!-- Colors -->
<input type="radio" name="radio-2" class="radio radio-primary" checked />
<input type="radio" name="radio-3" class="radio radio-secondary" checked />
<input type="radio" name="radio-4" class="radio radio-accent" checked />

<!-- Sizes -->
<input type="radio" class="radio radio-xs" />
<input type="radio" class="radio radio-sm" />
<input type="radio" class="radio radio-md" />
<input type="radio" class="radio radio-lg" />
<input type="radio" class="radio radio-xl" />
```

**Note**: Each set of radio inputs should have unique `name` attributes.

## Toggle

```html
<input type="checkbox" class="toggle" />

<!-- Colors -->
<input type="checkbox" class="toggle toggle-primary" checked />
<input type="checkbox" class="toggle toggle-secondary" checked />
<input type="checkbox" class="toggle toggle-accent" checked />
<input type="checkbox" class="toggle toggle-success" checked />
<input type="checkbox" class="toggle toggle-warning" checked />
<input type="checkbox" class="toggle toggle-info" checked />
<input type="checkbox" class="toggle toggle-error" checked />

<!-- Sizes -->
<input type="checkbox" class="toggle toggle-xs" />
<input type="checkbox" class="toggle toggle-sm" />
<input type="checkbox" class="toggle toggle-md" />
<input type="checkbox" class="toggle toggle-lg" />
<input type="checkbox" class="toggle toggle-xl" />
```

## Range

```html
<input type="range" min="0" max="100" value="40" class="range" />

<!-- Colors -->
<input type="range" min="0" max="100" class="range range-primary" />
<input type="range" min="0" max="100" class="range range-secondary" />
<input type="range" min="0" max="100" class="range range-accent" />

<!-- Sizes -->
<input type="range" class="range range-xs" />
<input type="range" class="range range-sm" />
<input type="range" class="range range-md" />
<input type="range" class="range range-lg" />
<input type="range" class="range range-xl" />
```

**Note**: You must specify `min` and `max` attributes.

## Rating

```html
<div class="rating">
  <input type="radio" name="rating-1" class="rating-hidden" />
  <input type="radio" name="rating-1" class="mask mask-star" />
  <input type="radio" name="rating-1" class="mask mask-star" checked />
  <input type="radio" name="rating-1" class="mask mask-star" />
  <input type="radio" name="rating-1" class="mask mask-star" />
  <input type="radio" name="rating-1" class="mask mask-star" />
</div>

<!-- Half stars -->
<div class="rating rating-half">
  <input type="radio" name="rating-2" class="rating-hidden" />
  <input type="radio" name="rating-2" class="mask mask-star mask-half-1" />
  <input type="radio" name="rating-2" class="mask mask-star mask-half-2" />
  <input
    type="radio"
    name="rating-2"
    class="mask mask-star mask-half-1"
    checked
  />
  <input type="radio" name="rating-2" class="mask mask-star mask-half-2" />
</div>

<!-- Sizes -->
<div class="rating rating-xs">
  <input type="radio" name="rating-3" class="mask mask-star" />
</div>
<div class="rating rating-sm">
  <input type="radio" name="rating-4" class="mask mask-star" />
</div>
<div class="rating rating-md">
  <input type="radio" name="rating-5" class="mask mask-star" />
</div>
<div class="rating rating-lg">
  <input type="radio" name="rating-6" class="mask mask-star" />
</div>
```

**Note**: Each rating should have unique `name` attribute. Add `rating-hidden` first so users can clear rating.

## File Input

```html
<input type="file" class="file-input" />

<!-- Colors -->
<input type="file" class="file-input file-input-primary" />
<input type="file" class="file-input file-input-secondary" />
<input type="file" class="file-input file-input-accent" />

<!-- Sizes -->
<input type="file" class="file-input file-input-xs" />
<input type="file" class="file-input file-input-sm" />
<input type="file" class="file-input file-input-md" />
<input type="file" class="file-input file-input-lg" />
<input type="file" class="file-input file-input-xl" />

<!-- Ghost -->
<input type="file" class="file-input file-input-ghost" />
```

## Label

```html
<!-- Regular label -->
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

## Fieldset

```html
<fieldset class="fieldset">
  <legend class="fieldset-legend">Personal Information</legend>
  <input type="text" class="input" placeholder="Name" />
  <input type="email" class="input" placeholder="Email" />
  <p class="label">Please enter your personal details</p>
</fieldset>
```

## Validator

Shows error/success colors based on validation:

```html
<input type="email" class="input validator" required />
<p class="validator-hint">Please enter a valid email</p>

<input type="password" class="input validator" minlength="8" required />
<p class="validator-hint">Password must be at least 8 characters</p>
```

**Note**: Works with `input`, `select`, `textarea`. Uses HTML5 validation rules.

## Filter

Group of radio buttons where only one is visible:

```html
<!-- Using form -->
<form class="filter">
  <input class="btn btn-square" type="reset" value="×" />
  <input class="btn" type="radio" name="filter-1" aria-label="Option 1" />
  <input class="btn" type="radio" name="filter-1" aria-label="Option 2" />
  <input class="btn" type="radio" name="filter-1" aria-label="Option 3" />
</form>

<!-- Without form -->
<div class="filter">
  <input class="btn filter-reset" type="radio" name="filter-2" aria-label="×" />
  <input class="btn" type="radio" name="filter-2" aria-label="Option 1" />
  <input class="btn" type="radio" name="filter-2" aria-label="Option 2" />
</div>
```

## Theme Controller

Checkbox/radio to control page theme:

```html
<input type="checkbox" value="dark" class="theme-controller" />

<!-- Multiple themes with radio -->
<input
  type="radio"
  name="theme"
  value="light"
  class="theme-controller"
  checked
/>
<input type="radio" name="theme" value="dark" class="theme-controller" />
<input type="radio" name="theme" value="cupcake" class="theme-controller" />
```

**Note**: The page theme changes to match the checked input's `value` attribute.
