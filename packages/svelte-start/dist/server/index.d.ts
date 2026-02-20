/**
 * @tanstack/svelte-start/server
 *
 * Server-side rendering handlers for TanStack Start + Svelte.
 * Provides stream and string rendering handlers that integrate with
 * TanStack Start's server infrastructure.
 */
import type { AnyRouter } from "@tanstack/router-core";
export { default as StartServer } from "./StartServer.svelte";
export interface HandlerCallbackOptions {
    request: Request;
    router: AnyRouter;
    responseHeaders?: Headers;
}
export type HandlerCallback = (options: HandlerCallbackOptions) => Response | Promise<Response>;
export interface CreateStartHandlerOptions {
    /**
     * Factory function that creates a new router instance for each request.
     * This ensures request isolation — each SSR request gets its own router.
     */
    createRouter: () => AnyRouter;
    /**
     * The handler callback that renders the app to a Response.
     * Use `defaultStreamHandler` or `defaultRenderHandler`, or write a custom one.
     */
    handler: HandlerCallback;
}
/**
 * Creates a request handler for TanStack Start + Svelte.
 *
 * This is the main server entry point. It creates a fresh router for each
 * incoming request, loads the matched routes, and delegates to the handler
 * callback for rendering.
 *
 * @example
 * ```ts
 * // src/entry-server.ts
 * import { createStartHandler, defaultStreamHandler } from '@tanstack/svelte-start/server'
 * import { createRouter } from './router'
 *
 * export default createStartHandler({
 *   createRouter,
 *   handler: defaultStreamHandler,
 * })
 * ```
 */
export declare function createStartHandler(options: CreateStartHandlerOptions): (request: Request) => Promise<Response>;
/**
 * Default handler that renders the app as a streaming HTML response.
 *
 * Since Svelte 5's `render()` is synchronous, the "stream" is created by:
 * 1. Rendering the full HTML string synchronously
 * 2. Wrapping it in a ReadableStream for a streaming Response
 *
 * This ensures compatibility with TanStack Start's streaming infrastructure
 * while leveraging Svelte's fast synchronous SSR.
 *
 * For true streaming of data (loader results, etc.), the router's
 * dehydration system handles injecting data as it becomes available.
 *
 * @example
 * ```ts
 * import { createStartHandler, defaultStreamHandler } from '@tanstack/svelte-start/server'
 *
 * export default createStartHandler({
 *   createRouter,
 *   handler: defaultStreamHandler,
 * })
 * ```
 */
export declare const defaultStreamHandler: HandlerCallback;
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
 * export default createStartHandler({
 *   createRouter,
 *   handler: defaultRenderHandler,
 * })
 * ```
 */
export declare const defaultRenderHandler: HandlerCallback;
//# sourceMappingURL=index.d.ts.map