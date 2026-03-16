/**
 * @tanstack/svelte-start/ssr-rpc
 *
 * Re-exports createSsrRpc from start-server-core.
 * This module is imported by the server function compiler when it
 * transforms createServerFn calls for the SSR environment — creating
 * stubs that look up server functions from the manifest and call them
 * directly (without HTTP) during server-side rendering.
 *
 * @internal — This module is used by the build pipeline, not by app code.
 */
export { createSsrRpc } from "@tanstack/start-server-core/createSsrRpc";
