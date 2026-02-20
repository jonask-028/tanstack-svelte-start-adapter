<!--
  Posts List Page (/posts)

  Demonstrates:
  - Fetching data with a server function (createServerFn)
  - Accessing loader data with useLoaderData
  - Navigation with Link and dynamic params
  - Outlet for child routes (individual post)
-->
<script lang="ts">
  import { Link, Outlet, useLoaderData } from "@tanstack/svelte-router";

  type Post = { id: string; title: string; excerpt: string };
  const posts = useLoaderData({ strict: false }) as Post[];
</script>

<div class="posts-layout">
  <div class="posts-list">
    <h2>Posts</h2>

    {#if posts && posts.length > 0}
      <ul>
        {#each posts as post}
          <li>
            <Link
              to="/posts/$postId"
              params={{ postId: post.id }}
              activeProps={{ class: "active" }}
            >
              <strong>{post.title}</strong>
              <span class="excerpt">{post.excerpt}</span>
            </Link>
          </li>
        {/each}
      </ul>
    {:else}
      <p>No posts found.</p>
    {/if}
  </div>

  <div class="post-detail">
    <Outlet />
  </div>
</div>

<style>
  .posts-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }

  h2 {
    margin-top: 0;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    margin-bottom: 0.5rem;
  }

  li :global(a) {
    display: block;
    padding: 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.15s;
  }

  li :global(a:hover) {
    border-color: #a0aec0;
  }

  li :global(a.active) {
    border-color: #4299e1;
    background: #ebf8ff;
  }

  strong {
    display: block;
    margin-bottom: 0.25rem;
  }

  .excerpt {
    color: #718096;
    font-size: 0.875rem;
  }

  @media (max-width: 640px) {
    .posts-layout {
      grid-template-columns: 1fr;
    }
  }
</style>
