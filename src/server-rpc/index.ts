/**
 * @tanstack/svelte-start/server-rpc
 *
 * Re-exports createServerRpc from start-server-core.
 * This module is imported by the server function compiler when it
 * transforms createServerFn calls for the provider (server) environment —
 * wrapping the actual handler function with RPC metadata (function ID,
 * URL, and server function marker).
 *
 * @internal — This module is used by the build pipeline, not by app code.
 */

export { createServerRpc } from "@tanstack/start-server-core/createServerRpc";
