/**
 * TanStack Start Vite Plugin for Svelte
 *
 * This is the main entry point for configuring a TanStack Start + Svelte app.
 * It wraps TanStackStartVitePluginCore with Svelte-specific defaults and
 * automatically includes @sveltejs/vite-plugin-svelte.
 *
 * Usage in vite.config.ts:
 *   import { defineConfig } from 'vite'
 *   import { tanstackStart } from '@tanstack/svelte-start/plugin/vite'
 *   export default defineConfig({ plugins: [tanstackStart()] })
 */
import { svelte } from "@sveltejs/vite-plugin-svelte";
import type { Plugin } from "vite";
export interface TanStackStartSvelteOptions {
    /**
     * Options forwarded to @sveltejs/vite-plugin-svelte.
     * See https://github.com/sveltejs/vite-plugin-svelte for full reference.
     */
    svelte?: Parameters<typeof svelte>[0];
    /**
     * Root directory for file-based route discovery.
     * @default './src/routes'
     */
    routesDirectory?: string;
    /**
     * File extensions to consider as route files.
     * @default ['.svelte', '.ts']
     */
    routeFileExtensions?: string[];
    /**
     * Generate a `routeTree.gen.ts` file for type-safe routing.
     * @default true
     */
    autoCodeSplitting?: boolean;
    /**
     * TanStack Router config file path (relative to project root).
     * @default 'tsr.config.json'
     */
    tsrConfigPath?: string;
    /**
     * Custom paths for default entry points.
     * These are the files TanStack Start looks for during build.
     */
    entry?: {
        /** Client entry — hydrates the app in the browser. @default './src/entry-client.ts' */
        client?: string;
        /** Server entry — handles SSR rendering. @default './src/entry-server.ts' */
        server?: string;
    };
    /**
     * Enable/disable Vinxi server functions compilation.
     * @default true
     */
    serverFunctions?: boolean;
}
declare const DEFAULT_ENTRY_PATHS: {
    readonly client: "./src/entry-client.ts";
    readonly server: "./src/entry-server.ts";
};
declare const VIRTUAL_MODULES: {
    /** Resolved router instance for SSR and client */
    readonly router: "virtual:tanstack-start/router";
    /** SSR manifest for asset preloading */
    readonly manifest: "virtual:tanstack-start/manifest";
};
/**
 * Creates the TanStack Start Vite plugin configured for Svelte.
 *
 * This plugin:
 * 1. Adds @sveltejs/vite-plugin-svelte for .svelte file compilation
 * 2. Sets up virtual modules for router & manifest
 * 3. Configures SSR build settings
 * 4. Resolves default entry points (client.ts / server.ts)
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
 */
export declare function tanstackStart(options?: TanStackStartSvelteOptions): Plugin[];
export { VIRTUAL_MODULES, DEFAULT_ENTRY_PATHS };
export default tanstackStart;
//# sourceMappingURL=vite.d.ts.map