/**
 * @tanstack/svelte-start/server-only
 *
 * Import protection marker — importing this module in client-side code
 * will cause a build error. Use it in server-only modules to ensure
 * they are never accidentally bundled into the client.
 *
 * @example
 * ```typescript
 * // In a server-only module
 * import '@tanstack/svelte-start/server-only'
 * import prisma from './lib/server/prisma'
 * ```
 */
if (typeof window !== "undefined") {
    throw new Error("[@tanstack/svelte-start/server-only] This module cannot be imported from client-side code.");
}
export {};
