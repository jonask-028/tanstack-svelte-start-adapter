<!--
  About Page (/about)
-->

<div>
  <h2>About</h2>
  <p>
    This is a TanStack Start application using Svelte 5 as the rendering
    framework.
  </p>

  <h3>Architecture</h3>
  <ul>
    <li>
      <strong>Routing</strong> — TanStack Router with type-safe file-based routes
    </li>
    <li>
      <strong>Server Functions</strong> — <code>createServerFn</code> for RPC-style
      server calls
    </li>
    <li>
      <strong>SSR</strong> — Full server-side rendering with client hydration
    </li>
    <li>
      <strong>Svelte 5</strong> — Modern runes (<code>$state</code>,
      <code>$derived</code>, <code>$effect</code>)
    </li>
  </ul>

  <h3>Packages</h3>
  <ul>
    <li>
      <code>@tanstack/svelte-router</code> — Router components and hooks for Svelte
    </li>
    <li>
      <code>@tanstack/svelte-start</code> — Full-stack framework (Vite plugin, SSR,
      server functions)
    </li>
  </ul>
</div>

<style>
  h3 {
    margin-top: 1.5rem;
  }

  ul {
    line-height: 1.8;
  }

  code {
    background: #edf2f7;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
</style>
