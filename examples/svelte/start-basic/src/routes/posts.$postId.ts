import { createRoute } from "@tanstack/svelte-router";
import { createServerFn } from "@tanstack/svelte-start";
import { postsRoute } from "./posts";
import PostDetail from "./posts.$postId.svelte";

// ============================================================================
// Server Function — fetches a single post by ID
// ============================================================================

export const fetchPost = createServerFn({ method: "GET" })
  .inputValidator((postId: string) => postId)
  .handler(async ({ data: postId }) => {
    // In a real app, this would query a database
    const posts: Record<
      string,
      { id: string; title: string; content: string }
    > = {
      "1": {
        id: "1",
        title: "Getting Started with TanStack Start",
        content:
          "TanStack Start is a full-stack framework that works with multiple UI libraries. This Svelte adapter lets you use Svelte 5 as your rendering layer while leveraging TanStack Router for type-safe routing and TanStack Start for server functions.",
      },
      "2": {
        id: "2",
        title: "Server Functions",
        content:
          "Server functions (createServerFn) provide type-safe RPC between client and server. They run on the server during SSR and are called via HTTP from the client. Input validation, middleware, and error handling are all built in.",
      },
      "3": {
        id: "3",
        title: "File-Based Routing",
        content:
          "TanStack Router supports file-based routing where your route tree is generated from your file structure. Routes can be .svelte files with co-located route configuration using <script module> blocks.",
      },
    };

    const post = posts[postId];
    if (!post) {
      throw new Error(`Post not found: ${postId}`);
    }
    return post;
  });

// ============================================================================
// Route Definition
// ============================================================================

export const postRoute = createRoute({
  getParentRoute: () => postsRoute,
  path: "$postId",
  component: PostDetail,
  loader: ({ params }) => fetchPost({ data: params.postId }),
});
