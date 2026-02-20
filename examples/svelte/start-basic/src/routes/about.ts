import { createRoute } from "@tanstack/svelte-router";
import { rootRoute } from "./__root";
import About from "./about.svelte";

export const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});
