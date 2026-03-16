/**
 * @tanstack/svelte-start/client-runtime
 *
 * Client-side runtime utilities for TanStack Start + Svelte.
 * Re-exports hydration utilities and provides browser-specific helpers.
 */
export { hydrateStart, StartClient } from "../client/index.js";
/**
 * Retrieve dehydrated router state from the server.
 * This reads from `window.__TSR_DEHYDRATED__` which is injected during SSR.
 */
export function getDehydratedState() {
    if (typeof window === "undefined")
        return undefined;
    return window.__TSR_DEHYDRATED__;
}
/**
 * Check if the app is running in SSR mode.
 */
export function isServer() {
    return typeof window === "undefined" || typeof document === "undefined";
}
/**
 * Check if the app has already been hydrated.
 * This prevents double-hydration in development with HMR.
 */
let _hydrated = false;
export function isHydrated() {
    return _hydrated;
}
export function markHydrated() {
    _hydrated = true;
}
