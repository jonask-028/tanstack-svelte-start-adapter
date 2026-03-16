/**
 * @tanstack/svelte-start/client
 *
 * Client-side entry utilities for TanStack Start + Svelte.
 * Provides StartClient component and hydrateStart() for browser hydration.
 */
import { hydrate, mount } from "svelte";
import type { AnyRouter } from "@tanstack/router-core";
export { default as StartClient } from "./StartClient.svelte";
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
export declare function hydrateStart(options: HydrateStartOptions): ReturnType<typeof hydrate> | ReturnType<typeof mount>;
//# sourceMappingURL=index.d.ts.map