<!--
  Home Page (/)
-->
<script lang="ts">
  let count = $state(0);
</script>

<div>
  <h2>Welcome to TanStack Start + Svelte!</h2>
  <p>This is a full-stack Svelte 5 application powered by TanStack Start.</p>

  <div class="counter">
    <button onclick={() => count--}>-</button>
    <span>{count}</span>
    <button onclick={() => count++}>+</button>
  </div>

  <p class="hint">
    This counter uses Svelte 5's <code>$state</code> rune for reactivity.
  </p>
</div>

<style>
  .counter {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 2rem 0;
  }

  .counter button {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;
    transition: background-color 0.15s;
  }

  .counter button:hover {
    background: #edf2f7;
  }

  .counter span {
    font-size: 1.5rem;
    font-weight: 600;
    min-width: 3rem;
    text-align: center;
  }

  .hint {
    color: #718096;
    font-size: 0.875rem;
  }

  code {
    background: #edf2f7;
    padding: 0.125rem 0.375rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }
</style>
