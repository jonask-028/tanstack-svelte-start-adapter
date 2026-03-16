/**
 * @tanstack/svelte-start/client
 *
 * Client-side entry utilities for TanStack Start + Svelte.
 * Provides StartClient component and hydrateStart() for browser hydration.
 */

import { hydrate, mount } from "svelte";
import type { AnyRouter } from "@tanstack/router-core";
import StartClient from "./StartClient.svelte";

export { default as StartClient } from "./StartClient.svelte";

// ============================================================================
// Type Definitions
// ============================================================================

export interface HydrateStartOptions {
  /**
   * The router instance to hydrate with.
   * Must be the same router used during SSR.
   */
  router: AnyRouter;

  /**
   * Target DOM element to hydrate into.
   * @default document.getElementById('__app')
   */
  target?: HTMLElement;

  /**
   * Whether to use full hydration (true) or client-only mount (false).
   * Hydration preserves server-rendered HTML and attaches event listeners.
   * Mount replaces the target's contents entirely.
   * @default true
   */
  hydrate?: boolean;
}

// ============================================================================
// hydrateStart
// ============================================================================

/**
 * Hydrate a TanStack Start Svelte application in the browser.
 *
 * This function should be called in the client entry point (entry-client.ts).
 * It hydrates (or mounts) the StartClient component onto the target element,
 * connecting the router to the server-rendered HTML.
 *
 * @example
 * ```ts
 * // src/entry-client.ts
 * import { hydrateStart } from '@tanstack/svelte-start/client'
 * import { getRouter } from './router'
 *
 * const router = getRouter()
 *
 * hydrateStart({ router })
 * ```
 *
 * @example
 * ```ts
 * // Client-only mount (no SSR)
 * hydrateStart({
 *   router,
 *   hydrate: false,
 *   target: document.getElementById('app')!,
 * })
 * ```
 */
export function hydrateStart(
  options: HydrateStartOptions,
): ReturnType<typeof hydrate> | ReturnType<typeof mount> {
  const {
    router,
    target = document.getElementById("__app")!,
    hydrate: shouldHydrate = true,
  } = options;

  if (!target) {
    throw new Error(
      "[TanStack Start] Could not find target element for hydration. " +
        'Expected an element with id="__app". ' +
        'Make sure your server renders the app into <div id="__app">.',
    );
  }

  // Hydrate the router with server-dehydrated state if available
  const dehydrated = (globalThis as any).__TSR_DEHYDRATED__;
  if (dehydrated && router.options.hydrate) {
    try {
      router.options.hydrate(dehydrated);
    } catch {
      // If custom hydrate fails, fall through to default behavior
    }
  } else if (dehydrated?.state) {
    // Default hydration: restore dehydrated router state
    try {
      router.update({
        ...router.options,
        context: {
          ...router.options.context,
          ...dehydrated.state?.routeContext,
        },
      } as any);
    } catch {
      // Silently ignore hydration errors — the router will re-load
    }
  }

  // Mark router as client-side and trigger route loading
  (router as any).isServer = false;
  void router.load();

  const mountFn = shouldHydrate ? hydrate : mount;

  return mountFn(StartClient, {
    target,
    props: { router },
  });
}
