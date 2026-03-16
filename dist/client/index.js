/**
 * @tanstack/svelte-start/client
 *
 * Client-side entry utilities for TanStack Start + Svelte.
 * Provides StartClient component and hydrateStart() for browser hydration.
 */
import { hydrate, mount } from "svelte";
import StartClient from "./StartClient.svelte";
export { default as StartClient } from "./StartClient.svelte";
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
export function hydrateStart(options) {
    const { router, target = document.getElementById("__app"), hydrate: shouldHydrate = true, } = options;
    if (!target) {
        throw new Error("[TanStack Start] Could not find target element for hydration. " +
            'Expected an element with id="__app". ' +
            'Make sure your server renders the app into <div id="__app">.');
    }
    // Hydrate the router with server-dehydrated state if available
    const dehydrated = globalThis.__TSR_DEHYDRATED__;
    if (dehydrated && router.options.hydrate) {
        try {
            router.options.hydrate(dehydrated);
        }
        catch {
            // If custom hydrate fails, fall through to default behavior
        }
    }
    else if (dehydrated?.state) {
        // Default hydration: restore dehydrated router state
        try {
            router.update({
                ...router.options,
                context: {
                    ...router.options.context,
                    ...dehydrated.state?.routeContext,
                },
            });
        }
        catch {
            // Silently ignore hydration errors — the router will re-load
        }
    }
    // Mark router as client-side and trigger route loading
    router.isServer = false;
    void router.load();
    const mountFn = shouldHydrate ? hydrate : mount;
    return mountFn(StartClient, {
        target,
        props: { router },
    });
}
