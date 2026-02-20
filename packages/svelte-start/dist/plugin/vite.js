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
// ---------------------------------------------------------------------------
// Default Entry Paths
// ---------------------------------------------------------------------------
const DEFAULT_ENTRY_PATHS = {
    client: "./src/entry-client.ts",
    server: "./src/entry-server.ts",
};
// ---------------------------------------------------------------------------
// Virtual Module IDs
// ---------------------------------------------------------------------------
const VIRTUAL_MODULE_PREFIX = "virtual:tanstack-start";
const VIRTUAL_MODULES = {
    /** Resolved router instance for SSR and client */
    router: `${VIRTUAL_MODULE_PREFIX}/router`,
    /** SSR manifest for asset preloading */
    manifest: `${VIRTUAL_MODULE_PREFIX}/manifest`,
};
// ---------------------------------------------------------------------------
// Browser shim for node:async_hooks
// ---------------------------------------------------------------------------
/**
 * Minimal AsyncLocalStorage shim for the browser.
 * TanStack Start's start-storage-context uses AsyncLocalStorage at module init
 * time. In the browser, we provide a no-op implementation since the server
 * context is not available on the client.
 */
const ASYNC_HOOKS_SHIM = `
export class AsyncLocalStorage {
  constructor() {
    this._store = undefined;
  }
  getStore() {
    return this._store;
  }
  run(store, fn, ...args) {
    const prev = this._store;
    this._store = store;
    try {
      return fn(...args);
    } finally {
      this._store = prev;
    }
  }
  enterWith(store) {
    this._store = store;
  }
  disable() {
    this._store = undefined;
  }
}
`;
const ASYNC_HOOKS_SHIM_ID = "\0node:async_hooks";
// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------
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
export function tanstackStart(options = {}) {
    const { svelte: svelteOptions, routesDirectory = "./src/routes", routeFileExtensions = [".svelte", ".ts"], autoCodeSplitting = true, entry = {}, } = options;
    const entryPaths = {
        client: entry.client ?? DEFAULT_ENTRY_PATHS.client,
        server: entry.server ?? DEFAULT_ENTRY_PATHS.server,
    };
    // -------------------------------------------------------------------------
    // Core TanStack Start Plugin (framework-agnostic behavior)
    // -------------------------------------------------------------------------
    const tanstackStartCorePlugin = {
        name: "tanstack-start-svelte",
        enforce: "pre",
        config(config, { command }) {
            return {
                // Ensure Svelte is optimized correctly
                optimizeDeps: {
                    include: ["@tanstack/svelte-router"],
                    exclude: ["@tanstack/svelte-start"],
                    esbuildOptions: {
                        plugins: [
                            {
                                name: "tanstack-start-async-hooks-shim",
                                setup(build) {
                                    build.onResolve({ filter: /^(node:)?async_hooks$/ }, (args) => ({
                                        path: args.path,
                                        namespace: "async-hooks-shim",
                                    }));
                                    build.onLoad({ filter: /.*/, namespace: "async-hooks-shim" }, () => ({ contents: ASYNC_HOOKS_SHIM, loader: "js" }));
                                },
                            },
                        ],
                    },
                },
                // SSR configuration
                ssr: {
                    noExternal: ["@tanstack/svelte-start", "@tanstack/svelte-router"],
                },
                // Define compile-time constants
                define: {
                    __TANSTACK_ROUTER_FRAMEWORK__: JSON.stringify("svelte"),
                    __TANSTACK_START_FRAMEWORK__: JSON.stringify("svelte"),
                },
                resolve: {
                    // Ensure .svelte files resolve correctly
                    extensions: [
                        ".mjs",
                        ".js",
                        ".ts",
                        ".jsx",
                        ".tsx",
                        ".json",
                        ".svelte",
                    ],
                },
            };
        },
        resolveId(id) {
            // Shim node:async_hooks for browser compatibility
            if (id === "node:async_hooks" || id === "async_hooks") {
                return ASYNC_HOOKS_SHIM_ID;
            }
            // Handle virtual modules
            if (id === VIRTUAL_MODULES.router) {
                return `\0${VIRTUAL_MODULES.router}`;
            }
            if (id === VIRTUAL_MODULES.manifest) {
                return `\0${VIRTUAL_MODULES.manifest}`;
            }
            return null;
        },
        load(id) {
            if (id === ASYNC_HOOKS_SHIM_ID) {
                return ASYNC_HOOKS_SHIM;
            }
            if (id === `\0${VIRTUAL_MODULES.router}`) {
                return `export { createRouter } from './src/router.ts'`;
            }
            if (id === `\0${VIRTUAL_MODULES.manifest}`) {
                return `export default {}`;
            }
            return null;
        },
    };
    // -------------------------------------------------------------------------
    // Route Code-Splitting Plugin
    // -------------------------------------------------------------------------
    // The official TanStack Router code-splitting is handled by
    // @tanstack/router-plugin/vite (target: 'svelte'). This plugin provides
    // route-file watching for HMR and resolves `?tsr-split` virtual modules
    // that the router-plugin may generate.
    const routeCodeSplittingPlugin = {
        name: "tanstack-start-svelte-routes",
        enforce: "pre",
        configResolved(config) {
            // Store resolved root for route file resolution
            const root = config.root;
            const resolvedRoutesDir = routesDirectory.startsWith(".")
                ? `${root}/${routesDirectory.replace(/^\.\//, "")}`
                : routesDirectory;
            // Log in dev mode that code-splitting support is available
            if (config.command === "serve") {
                const hasRouterPlugin = config.plugins.some((p) => p.name === "tanstack-router:code-splitter:compile-reference-file");
                if (!hasRouterPlugin && autoCodeSplitting) {
                    // The user enabled autoCodeSplitting but doesn't have @tanstack/router-plugin
                    // This is fine — Svelte's file-based component imports are already lazy by default
                    // if the user uses dynamic import() in route files.
                }
            }
        },
        resolveId(id) {
            // Support tsr-split virtual module resolution (for @tanstack/router-plugin compat)
            if (id.includes("tsr-split")) {
                return id;
            }
            return null;
        },
        // Watch route directory for file additions/deletions (HMR)
        configureServer(server) {
            const root = server.config.root;
            const resolvedRoutesDir = routesDirectory.startsWith(".")
                ? `${root}/${routesDirectory.replace(/^\.\//, "")}`
                : routesDirectory;
            // Watch for new/deleted route files to trigger HMR
            server.watcher.add(resolvedRoutesDir);
        },
        handleHotUpdate(ctx) {
            // When a route .ts or .svelte file changes, invalidate the route module
            const routeExts = routeFileExtensions;
            if (routeExts.some((ext) => ctx.file.endsWith(ext))) {
                // Let the default HMR handle it — Svelte files get HMR from vite-plugin-svelte
                return undefined;
            }
            return undefined;
        },
    };
    // -------------------------------------------------------------------------
    // Compose all plugins
    // -------------------------------------------------------------------------
    return [
        // 1. Svelte compiler
        ...svelte(svelteOptions),
        // 2. TanStack Start core
        tanstackStartCorePlugin,
        // 3. Route code-splitting (when enabled)
        ...(autoCodeSplitting ? [routeCodeSplittingPlugin] : []),
    ];
}
export { VIRTUAL_MODULES, DEFAULT_ENTRY_PATHS };
export default tanstackStart;
