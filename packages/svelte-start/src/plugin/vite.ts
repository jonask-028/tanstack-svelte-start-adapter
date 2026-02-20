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

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import {
  TanStackStartVitePluginCore,
  type TanStackStartInputConfig,
} from "@tanstack/start-plugin-core";
import type { Plugin, PluginOption } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Default Entry Paths
// ---------------------------------------------------------------------------

const DEFAULT_ENTRY_PATHS = {
  client: resolve(__dirname, "../defaults/entry-client.ts"),
  server: resolve(__dirname, "../defaults/entry-server.ts"),
  start: resolve(__dirname, "../defaults/entry-start.ts"),
} as const;

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
export function tanstackStart(
  options: TanStackStartSvelteOptions = {},
): PluginOption[] {
  const { svelte: svelteOptions, tss: startPluginOpts = {} } = options;

  // -------------------------------------------------------------------------
  // Svelte-Specific Plugin
  // -------------------------------------------------------------------------
  // Handles Svelte-specific concerns that the core plugin doesn't cover:
  // - AsyncLocalStorage browser shim for esbuild (optimizeDeps)
  // - AsyncLocalStorage browser shim for Vite resolveId/load
  // - .svelte extension in resolve config
  const svelteStartPlugin: Plugin = {
    name: "tanstack-start-svelte-compat",
    enforce: "pre",

    config() {
      return {
        optimizeDeps: {
          esbuildOptions: {
            plugins: [
              {
                name: "tanstack-start-async-hooks-shim",
                setup(build: any) {
                  build.onResolve(
                    { filter: /^(node:)?async_hooks$/ },
                    (args: any) => ({
                      path: args.path,
                      namespace: "async-hooks-shim",
                    }),
                  );
                  build.onLoad(
                    { filter: /.*/, namespace: "async-hooks-shim" },
                    () => ({ contents: ASYNC_HOOKS_SHIM, loader: "js" }),
                  );
                },
              },
            ],
          },
        },
        resolve: {
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
      return null;
    },

    load(id) {
      if (id === ASYNC_HOOKS_SHIM_ID) {
        return ASYNC_HOOKS_SHIM;
      }
      return null;
    },
  };

  // -------------------------------------------------------------------------
  // TanStack Start Core Plugin
  // -------------------------------------------------------------------------
  // Provides the full server function compilation pipeline:
  // - Babel AST transforms to extract createServerFn handlers
  // - RPC stub generation for client bundles (tree-shaking server code)
  // - Entry point resolution and virtual module aliases
  // - Vite 6 environments (client + SSR) with build orchestration
  // - Dev server middleware (SSR rendering, CSS collection, error overlays)
  // - Route file generation (@tanstack/router-plugin integration)
  // - Client asset manifest for SSR preloading
  //
  // The framework string is used for:
  // - Package name resolution: @tanstack/${framework}-start
  // - Compiler lookup: finds createServerFn imports from the framework package
  // - RPC import injection: import { createClientRpc } from '@tanstack/svelte-start/client-rpc'
  //
  // Note: CompileStartFrameworkOptions types only allow 'react' | 'solid' | 'vue'.
  // We use 'svelte' as any — at runtime the string is only used for interpolation,
  // not for framework-specific branching. The RPC subpath modules (client-rpc,
  // server-rpc, ssr-rpc) are provided by this package.
  const corePlugins = TanStackStartVitePluginCore(
    {
      framework: "svelte" as any,
      defaultEntryPaths: DEFAULT_ENTRY_PATHS,
    },
    startPluginOpts,
  );

  // -------------------------------------------------------------------------
  // Compose all plugins
  // -------------------------------------------------------------------------
  return [
    // 1. Svelte compiler — must come first for .svelte file processing
    ...svelte(svelteOptions),

    // 2. Svelte-specific compatibility (async_hooks shim, extensions)
    svelteStartPlugin,

    // 3. TanStack Start core (server fn compilation, routing, dev server, etc.)
    ...corePlugins,
  ];
}

export { DEFAULT_ENTRY_PATHS };
export type { TanStackStartInputConfig };
export default tanstackStart;
