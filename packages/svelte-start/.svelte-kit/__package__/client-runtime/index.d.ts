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
export declare function getDehydratedState(): unknown;
/**
 * Check if the app is running in SSR mode.
 */
export declare function isServer(): boolean;
export declare function isHydrated(): boolean;
export declare function markHydrated(): void;
//# sourceMappingURL=index.d.ts.map