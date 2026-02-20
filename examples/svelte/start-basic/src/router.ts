/**
 * Router Factory
 *
 * Creates a new router instance. Called once per SSR request
 * and once on the client for hydration.
 *
 * Must be named `getRouter` — the core plugin's createStartHandler
 * imports it via virtual module and calls routerEntry.getRouter().
 */

import { createRouter as createTanStackRouter } from "@tanstack/svelte-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
  });

  return router;
}

// Register the router for type safety
declare module "@tanstack/svelte-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
