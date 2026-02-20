# TanStack Start with Svelte: Migration Guidance

## Goal

Migrate this monorepo from SvelteKit to TanStack Start while keeping **Svelte 5** as the UI layer. TanStack Start officially supports React and Solid; this migration requires building a custom Svelte adapter (see `tanstack-start-adapter/SKILL.md`).

## Constraints

- **No React.** Do not introduce React, ReactDOM, or any React-specific libraries.
- **Svelte 5 only.** Use runes (`$state`, `$props`, `$derived`, `$effect`). No legacy syntax.
- **Prisma isolation.** All database access stays server-side. Never import `@prisma/client` in client code.
- **Bun.** Continue using Bun as package manager and production runtime.
- **Incremental.** Migrate one app or route group at a time. Never break all three apps simultaneously.
- **Capacitor compatibility.** The member app must continue to build as a static SPA for Capacitor (iOS/Android).

## Architecture Comparison

| Concern        | SvelteKit (Current)                  | TanStack Start (Target)                                               |
| -------------- | ------------------------------------ | --------------------------------------------------------------------- |
| Meta-framework | SvelteKit 2                          | TanStack Start                                                        |
| UI framework   | Svelte 5                             | Svelte 5 (custom adapter)                                             |
| Routing        | File-based (`src/routes/`)           | File-based (TanStack Router, flat files)                              |
| Server data    | `+page.server.ts` load functions     | `createServerFn` with GET method                                      |
| Mutations      | SvelteKit form actions               | `createServerFn` with POST method                                     |
| API endpoints  | `+server.ts` (GET/POST/etc.)         | Server routes or `createServerFn`                                     |
| Middleware     | `hooks.server.ts`                    | `createMiddleware` + global middleware in `start.ts`                  |
| Navigation     | `$app/navigation` (goto, invalidate) | TanStack Router (`useNavigate`, `router.navigate`)                    |
| Stores         | `$app/stores` (page, navigating)     | Router context + Svelte stores                                        |
| Forms          | `sveltekit-superforms` + Zod         | `createServerFn` + Zod validation (may keep superforms if compatible) |
| SSR adapter    | `svelte-adapter-bun`                 | Custom Svelte adapter for Start                                       |
| Static build   | `@sveltejs/adapter-static`           | Start SPA mode or static prerendering                                 |
| HMR            | SvelteKit Vite plugin                | Custom Start Vite plugin wrapping `@sveltejs/vite-plugin-svelte`      |

## Concept Mapping (SvelteKit to TanStack Start)

### Routes and Pages

```
SvelteKit                              TanStack Start
src/routes/+page.svelte           -->  src/routes/index.svelte (+ route config)
src/routes/orgs/+page.svelte      -->  src/routes/orgs.index.svelte
src/routes/orgs/[id]/+page.svelte -->  src/routes/orgs.$id.svelte
src/routes/+layout.svelte         -->  src/routes/__root.svelte
```

### Server Data Loading

```typescript
// SvelteKit: +page.server.ts
export const load: PageServerLoad = async () => {
  return { orgs: await prisma.org.findMany({ where: { deleted: null } }) };
};

// TanStack Start: createServerFn
import { createServerFn } from "@tanstack/svelte-start"; // hypothetical
const getOrgs = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.org.findMany({ where: { deleted: null } });
});
```

### Form Mutations

```typescript
// SvelteKit: form actions in +page.server.ts
export const actions: Actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    await prisma.org.create({ data: form.data });
    return { form };
  },
};

// TanStack Start: createServerFn with POST
const createOrg = createServerFn({ method: "POST" })
  .validator(zodValidator(orgSchema))
  .handler(async ({ data }) => {
    await prisma.org.create({ data });
    return { success: true };
  });
```

### Middleware / Hooks

```typescript
// SvelteKit: hooks.server.ts
export const handle: Handle = async ({ event, resolve }) => {
  event.locals.userId = await getUserId(event);
  return resolve(event);
};

// TanStack Start: createMiddleware
const authMiddleware = createMiddleware().server(async ({ next, request }) => {
  const userId = await getUserId(request);
  return next({ context: { userId } });
});
```

### Navigation

```svelte
<!-- SvelteKit -->
<script>
  import { goto } from '$app/navigation';
  function nav() { goto('/orgs'); }
</script>

<!-- TanStack Start (Svelte adapter) -->
<script>
  import { useNavigate } from '@tanstack/svelte-router'; // hypothetical
  const navigate = useNavigate();
  function nav() { navigate({ to: '/orgs' }); }
</script>
```

## Runtime Targets Per App

| App            | Current Adapter            | Target Mode                     | Notes                                  |
| -------------- | -------------------------- | ------------------------------- | -------------------------------------- |
| `apps/server`  | `svelte-adapter-bun` (SSR) | Start SSR with Bun server entry | Primary API server, needs full SSR     |
| `apps/manager` | `adapter-static` (SPA)     | Start SPA mode                  | Client-rendered admin dashboard        |
| `apps/member`  | `adapter-static` (SPA)     | Start SPA mode + Capacitor      | Mobile app, must produce static output |

## Key TanStack Start Concepts

### Isomorphic by Default

All code in TanStack Start ships to both server and client bundles unless explicitly restricted. Use `createServerFn` to keep code server-only. Route loaders are isomorphic (run on both server and client during navigation).

### Server Functions as RPC

`createServerFn` creates type-safe RPC endpoints. On the server, the function runs directly. On the client, calls become `fetch` requests. The build process extracts server code from client bundles automatically.

### Middleware Composition

Middleware is composable via `.middleware([...])` chaining. Two types:

- **Request middleware** (`createMiddleware()`): applies to all server requests
- **Server function middleware** (`createMiddleware({ type: 'function' })`): superset with `.client()` and `.inputValidator()` methods

### Execution Control

- `createServerFn()` - Server-only, callable from client via RPC
- `createServerOnlyFn()` - Strictly server-side, throws if called from client
- `createClientOnlyFn()` - Browser-only, throws on server
- `createIsomorphicFn()` - Separate `.server()` and `.client()` implementations

## Shared Code Strategy

The monorepo's shared code lives at the root level (not as workspace packages):

- `components/` - Shared Svelte UI components (keep as-is)
- `utils/` - Shared client utilities (keep as-is)
- `styles/` - Shared CSS/Tailwind (keep as-is)
- `prisma/` - Database schema and generated client (keep as-is)
- `server/` - Shared server utilities (adapt imports for Start)

Path aliases (`$components`, `$utils`, `$prisma`, `$styles`) must be preserved in the Start Vite config via `vite-tsconfig-paths` or manual alias configuration.

## Migration Order

1. Build the Svelte adapter for TanStack Start (see `tanstack-start-adapter/SKILL.md`)
2. Migrate `apps/server` first (most complex, validates SSR)
3. Migrate `apps/manager` second (SPA, simpler)
4. Migrate `apps/member` last (SPA + Capacitor, needs validation)
5. Update shared code imports as needed
6. Remove SvelteKit dependencies
