<!--
  Root Layout

  This is the root layout component rendered for every route.
  It provides the app shell with navigation and renders child routes
  via the <Outlet /> component.
-->
<script lang="ts">
  import { Outlet, Link } from "@tanstack/svelte-router";
</script>

<div class="app">
  <header>
    <h1>TanStack Start + Svelte</h1>
    <nav>
      <Link to="/" activeProps={{ class: "active" }}>Home</Link>
      <Link to="/about" activeProps={{ class: "active" }}>About</Link>
      <Link to="/posts" activeProps={{ class: "active" }}>Posts</Link>
    </nav>
  </header>

  <main>
    <Outlet />
  </main>
</div>

<style>
  .app {
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 1rem;
  }

  header {
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 1rem;
    margin-bottom: 2rem;
  }

  h1 {
    font-size: 1.5rem;
    margin: 0 0 1rem;
  }

  nav {
    display: flex;
    gap: 1rem;
  }

  nav :global(a) {
    color: #4a5568;
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: background-color 0.15s;
  }

  nav :global(a:hover) {
    background-color: #edf2f7;
  }

  nav :global(a.active) {
    color: #2b6cb0;
    font-weight: 600;
    background-color: #ebf8ff;
  }

  main {
    min-height: 50vh;
  }
</style>
