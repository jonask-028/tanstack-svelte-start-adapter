/**
 * Root Route Definition
 *
 * This creates the root route that wraps all other routes.
 * The component is defined in __root.svelte.
 */

import { createRootRoute } from "@tanstack/svelte-router";
import Root from "./__root.svelte";

export const rootRoute = createRootRoute({
  component: Root,
});
