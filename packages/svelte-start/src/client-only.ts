/**
 * @tanstack/svelte-start/client-only
 *
 * Import protection marker — importing this module in server-side code
 * will cause a build error. Use it in client-only modules to ensure
 * they are never accidentally executed on the server.
 *
 * @example
 * ```typescript
 * // In a client-only module
 * import '@tanstack/svelte-start/client-only'
 * // Use browser APIs safely
 * ```
 */

if (typeof window === "undefined") {
  throw new Error(
    "[@tanstack/svelte-start/client-only] This module cannot be imported from server-side code.",
  );
}

export {};
