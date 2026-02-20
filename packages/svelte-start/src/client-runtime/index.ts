/**
 * @tanstack/svelte-start/client-runtime
 *
 * Client-side runtime utilities for TanStack Start + Svelte.
 * Re-exports hydration utilities and provides browser-specific helpers.
 */

export { hydrateStart, StartClient } from "../client/index.js";
export type { HydrateStartOptions } from "../client/index.js";

/**
 * Retrieve dehydrated router state from the server.
 * This reads from `window.__TSR_DEHYDRATED__` which is injected during SSR.
 */
export function getDehydratedState(): unknown {
  if (typeof window === "undefined") return undefined;
  return (window as any).__TSR_DEHYDRATED__;
}

/**
 * Check if the app is running in SSR mode.
 */
export function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

/**
 * Check if the app has already been hydrated.
 * This prevents double-hydration in development with HMR.
 */
let _hydrated = false;

export function isHydrated(): boolean {
  return _hydrated;
}

export function markHydrated(): void {
  _hydrated = true;
}
