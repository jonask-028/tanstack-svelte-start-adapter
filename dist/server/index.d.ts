/**
 * @tanstack/svelte-start/server
 *
 * Server-side rendering handlers for TanStack Start + Svelte.
 * Provides stream and string rendering handlers that integrate with
 * TanStack Start's server infrastructure.
 *
 * Also re-exports request/response utilities from @tanstack/start-server-core
 * for use inside createServerFn handlers.
 */
import type { AnyRouter } from "@tanstack/router-core";
import type { HandlerCallback } from "@tanstack/router-core/ssr/server";
export { default as StartServer } from "./StartServer.svelte";
export { createStartHandler, getRequest, getRequestHeaders, getRequestHeader, getRequestIP, getRequestHost, getRequestProtocol, getRequestUrl, getResponse, getResponseHeaders, getResponseHeader, setResponseHeader, setResponseHeaders, removeResponseHeader, clearResponseHeaders, getResponseStatus, setResponseStatus, getCookies, getCookie, setCookie, deleteCookie, useSession, getSession, updateSession, sealSession, unsealSession, clearSession, getValidatedQuery, defineHandlerCallback, HEADERS, } from "@tanstack/start-server-core";
export type { RequestHandler, RequestOptions, } from "@tanstack/start-server-core";
export type { HandlerCallback } from "@tanstack/router-core/ssr/server";
/**
 * Wraps a request handler in a server entry object with a `.fetch()` method.
 *
 * The core plugin's dev server expects `serverEntry.default.fetch(request)`,
 * so the default export of the server entry must have this shape.
 *
 * @example
 * ```ts
 * // src/entry-server.ts
 * import { createStartHandler, defaultStreamHandler, createServerEntry } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultStreamHandler)
 * export default createServerEntry({ fetch })
 * ```
 */
export interface ServerEntry {
    fetch: (...args: Array<any>) => Promise<Response> | Response;
}
export declare function createServerEntry(entry: ServerEntry): ServerEntry;
/**
 * Default handler that renders the app as a streaming HTML response.
 *
 * Since Svelte 5's `render()` is synchronous, the "stream" is created by:
 * 1. Rendering the full HTML string synchronously via `svelte/server`
 * 2. Wrapping it in a ReadableStream for a streaming Response
 *
 * The core's `createStartHandler` calls `router.serverSsr.dehydrate()` before
 * invoking this handler, so the router state is ready for serialization.
 * Redirect handling is also done by the core before calling this handler.
 *
 * @example
 * ```ts
 * import { createStartHandler, defaultStreamHandler } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultStreamHandler)
 * ```
 */
export declare const defaultStreamHandler: HandlerCallback<AnyRouter>;
/**
 * Default handler that renders the app as a complete HTML string response.
 *
 * Simpler than the stream handler — just renders and returns a string Response.
 * Useful for static generation or when streaming is not needed.
 *
 * @example
 * ```ts
 * import { createStartHandler, defaultRenderHandler } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultRenderHandler)
 * ```
 */
export declare const defaultRenderHandler: HandlerCallback<AnyRouter>;
//# sourceMappingURL=index.d.ts.map