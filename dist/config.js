/**
 * @tanstack/svelte-start/config
 *
 * Configuration helpers for defining TanStack Start app config.
 */
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
export function defineStartConfig(config) {
    return config;
}
