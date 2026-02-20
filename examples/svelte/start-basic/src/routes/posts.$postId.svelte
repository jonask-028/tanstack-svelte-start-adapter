<!--
  Single Post Detail Page (/posts/$postId)

  Demonstrates:
  - Dynamic route params with $postId
  - Fetching individual resource with server function
  - useLoaderData and useParams hooks
-->
<script lang="ts">
  import { useLoaderData, useParams } from "@tanstack/svelte-router";

  type PostData = { id: string; title: string; content: string };
  const post = useLoaderData({ strict: false }) as PostData;
  const params = useParams({ strict: false }) as { postId: string };
</script>

{#if post}
  <article>
    <h2>{post.title}</h2>
    <p class="meta">Post #{params.postId}</p>
    <p>{post.content}</p>
  </article>
{:else}
  <p>Loading post...</p>
{/if}

<style>
  article {
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }

  h2 {
    margin-top: 0;
    font-size: 1.25rem;
  }

  .meta {
    color: #a0aec0;
    font-size: 0.75rem;
    margin-top: -0.5rem;
  }
</style>
