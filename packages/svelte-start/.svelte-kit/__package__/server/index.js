/**
 * @tanstack/svelte-start/server
 *
 * Server-side rendering handlers for TanStack Start + Svelte.
 * Provides stream and string rendering handlers that integrate with
 * TanStack Start's server infrastructure.
 */
import { render } from "svelte/server";
import { createMemoryHistory } from "@tanstack/svelte-router";
import StartServer from "./StartServer.svelte";
export { default as StartServer } from "./StartServer.svelte";
// ============================================================================
// Start Handler
// ============================================================================
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
export function createStartHandler(options) {
    const { createRouter: createRouterFn, handler } = options;
    return async (request) => {
        // Create a fresh router for this request
        const router = createRouterFn();
        // Mark router as server-side
        router.isServer = true;
        // Derive href from the request URL (strip origin for history)
        const url = new URL(request.url);
        const href = url.pathname + (url.search ? url.search : "") + (url.hash ? url.hash : "");
        // Use createMemoryHistory so the router internally builds its own
        // resolvedLocation / location from the URL — this is the same pattern
        // used by the official createRequestHandler in router-core.
        const history = createMemoryHistory({ initialEntries: [href] });
        router.update({
            history,
        });
        // Load matched routes (fetch loaders, etc.)
        await router.load();
        // Delegate to the handler callback for rendering
        const responseHeaders = new Headers({
            "Content-Type": "text/html; charset=utf-8",
        });
        return handler({ request, router, responseHeaders });
    };
}
// ============================================================================
// Default Stream Handler
// ============================================================================
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
export const defaultStreamHandler = async ({ request, router, responseHeaders, }) => {
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
    // Check for redirects — AnyRedirect extends Response
    const redirect = router.state.redirect;
    if (redirect) {
        const redirectUrl = redirect.options?.href ?? redirect.url;
        return new Response(null, {
            status: redirect.status || 302,
            headers: {
                Location: redirectUrl,
                ...Object.fromEntries(headers),
            },
        });
    }
    // Determine status code from route matches
    const statusCode = router.state.statusCode ?? 200;
    return new Response(stream, {
        status: statusCode,
        headers,
    });
};
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
 * export default createStartHandler({
 *   createRouter,
 *   handler: defaultRenderHandler,
 * })
 * ```
 */
export const defaultRenderHandler = async ({ request, router, responseHeaders, }) => {
    const { html, head } = renderStartServer(router);
    const fullHtml = wrapHtmlDocument(html, head, router);
    const headers = new Headers(responseHeaders);
    headers.set("Content-Type", "text/html; charset=utf-8");
    // Check for redirects — AnyRedirect extends Response
    const redirect = router.state.redirect;
    if (redirect) {
        const redirectUrl = redirect.options?.href ?? redirect.url;
        return new Response(null, {
            status: redirect.status || 302,
            headers: {
                Location: redirectUrl,
                ...Object.fromEntries(headers),
            },
        });
    }
    const statusCode = router.state.statusCode ?? 200;
    return new Response(fullHtml, {
        status: statusCode,
        headers,
    });
};
// ============================================================================
// Internal Helpers
// ============================================================================
/**
 * Render the StartServer component to an HTML string + head content.
 */
function renderStartServer(router) {
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
function wrapHtmlDocument(html, head, router) {
    // If the rendered output already contains <!DOCTYPE or <html, it's a full document
    if (html.includes("<!DOCTYPE") ||
        html.includes("<!doctype") ||
        html.trimStart().startsWith("<html")) {
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
function safeDehydrate(router) {
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
    }
    catch {
        return "{}";
    }
}
