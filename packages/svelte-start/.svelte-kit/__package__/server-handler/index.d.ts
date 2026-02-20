/**
 * @tanstack/svelte-start/server-handler
 *
 * Server handler integration module.
 * Provides helpers for integrating TanStack Start with various server
 * runtimes (Node.js, Bun, Deno, Cloudflare Workers, etc.)
 */
import { createStartHandler, defaultStreamHandler, defaultRenderHandler } from "../server/index.js";
import type { HandlerCallback, HandlerCallbackOptions, CreateStartHandlerOptions } from "../server/index.js";
export { createStartHandler, defaultStreamHandler, defaultRenderHandler };
export type { HandlerCallback, HandlerCallbackOptions, CreateStartHandlerOptions, };
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
export declare function createNodeHandler(options: CreateStartHandlerOptions): (req: {
    url?: string;
    method?: string;
    headers: Record<string, string | string[] | undefined>;
} & NodeJS.ReadableStream, res: {
    writeHead: (status: number, headers: Record<string, string>) => void;
    end: (body: string) => void;
}) => Promise<void>;
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
export declare function createBunHandler(options: CreateStartHandlerOptions): (request: Request) => Promise<Response>;
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
export declare function createDenoHandler(options: CreateStartHandlerOptions): (request: Request) => Promise<Response>;
//# sourceMappingURL=index.d.ts.map