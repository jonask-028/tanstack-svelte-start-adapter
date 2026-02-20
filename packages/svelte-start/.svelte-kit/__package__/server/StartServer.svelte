<!--
  StartServer.svelte

  Server-side root component for TanStack Start + Svelte.
  Renders the full HTML document shell including html, head, and body.
  The router's matched route components render inside the __app div.

  This component is used by the server handler during SSR and should NOT
  be imported in client-side code.
-->
<script lang="ts">
  import { RouterProvider } from "@tanstack/svelte-router";
  import type { AnyRouter } from "@tanstack/router-core";

  let { router }: { router: AnyRouter } = $props();

  // Collect head tags from router state (meta, links, scripts)
  let headTags = $derived(
    router.state.matches.flatMap((match: any) => {
      const meta = match.meta ?? [];
      const links = match.links ?? [];
      const scripts = match.scripts ?? [];
      return [...meta, ...links, ...scripts];
    }),
  );

  // Collect dehydrated data for client hydration
  let dehydratedState = $derived(
    router.options.dehydrate
      ? router.options.dehydrate()
      : { state: router.state },
  );
</script>

<!-- svelte-ignore a11y_missing_attribute -->
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    {#each headTags as tag}
      {#if tag.tag === "title"}
        <title>{tag.children}</title>
      {:else if tag.tag === "meta"}
        <meta {...tag.attrs} />
      {:else if tag.tag === "link"}
        <link {...tag.attrs} />
      {:else if tag.tag === "script"}
        {#if tag.attrs?.src}
          <script src={tag.attrs.src} {...tag.attrs}></script>
        {:else if tag.children}
          {@html `<script${Object.entries(tag.attrs ?? {})
            .map(([k, v]) => ` ${k}="${v}"`)
            .join("")}>${tag.children}</script>`}
        {/if}
      {:else if tag.tag === "style"}
        {@html `<style${Object.entries(tag.attrs ?? {})
          .map(([k, v]) => ` ${k}="${v}"`)
          .join("")}>${tag.children ?? ""}</style>`}
      {/if}
    {/each}
  </head>
  <body>
    <div id="__app">
      <RouterProvider {router} />
    </div>

    <!-- Inject dehydrated state for client hydration -->
    {@html `<script>window.__TSR_DEHYDRATED__ = ${JSON.stringify(dehydratedState)}</script>`}
  </body>
</html>
