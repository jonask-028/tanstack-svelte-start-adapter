# TanStack Start + Svelte Adapter

A comprehensive adapter that enables **Svelte 5** as a rendering framework for [TanStack Start](https://tanstack.com/start) and [TanStack Router](https://tanstack.com/router). Use TanStack Start's full-stack conventions — file-based routing, type-safe server functions, SSR — with Svelte 5's runes and component model instead of React.

## Packages

| Package                   | Description                                                                                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@tanstack/svelte-router` | Router components (`Link`, `Outlet`, `RouterProvider`), navigation hooks (`useParams`, `useNavigate`, `useLoaderData`, etc.), and SSR utilities for Svelte 5 |
| `@tanstack/svelte-start`  | Full-stack framework — Vite plugin, server function support (`createServerFn`), SSR handlers, and client hydration                                           |

## Architecture

```text
┌─────────────────────────────────────────────────┐
│                  Your App                       │
│  .svelte routes + createServerFn + router.ts    │
├─────────────────────────────────────────────────┤
│           @tanstack/svelte-start                │
│  Vite plugin · SSR handlers · server functions  │
├─────────────────────────────────────────────────┤
│           @tanstack/svelte-router               │
│  Components · Hooks · Context · SSR rendering   │
├─────────────────────────────────────────────────┤
│           @tanstack/router-core                 │
│  Route tree · Matching · History · Loaders      │
└─────────────────────────────────────────────────┘
```

This mirrors the architecture of TanStack Start's official React and Solid adapters — a thin Svelte binding layer on top of the framework-agnostic router core.

## Quick Start

### 1. Install

```bash
bun add @tanstack/svelte-router @tanstack/svelte-start svelte
bun add -D @sveltejs/vite-plugin-svelte vite typescript
```

### 2. Configure Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/svelte-start/plugin/vite";

export default defineConfig({
  plugins: [tanstackStart()],
});
```

### 3. Define Routes

```ts
// src/routes/__root.ts
import { createRootRoute } from "@tanstack/svelte-router";
import Root from "./__root.svelte";

export const rootRoute = createRootRoute({
  component: Root,
});
```

```svelte
<!-- src/routes/__root.svelte -->
<script lang="ts">
  import { Outlet, Link } from '@tanstack/svelte-router'
</script>

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
</nav>
<Outlet />
```

```ts
// src/routes/index.ts
import { createRoute } from "@tanstack/svelte-router";
import { rootRoute } from "./__root";
import Home from "./index.svelte";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
```

```svelte
<!-- src/routes/index.svelte -->
<script lang="ts">
  let count = $state(0)
</script>

<h1>Hello TanStack Start + Svelte!</h1>
<button onclick={() => count++}>Count: {count}</button>
```

### 4. Create Router

```ts
// src/router.ts
import { createRouter } from "@tanstack/svelte-router";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
  });
}

declare module "@tanstack/svelte-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
```

### 5. Entry Points

```ts
// src/entry-client.ts
import { hydrateStart } from "@tanstack/svelte-start/client";
import { createRouter } from "./router";

hydrateStart({ router: createRouter() });
```

```ts
// src/entry-server.ts
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/svelte-start/server";
import { createRouter } from "./router";

export default createStartHandler({
  createRouter,
  handler: defaultStreamHandler,
});
```

## Server Functions

Use `createServerFn` for type-safe server-client RPC:

```ts
// src/functions/getUsers.ts
import { createServerFn } from "@tanstack/svelte-start";

export const getUsers = createServerFn({ method: "GET" }).handler(async () => {
  const users = await db.user.findMany();
  return users;
});

export const createUser = createServerFn({ method: "POST" })
  .validator((data: { name: string; email: string }) => data)
  .handler(async ({ input }) => {
    return db.user.create({ data: input });
  });
```

Use in route loaders:

```ts
// src/routes/users.ts
import { createRoute } from "@tanstack/svelte-router";
import { getUsers } from "../functions/getUsers";

export const usersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/users",
  component: Users,
  loader: () => getUsers(),
});
```

Access in components:

```svelte
<!-- src/routes/users.svelte -->
<script lang="ts">
  import { useLoaderData } from '@tanstack/svelte-router'

  const users = useLoaderData({ from: '/users' })
</script>

{#each users as user}
  <p>{user.name}</p>
{/each}
```

## Components

### `<RouterProvider>`

Root component that provides the router context to all child components.

```svelte
<script lang="ts">
  import { RouterProvider } from '@tanstack/svelte-router'
  let { router } = $props()
</script>

<RouterProvider {router} />
```

### `<Link>`

Type-safe navigation link with preloading, active state detection, and accessible attributes.

```svelte
<Link to="/users/$userId" params={{ userId: '123' }} activeProps={{ class: 'active' }}>
  View User
</Link>
```

### `<Outlet>`

Renders child route components within layout routes.

```svelte
<nav><!-- navigation --></nav>
<Outlet />
```

### `<Navigate>`

Imperative redirect — navigates on mount.

```svelte
<Navigate to="/login" />
```

## Hooks

| Hook                    | Description                               |
| ----------------------- | ----------------------------------------- |
| `useRouter()`           | Access the router instance                |
| `useRouterState(opts)`  | Subscribe to router state with a selector |
| `useNavigate(opts?)`    | Get a navigate function                   |
| `useParams(opts)`       | Access route params                       |
| `useSearch(opts)`       | Access search/query params                |
| `useMatch(opts)`        | Access the current route match            |
| `useLoaderData(opts)`   | Access loader data for a route            |
| `useLoaderDeps(opts)`   | Access loader deps for a route            |
| `useLocation()`         | Access the current parsed location        |
| `useRouteContext(opts)` | Access route context data                 |
| `useCanGoBack()`        | Check if history allows going back        |
| `useMatchRoute()`       | Get a function to check if a path matches |

## SSR

The adapter provides full SSR with client hydration:

- **Server**: `render()` from `svelte/server` (synchronous) wrapped in streaming Response
- **Client**: `hydrate()` from `svelte` attaches to server-rendered HTML
- **Dehydration**: Router state serialized as `window.__TSR_DEHYDRATED__` for client pickup

### Handlers

| Handler                | Description                                 |
| ---------------------- | ------------------------------------------- |
| `defaultStreamHandler` | Renders to streaming Response (recommended) |
| `defaultRenderHandler` | Renders to complete string Response         |
| `createStartHandler`   | Factory for creating custom SSR handlers    |

### Server Runtime Adapters

```ts
import { createNodeHandler } from "@tanstack/svelte-start/server-handler"; // Node.js
import { createBunHandler } from "@tanstack/svelte-start/server-handler"; // Bun
import { createDenoHandler } from "@tanstack/svelte-start/server-handler"; // Deno
```

## Project Structure

```text
packages/
  svelte-router/           # @tanstack/svelte-router
    src/
      components/          # Svelte 5 components (Link, Outlet, etc.)
      hooks/               # Navigation & state hooks
      context/             # Router context (Svelte setContext/getContext)
      ssr/                 # Server rendering & client hydration
      index.ts             # Main barrel export

  svelte-start/            # @tanstack/svelte-start
    src/
      plugin/              # Vite plugin (tanstackStart())
      client/              # StartClient + hydrateStart
      server/              # StartServer + stream/render handlers
      server-handler/      # Runtime adapter helpers (Node, Bun, Deno)
      client-runtime/      # Client runtime utilities
      defaults/            # Default entry point templates
      index.ts             # Main entry (createServerFn, useServerFn)
      config.ts            # defineStartConfig helper

examples/
  svelte/
    start-basic/           # Basic example app with Svelte 5 + TanStack Start
```

## Key Design Decisions

1. **Synchronous SSR**: Svelte 5's `render()` is synchronous (unlike React's streaming SSR). We achieve streaming at the data level via the router's dehydration system.

2. **Context API**: Uses Svelte's native `setContext`/`getContext` instead of React's Context.Provider pattern. Simpler and more idiomatic.

3. **Runes-based Hooks**: All hooks use Svelte 5's `$state` and `$derived` runes for reactivity, not stores or legacy `$:` syntax.

4. **Component Rendering**: Route components are `.svelte` files rendered via `svelte:component`. The `Match` component handles the recursive rendering tree.

5. **Vite Plugin Composition**: `tanstackStart()` composes `@sveltejs/vite-plugin-svelte` automatically — users only need one plugin call.

## Development

```bash
# Install dependencies
bun install

# Build all packages
bun run build

# Run example app
bun run dev:example

# Type check
bun run typecheck
```

## Status

This adapter is **experimental**. It mirrors the architecture of TanStack Start's official Solid and Vue adapters and targets feature parity with the React adapter.

### Not Yet Implemented

- [ ] Route tree auto-generation for `.svelte` files (currently manual)
- [ ] Code splitting for route components
- [ ] `<script module>` co-located route config (Svelte-specific pattern)
- [ ] Full integration with `@tanstack/start-plugin-core` (requires upstream changes)
- [ ] Middleware support
- [ ] Hot Module Replacement for routes

## License

MIT
