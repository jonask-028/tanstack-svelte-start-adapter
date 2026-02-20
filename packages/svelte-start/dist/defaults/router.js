/**
 * Default Router Factory
 *
 * This is a template for the router factory function.
 * Users should create their own `src/router.ts` based on this pattern.
 *
 * The router factory is called once on the server (per request) and once
 * on the client (on initial load). It must return a new router instance
 * each time to ensure request isolation during SSR.
 */
import { createRouter as createTanStackRouter } from "@tanstack/svelte-router";
import { routeTree } from "./routeTree.gen";
export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
        defaultPreload: "intent",
        defaultPreloadStaleTime: 0,
    });
    return router;
}
