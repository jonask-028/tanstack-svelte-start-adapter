/**
 * @tanstack/svelte-start/config
 *
 * Configuration helpers for defining TanStack Start app config.
 */
export interface StartConfig {
    /**
     * Application name, used in meta tags and manifest.
     */
    appName?: string;
    /**
     * Base path for the application.
     * @default '/'
     */
    basePath?: string;
    /**
     * Default SSR mode for all routes.
     * - `true`  — Full SSR (default)
     * - `false` — SPA mode, no server rendering
     * - `'data-only'` — Server loads data but client renders HTML
     *
     * Individual routes can override this via `createRoute({ ssr: ... })`.
     * @default true
     */
    ssr?: boolean | "data-only";
    /**
     * Server configuration.
     */
    server?: {
        /** Port for the dev server. @default 3000 */
        port?: number;
        /** Hostname for the dev server. @default 'localhost' */
        host?: string;
        /** Enable HTTPS. @default false */
        https?: boolean;
    };
    /**
     * Route configuration.
     */
    routes?: {
        /** Root directory for route discovery. @default './src/routes' */
        directory?: string;
        /** File extensions to consider as routes. @default ['.svelte', '.ts'] */
        extensions?: string[];
    };
}
/**
 * Define the Start application configuration.
 * This is a type-safe helper — it simply returns the config object as-is.
 *
 * @example
 * ```ts
 * // app.config.ts
 * import { defineStartConfig } from '@tanstack/svelte-start/config'
 *
 * export default defineStartConfig({
 *   appName: 'My App',
 *   ssr: true,
 *   server: { port: 3000 },
 * })
 * ```
 */
export declare function defineStartConfig(config: StartConfig): StartConfig;
//# sourceMappingURL=config.d.ts.map