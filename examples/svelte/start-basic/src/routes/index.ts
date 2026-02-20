import { createRoute } from "@tanstack/svelte-router";
import { rootRoute } from "./__root";
import Index from "./index.svelte";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Index,
});
