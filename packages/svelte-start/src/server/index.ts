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

import { render } from "svelte/server";
import type { AnyRouter } from "@tanstack/router-core";
import type { HandlerCallback } from "@tanstack/router-core/ssr/server";
import { defineHandlerCallback } from "@tanstack/router-core/ssr/server";
import StartServer from "./StartServer.svelte";

export { default as StartServer } from "./StartServer.svelte";

// ============================================================================
// Re-exports from @tanstack/start-server-core
// ============================================================================
// The core createStartHandler handles:
// - Router creation via virtual module (#tanstack-router-entry)
// - Start configuration via virtual module (#tanstack-start-entry)
// - Server function routing (RPC via URL pattern matching)
// - Route loading, dehydration, and manifest asset resolution
// - H3Event AsyncLocalStorage wrapping (enables getRequest(), setCookie(), etc.)
// - Redirect handling, middleware execution, and error boundaries

export {
  // The core handler factory — creates request handler with full server
  // function support. Takes HandlerCallback or { handler, transformAssetUrls }.
  createStartHandler,
  // Request utilities
  getRequest,
  getRequestHeaders,
  getRequestHeader,
  getRequestIP,
  getRequestHost,
  getRequestProtocol,
  getRequestUrl,
  // Response utilities
  getResponse,
  getResponseHeaders,
  getResponseHeader,
  setResponseHeader,
  setResponseHeaders,
  removeResponseHeader,
  clearResponseHeaders,
  getResponseStatus,
  setResponseStatus,
  // Cookie utilities
  getCookies,
  getCookie,
  setCookie,
  deleteCookie,
  // Session utilities
  useSession,
  getSession,
  updateSession,
  sealSession,
  unsealSession,
  clearSession,
  // Query validation
  getValidatedQuery,
  // Handler utilities
  defineHandlerCallback,
  // Constants
  HEADERS,
} from "@tanstack/start-server-core";

// Types
export type {
  RequestHandler,
  RequestOptions,
} from "@tanstack/start-server-core";

export type { HandlerCallback } from "@tanstack/router-core/ssr/server";

// ============================================================================
// Server Entry Helper
// ============================================================================

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

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    },
  };
}

// ============================================================================
// Default Stream Handler
// ============================================================================

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
export const defaultStreamHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) => {
    // Render the full document
    const { html, head } = renderStartServer(router);
    const fullHtml = wrapHtmlDocument(html, head, router);

    // Create a ReadableStream from the HTML string
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fullHtml));
        controller.close();
      },
    });

    const headers = new Headers(responseHeaders);
    headers.set("Content-Type", "text/html; charset=utf-8");
    headers.set("Transfer-Encoding", "chunked");

    // Determine status code from route matches
    const statusCode = router.state.statusCode ?? 200;

    return new Response(stream, {
      status: statusCode,
      headers,
    });
  },
);

// ============================================================================
// Default Render Handler (String-based, no streaming)
// ============================================================================

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
export const defaultRenderHandler = defineHandlerCallback(
  ({ request, router, responseHeaders }) => {
    const { html, head } = renderStartServer(router);
    const fullHtml = wrapHtmlDocument(html, head, router);

    const headers = new Headers(responseHeaders);
    headers.set("Content-Type", "text/html; charset=utf-8");

    const statusCode = router.state.statusCode ?? 200;

    return new Response(fullHtml, {
      status: statusCode,
      headers,
    });
  },
);

// ============================================================================
// Internal Helpers
// ============================================================================

/**
 * Render the StartServer component to an HTML string + head content.
 */
function renderStartServer(router: AnyRouter): { html: string; head: string } {
  const result = render(StartServer, {
    props: { router },
  });

  return {
    html: result.body,
    head: result.head,
  };
}

/**
 * Wrap rendered HTML in a complete document with dehydrated state.
 *
 * If the StartServer component already renders <html>, this returns
 * the Svelte output directly. Otherwise, it wraps in a document shell.
 */
function wrapHtmlDocument(
  html: string,
  head: string,
  router: AnyRouter,
): string {
  // If the rendered output already contains <!DOCTYPE or <html, it's a full document
  if (
    html.includes("<!DOCTYPE") ||
    html.includes("<!doctype") ||
    html.trimStart().startsWith("<html")
  ) {
    // Inject head content if the component rendered basic head tags
    if (head && !html.includes(head)) {
      html = html.replace("</head>", `${head}</head>`);
    }
    return `<!DOCTYPE html>${html}`;
  }

  // Otherwise, wrap in a document shell
  const dehydratedState = safeDehydrate(router);

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    ${head}
  </head>
  <body>
    <div id="__app">${html}</div>
    <script>window.__TSR_DEHYDRATED__ = ${dehydratedState}</script>
  </body>
</html>`;
}

/**
 * Safely serialize router state for client hydration.
 */
function safeDehydrate(router: AnyRouter): string {
  try {
    // Use the dehydrate option if provided, otherwise serialize router state
    const state = router.options.dehydrate
      ? router.options.dehydrate()
      : { state: router.state };
    return JSON.stringify(state)
      .replace(/</g, "\\u003c")
      .replace(/>/g, "\\u003e")
      .replace(/&/g, "\\u0026")
      .replace(/'/g, "\\u0027");
  } catch {
    return "{}";
  }
}
