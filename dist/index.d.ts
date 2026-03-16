/**
 * @tanstack/svelte-start
 *
 * Main entry point for TanStack Start + Svelte.
 * Re-exports server function utilities from start-client-core
 * and provides the Svelte-specific `useServerFn` wrapper.
 *
 * Note: Router primitives (Link, Outlet, useParams, etc.) are imported
 * from `@tanstack/svelte-router` directly — they are NOT re-exported here
 * to keep the two packages cleanly separated.
 */
export { createServerFn } from "@tanstack/start-client-core";
export { createMiddleware } from "@tanstack/start-client-core";
export { createStart } from "@tanstack/start-client-core";
export type { StartInstance, AnyStartInstance, StartInstanceOptions, AnyStartInstanceOptions, } from "@tanstack/start-client-core";
export { createServerOnlyFn, createClientOnlyFn, createIsomorphicFn, } from "@tanstack/start-client-core";
export type { ServerOnlyFn, ClientOnlyFn, IsomorphicFn, } from "@tanstack/start-client-core";
/**
 * useServerFn — Wraps a createServerFn result for use in Svelte components.
 *
 * In Svelte, server functions are already callable without a hook wrapper
 * (unlike React where hooks are needed for state management). This utility
 * is provided for API parity and to allow adding reactive state tracking
 * around server function calls.
 *
 * @example
 * ```svelte
 * <script lang="ts">
 *   import { createServerFn } from '@tanstack/svelte-start'
 *
 *   const getUsers = createServerFn({ method: 'GET' })
 *     .handler(async () => {
 *       return prisma.user.findMany()
 *     })
 *
 *   // Direct call — works without any wrapper
 *   let users = $state<Awaited<ReturnType<typeof getUsers>>>([])
 *
 *   async function loadUsers() {
 *     users = await getUsers()
 *   }
 * </script>
 * ```
 */
export declare function useServerFn<TFn extends (...args: Array<any>) => Promise<any>>(serverFn: TFn): TFn;
//# sourceMappingURL=index.d.ts.map