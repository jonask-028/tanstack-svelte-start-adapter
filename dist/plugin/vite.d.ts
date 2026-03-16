/**
 * TanStack Start Vite Plugin for Svelte
 *
 * This is the main entry point for configuring a TanStack Start + Svelte app.
 * It wraps TanStackStartVitePluginCore with Svelte-specific configuration
 * and automatically includes @sveltejs/vite-plugin-svelte for .svelte compilation.
 *
 * The core plugin provides:
 * - Server function compilation (createServerFn → RPC extraction)
 * - Entry point resolution (client, server, router, start)
 * - Vite 6 environments setup (client + SSR)
 * - Build orchestration (client → server → provider)
 * - Dev server middleware (SSR rendering, HMR, CSS collection)
 * - Route file generation and code splitting
 * - Client asset manifest generation
 *
 * Usage in vite.config.ts:
 *   import { defineConfig } from 'vite'
 *   import { tanstackStart } from '@tanstack/svelte-start/plugin/vite'
 *   export default defineConfig({ plugins: [tanstackStart()] })
 */
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { type TanStackStartInputConfig } from "@tanstack/start-plugin-core";
import type { PluginOption } from "vite";
export interface TanStackStartSvelteOptions {
    /**
     * Options forwarded to @sveltejs/vite-plugin-svelte.
     * See https://github.com/sveltejs/vite-plugin-svelte for full reference.
     */
    svelte?: Parameters<typeof svelte>[0];
    /**
     * TanStack Start configuration passed to the core plugin.
     * Controls routing, entry points, server functions, prerendering, etc.
     *
     * @example
     * ```ts
     * tanstackStart({
     *   tss: {
     *     router: { routesDirectory: './src/pages' },
     *     serverFns: { base: '/_api' },
     *   },
     * })
     * ```
     */
    tss?: TanStackStartInputConfig;
}
declare const DEFAULT_ENTRY_PATHS: {
    readonly client: string;
    readonly server: string;
    readonly start: string;
};
/**
 * Creates the TanStack Start Vite plugin configured for Svelte.
 *
 * This plugin composes:
 * 1. **@sveltejs/vite-plugin-svelte** — Svelte 5 compiler (.svelte → JS)
 * 2. **Svelte-specific shims** — AsyncLocalStorage browser shim, resolve extensions
 * 3. **TanStackStartVitePluginCore** — Server function compilation, entry resolution,
 *    dev server, build orchestration, route generation, manifest
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { defineConfig } from 'vite'
 * import { tanstackStart } from '@tanstack/svelte-start/plugin/vite'
 *
 * export default defineConfig({
 *   plugins: [tanstackStart()],
 * })
 * ```
 *
 * @example
 * ```ts
 * // With customization
 * import { defineConfig } from 'vite'
 * import { tanstackStart } from '@tanstack/svelte-start/plugin/vite'
 *
 * export default defineConfig({
 *   plugins: [
 *     tanstackStart({
 *       svelte: { compilerOptions: { dev: true } },
 *       tss: {
 *         router: { routesDirectory: './src/pages' },
 *         serverFns: { base: '/_api' },
 *       },
 *     }),
 *   ],
 * })
 * ```
 */
export declare function tanstackStart(options?: TanStackStartSvelteOptions): PluginOption[];
export { DEFAULT_ENTRY_PATHS };
export type { TanStackStartInputConfig };
export default tanstackStart;
//# sourceMappingURL=vite.d.ts.map