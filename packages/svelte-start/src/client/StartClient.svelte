<!--
  StartClient.svelte
  
  The root component for the TanStack Start Svelte client.
  This is the top-level component that wraps RouterProvider and should be
  rendered (or hydrated) in the client entry point.

  @example
  ```svelte
  <script lang="ts">
    import StartClient from '@tanstack/svelte-start/client'
    import { createRouter } from './router'

    const router = createRouter()
  </script>

  <StartClient {router} />
  ```
-->
<script lang="ts">
  import { RouterProvider } from "@tanstack/svelte-router";
  import type { AnyRouter } from "@tanstack/router-core";

  let { router }: { router: AnyRouter } = $props();
</script>

<RouterProvider {router} />
