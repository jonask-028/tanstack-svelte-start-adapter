# TanStack Start Routing (Svelte Migration)

## Overview

TanStack Router uses file-based routing with different conventions than SvelteKit. Routes are defined as flat files (preferred) or directories, with a generated route tree.

## File Naming Conventions

| Convention              | Meaning                          | Example                                                    |
| ----------------------- | -------------------------------- | ---------------------------------------------------------- |
| `$paramName`            | Dynamic path parameter           | `orgs.$id.svelte` matches `/orgs/:id`                      |
| `_` prefix              | Pathless layout (no URL segment) | `_authenticated.svelte` wraps children without adding path |
| `_` suffix on directory | Break out of parent layout       | `orgs_/$id/edit.svelte` skips `<Orgs>` layout              |
| `.` separator           | Nesting delimiter in flat files  | `orgs.$id.svelte` = nested under `/orgs`                   |
| `index`                 | Exact match for parent path      | `orgs.index.svelte` matches `/orgs` exactly                |
| `$` (standalone)        | Splat / catch-all route          | `files.$.svelte` matches `/files/*`                        |
| `__root`                | Root layout wrapping all routes  | `__root.svelte`                                            |

## Three Routing Styles

### 1. Flat Routes (Preferred for this project)

```
src/routes/
  __root.svelte
  index.svelte                    # /
  orgs.index.svelte               # /orgs
  orgs.$id.svelte                 # /orgs/:id
  settings.svelte                 # /settings (layout)
  settings.profile.svelte         # /settings/profile
  _auth.svelte                    # pathless layout for auth routes
  _auth.login.svelte              # /login (wrapped by _auth layout)
```

### 2. Directory Routes

```
src/routes/
  __root.svelte
  index.svelte
  orgs/
    route.svelte                  # /orgs layout
    index.svelte                  # /orgs (exact)
    $id.svelte                    # /orgs/:id
```

### 3. Mixed (Both flat and directory)

Flat and directory routes can coexist. TanStack recommends this mixed approach.

## Current Route Inventory

### apps/server (API routes)

```
SvelteKit Path                          Start Equivalent
src/routes/api/auth/+server.ts     -->  src/routes/api.auth.ts (server route)
src/routes/api/orgs/+server.ts     -->  src/routes/api.orgs.ts (server route)
src/routes/api/users/+server.ts    -->  src/routes/api.users.ts (server route)
src/routes/api/events/+server.ts   -->  src/routes/api.events.ts (server route)
src/routes/api/chat/+server.ts     -->  src/routes/api.chat.ts (server route)
... (14 API route groups total)
```

**Alternative:** Replace `+server.ts` API routes with `createServerFn` functions that the client apps call directly via RPC, eliminating the need for a separate API server app entirely.

### apps/manager (8 route groups)

```
SvelteKit Path                              Start Equivalent (flat)
src/routes/+page.svelte                -->  src/routes/index.svelte
src/routes/+layout.svelte              -->  src/routes/__root.svelte
src/routes/amp-events/+page.svelte     -->  src/routes/amp-events.index.svelte
src/routes/broadcasts/+page.svelte     -->  src/routes/broadcasts.index.svelte
src/routes/groups/[hash]/+page.svelte  -->  src/routes/groups.$hash.svelte
src/routes/login/+page.svelte         -->  src/routes/login.svelte
src/routes/members/+page.svelte       -->  src/routes/members.index.svelte
src/routes/orgs/+page.svelte          -->  src/routes/orgs.index.svelte
src/routes/requests/+page.svelte      -->  src/routes/requests.index.svelte
src/routes/settings/+page.svelte      -->  src/routes/settings.index.svelte
```

### apps/member (15 route groups)

```
SvelteKit Path                                  Start Equivalent (flat)
src/routes/+page.svelte                    -->  src/routes/index.svelte
src/routes/+layout.svelte                  -->  src/routes/__root.svelte
src/routes/account/+page.svelte            -->  src/routes/account.svelte
src/routes/agenda/+page.svelte             -->  src/routes/agenda.svelte
src/routes/broadcasts/[hash]/+page.svelte  -->  src/routes/broadcasts.$hash.svelte
src/routes/chat/+page.svelte               -->  src/routes/chat.index.svelte
src/routes/chat/[hash]/+page.svelte        -->  src/routes/chat.$hash.svelte
src/routes/communities/+page.svelte        -->  src/routes/communities.svelte
src/routes/contacts/+page.svelte           -->  src/routes/contacts.svelte
src/routes/events/[hash]/+page.svelte      -->  src/routes/events.$hash.svelte
src/routes/feed/+page.svelte               -->  src/routes/feed.svelte
src/routes/id-badge/+page.svelte           -->  src/routes/id-badge.svelte
src/routes/leaderboard/+page.svelte        -->  src/routes/leaderboard.svelte
src/routes/login/+page.svelte              -->  src/routes/login.svelte
src/routes/map/+page.svelte                -->  src/routes/map.svelte
src/routes/market/+page.svelte             -->  src/routes/market.svelte
```

## Route Configuration

Each route file exports a route configuration alongside the Svelte component. In TanStack Start, this is done via `createFileRoute`:

```typescript
// In React/Solid, route config is co-located in the file:
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/orgs/$id")({
  loader: async ({ params }) => {
    return getOrg({ data: { id: params.id } });
  },
  component: OrgDetail,
});
```

For the Svelte adapter, we need an equivalent pattern. Options:

1. **Separate config file** (e.g., `orgs.$id.route.ts` alongside `orgs.$id.svelte`)
2. **Script module context** (`<script context="module">` equivalent in Svelte 5)
3. **Convention-based** (loader functions exported from a co-located `.ts` file)

## Layouts

### Root Layout

The `__root.svelte` file wraps all routes. It must render the full HTML document structure:

```svelte
<!-- src/routes/__root.svelte -->
<script lang="ts">
  let { children } = $props();
</script>

<html lang="en">
  <head>
    <!-- HeadContent equivalent -->
  </head>
  <body>
    {@render children()}
    <!-- Scripts equivalent -->
  </body>
</html>
```

### Pathless Layouts

Use `_` prefix for layouts that wrap child routes without adding a URL segment:

```
_authenticated.svelte              # Layout: checks auth, redirects to /login
_authenticated.dashboard.svelte    # /dashboard (wrapped by auth layout)
_authenticated.settings.svelte     # /settings (wrapped by auth layout)
```

## Route Guards

Replace SvelteKit's `+page.server.ts` redirects with route `beforeLoad` hooks:

```typescript
// TanStack Router approach
export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: "/login" });
    }
  },
});
```

## Navigation

```svelte
<!-- TanStack Router navigation (Svelte adapter equivalent) -->
<script lang="ts">
  // Programmatic navigation
  import { useNavigate } from '@tanstack/svelte-router';
  const navigate = useNavigate();
  navigate({ to: '/orgs/$id', params: { id: '123' } });

  // Link component
  import { Link } from '@tanstack/svelte-router';
</script>

<Link to="/orgs" class="btn">View Orgs</Link>
<Link to="/orgs/$id" params={{ id: '123' }}>Org Detail</Link>
```

## Route Tree Generation

TanStack Router auto-generates `routeTree.gen.ts` from the file structure. The Vite plugin handles this during dev and build. The generated file provides full type safety for route paths, params, and search params.

Configure in `vite.config.ts`:

```typescript
import { tanstackStart } from "@tanstack/svelte-start/plugin/vite"; // hypothetical

export default defineConfig({
  plugins: [
    tanstackStart({
      routeFilePrefix: "", // default
      routeFileExtension: ".svelte", // adapt for Svelte
    }),
    // ... other plugins
  ],
});
```
