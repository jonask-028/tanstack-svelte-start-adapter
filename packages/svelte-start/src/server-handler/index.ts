/**
 * @tanstack/svelte-start/server-handler
 *
 * Server handler integration module.
 * Provides helpers for integrating TanStack Start with various server
 * runtimes (Node.js, Bun, Deno, Cloudflare Workers, etc.)
 *
 * In the core-integrated architecture, the Vite dev server handles Node.js
 * integration automatically. These helpers are useful for custom production
 * deployments outside of the standard Vite build.
 */

import {
  createStartHandler,
  defaultStreamHandler,
  defaultRenderHandler,
  createServerEntry,
} from "../server/index.js";
import type { HandlerCallback, ServerEntry } from "../server/index.js";
import type { RequestHandler } from "@tanstack/start-server-core";
import type { Register } from "@tanstack/router-core";

export {
  createStartHandler,
  defaultStreamHandler,
  defaultRenderHandler,
  createServerEntry,
};

export type { HandlerCallback, RequestHandler, ServerEntry };

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
 * import { defaultStreamHandler, createStartHandler } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultStreamHandler)
 *
 * const handler = createNodeHandler(fetch)
 *
 * http.createServer(handler).listen(3000)
 * ```
 */
export function createNodeHandler(handler: RequestHandler<Register>) {
  return async (
    req: {
      url?: string;
      method?: string;
      headers: Record<string, string | string[] | undefined>;
    } & NodeJS.ReadableStream,
    res: {
      writeHead: (status: number, headers: Record<string, string>) => void;
      end: (body: string) => void;
    },
  ) => {
    const protocol = "http";
    const host = req.headers.host ?? "localhost";
    const url = new URL(req.url ?? "/", `${protocol}://${host}`);

    const headers = new Headers();
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach((v) => headers.append(key, v));
        } else {
          headers.set(key, value);
        }
      }
    }

    const request = new Request(url.href, {
      method: req.method,
      headers,
    });

    const response = await handler(request);

    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value: string, key: string) => {
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
 * import { createStartHandler, defaultStreamHandler } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultStreamHandler)
 * const handler = createBunHandler(fetch)
 *
 * Bun.serve({ fetch: handler, port: 3000 })
 * ```
 */
export function createBunHandler(
  handler: RequestHandler<Register>,
): RequestHandler<Register> {
  return handler;
}

/**
 * Create a handler for Deno.serve().
 *
 * Like Bun, Deno natively supports the Web Request/Response API.
 *
 * @example
 * ```ts
 * import { createDenoHandler } from '@tanstack/svelte-start/server-handler'
 * import { createStartHandler, defaultStreamHandler } from '@tanstack/svelte-start/server'
 *
 * const fetch = createStartHandler(defaultStreamHandler)
 * const handler = createDenoHandler(fetch)
 *
 * Deno.serve(handler)
 * ```
 */
export function createDenoHandler(
  handler: RequestHandler<Register>,
): RequestHandler<Register> {
  return handler;
}
