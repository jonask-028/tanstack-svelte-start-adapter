/**
 * @tanstack/svelte-start/client-rpc
 *
 * Re-exports createClientRpc from start-client-core.
 * This module is imported by the server function compiler when it
 * transforms createServerFn calls for the client environment —
 * replacing server-side handler bodies with RPC stubs that call
 * the server function over HTTP.
 *
 * @internal — This module is used by the build pipeline, not by app code.
 */

export { createClientRpc } from "@tanstack/start-client-core/client-rpc";
