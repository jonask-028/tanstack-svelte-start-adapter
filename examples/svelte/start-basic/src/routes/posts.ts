import { createRoute } from "@tanstack/svelte-router";
import { createServerFn } from "@tanstack/svelte-start";
import { rootRoute } from "./__root";
import Posts from "./posts.svelte";

// ============================================================================
// Server Function — fetches posts on the server
// ============================================================================

export const fetchPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    // In a real app, this would query a database
    return [
      {
        id: "1",
        title: "Getting Started with TanStack Start",
        excerpt: "Learn how to build full-stack Svelte apps.",
      },
      {
        id: "2",
        title: "Server Functions",
        excerpt: "Type-safe RPC calls between client and server.",
      },
      {
        id: "3",
        title: "File-Based Routing",
        excerpt: "Automatic route generation from your file structure.",
      },
    ];
  },
);

// ============================================================================
// Route Definition
// ============================================================================

export const postsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/posts",
  component: Posts,
  loader: () => fetchPosts(),
});
