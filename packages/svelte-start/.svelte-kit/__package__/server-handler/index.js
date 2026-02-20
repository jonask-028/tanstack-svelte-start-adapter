/**
 * @tanstack/svelte-start/server-handler
 *
 * Server handler integration module.
 * Provides helpers for integrating TanStack Start with various server
 * runtimes (Node.js, Bun, Deno, Cloudflare Workers, etc.)
 */
import { createStartHandler, defaultStreamHandler, defaultRenderHandler, } from "../server/index.js";
export { createStartHandler, defaultStreamHandler, defaultRenderHandler };
// ============================================================================
// Adapter Helpers
// ============================================================================
/**
 * Create a handler for Node.js HTTP server (http.createServer).
 *
 * Converts Node.js IncomingMessage/ServerResponse to Web Request/Response
 * and delegates to the TanStack Start handler.
 *
 * @example
 * ```ts
 * import http from 'node:http'
 * import { createNodeHandler } from '@tanstack/svelte-start/server-handler'
 * import { createRouter } from './router'
 *
 * const handler = createNodeHandler({
 *   createRouter,
 *   handler: defaultStreamHandler,
 * })
 *
 * http.createServer(handler).listen(3000)
 * ```
 */
export function createNodeHandler(options) {
    const handler = createStartHandler(options);
    return async (req, res) => {
        const protocol = "http";
        const host = req.headers.host ?? "localhost";
        const url = new URL(req.url ?? "/", `${protocol}://${host}`);
        const headers = new Headers();
        for (const [key, value] of Object.entries(req.headers)) {
            if (value) {
                if (Array.isArray(value)) {
                    value.forEach((v) => headers.append(key, v));
                }
                else {
                    headers.set(key, value);
                }
            }
        }
        const request = new Request(url.href, {
            method: req.method,
            headers,
        });
        const response = await handler(request);
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
            responseHeaders[key] = value;
        });
        res.writeHead(response.status, responseHeaders);
        res.end(await response.text());
    };
}
/**
 * Create a handler for Bun's serve() API.
 *
 * This is a thin wrapper since Bun natively supports the Web Request/Response API.
 *
 * @example
 * ```ts
 * import { createBunHandler } from '@tanstack/svelte-start/server-handler'
 * import { createRouter } from './router'
 *
 * const handler = createBunHandler({
 *   createRouter,
 *   handler: defaultStreamHandler,
 * })
 *
 * Bun.serve({ fetch: handler, port: 3000 })
 * ```
 */
export function createBunHandler(options) {
    return createStartHandler(options);
}
/**
 * Create a handler for Deno.serve().
 *
 * Like Bun, Deno natively supports the Web Request/Response API.
 *
 * @example
 * ```ts
 * import { createDenoHandler } from '@tanstack/svelte-start/server-handler'
 * import { createRouter } from './router'
 *
 * const handler = createDenoHandler({
 *   createRouter,
 *   handler: defaultStreamHandler,
 * })
 *
 * Deno.serve(handler)
 * ```
 */
export function createDenoHandler(options) {
    return createStartHandler(options);
}
