# TanStack Start Server Functions (Svelte Migration)

## Overview

`createServerFn` replaces SvelteKit's `+page.server.ts` load functions, form actions, and `+server.ts` API endpoints. Server functions are type-safe RPCs: they run on the server but are callable from client code. The build process automatically extracts server code from client bundles and replaces calls with `fetch` requests.

## API Reference

### Basic Server Function

```typescript
import { createServerFn } from "@tanstack/svelte-start"; // hypothetical package

// GET (default) - for data loading
const getOrgs = createServerFn({ method: "GET" }).handler(async () => {
  return prisma.org.findMany({ where: { deleted: null } });
});

// POST - for mutations
const createOrg = createServerFn({ method: "POST" }).handler(
  async ({ data }) => {
    return prisma.org.create({ data });
  },
);
```

### With Input Validation

```typescript
import { zodValidator } from "@tanstack/zod-adapter"; // or similar

const createOrg = createServerFn({ method: "POST" })
  .validator(
    zodValidator(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    // data is typed: { name: string; email: string }
    return prisma.org.create({ data });
  });
```

### With Middleware

```typescript
const getOrgs = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    // context.userId available from middleware
    return prisma.org.findMany({
      where: { deleted: null },
    });
  });
```

## Calling Server Functions

### From Route Loaders

```typescript
// In route configuration
export const Route = createFileRoute("/orgs")({
  loader: async () => {
    return { orgs: await getOrgs() };
  },
});
```

### From Svelte Components

```svelte
<script lang="ts">
  import { getOrgs, createOrg } from '../functions/orgs';

  // Call in effect or event handler
  let orgs = $state([]);

  $effect(() => {
    getOrgs().then(data => { orgs = data; });
  });

  async function handleCreate(formData: FormData) {
    const name = formData.get('name') as string;
    await createOrg({ data: { name } });
    orgs = await getOrgs(); // refetch
  }
</script>
```

### From Other Server Functions

```typescript
const getOrgWithUsers = createServerFn({ method: "GET" })
  .validator(zodValidator(z.object({ orgId: z.string() })))
  .handler(async ({ data }) => {
    const org = await getOrg({ data: { id: data.orgId } });
    const users = await getUsers({ data: { orgId: data.orgId } });
    return { org, users };
  });
```

## Migration Mapping

### Load Functions -> GET Server Functions

```typescript
// BEFORE: SvelteKit +page.server.ts
import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
  const org = await prisma.org.findUnique({
    where: { id: params.id },
    include: { teams: true },
  });
  return { org };
};

// AFTER: TanStack Start server function
import prisma from "$lib/server/prisma"; // adapt import path

const getOrg = createServerFn({ method: "GET" })
  .validator(zodValidator(z.object({ id: z.string() })))
  .handler(async ({ data }) => {
    return prisma.org.findUnique({
      where: { id: data.id },
      include: { teams: true },
    });
  });
```

### Form Actions -> POST Server Functions

```typescript
// BEFORE: SvelteKit form actions
export const actions: Actions = {
  create: async ({ request }) => {
    const form = await superValidate(request, zod(orgSchema));
    if (!form.valid) return fail(400, { form });
    await prisma.org.create({ data: form.data });
    return { form };
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id") as string;
    await prisma.org.update({
      where: { id },
      data: { deleted: new Date() },
    });
  },
};

// AFTER: TanStack Start server functions
const createOrg = createServerFn({ method: "POST" })
  .validator(zodValidator(orgSchema))
  .handler(async ({ data }) => {
    return prisma.org.create({ data });
  });

const deleteOrg = createServerFn({ method: "POST" })
  .validator(zodValidator(z.object({ id: z.string() })))
  .handler(async ({ data }) => {
    return prisma.org.update({
      where: { id: data.id },
      data: { deleted: new Date() },
    });
  });
```

### API Endpoints -> Server Functions or Server Routes

```typescript
// BEFORE: SvelteKit +server.ts
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ request }) => {
  const communityHash = request.headers.get("X-Community");
  const where = communityHash ? { org: { hash: communityHash } } : {};
  const items = await prisma.item.findMany({ where });
  return json(items);
};

// AFTER: TanStack Start server function with header access
import { getRequestHeader } from "@tanstack/svelte-start/server"; // hypothetical

const getItems = createServerFn({ method: "GET" }).handler(async () => {
  const communityHash = getRequestHeader("X-Community");
  const where = communityHash ? { org: { hash: communityHash } } : {};
  return prisma.item.findMany({ where });
});
```

## Server Context Utilities

TanStack Start provides utilities for accessing request/response details inside server functions:

```typescript
import {
  getRequest, // Get the full Request object
  getRequestHeader, // Read a specific request header
  setResponseHeaders, // Set response headers
  setResponseStatus, // Set HTTP status code
} from "@tanstack/svelte-start/server"; // hypothetical

const myFn = createServerFn({ method: "GET" }).handler(async () => {
  const authHeader = getRequestHeader("Authorization");
  setResponseHeaders({ "X-Custom": "value" });
  setResponseStatus(200);
  // ...
});
```

## Error Handling

### Throwing Errors

```typescript
const getOrg = createServerFn({ method: "GET" })
  .validator(zodValidator(z.object({ id: z.string() })))
  .handler(async ({ data }) => {
    const org = await prisma.org.findUnique({ where: { id: data.id } });
    if (!org) {
      throw notFound(); // Returns 404
    }
    return org;
  });
```

### Redirects

```typescript
import { redirect } from "@tanstack/svelte-router"; // hypothetical

const requireAuth = createServerFn({ method: "GET" }).handler(async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw redirect({ to: "/login" });
  }
  return user;
});
```

### Error Responses (replacing SvelteKit fail())

```typescript
// Instead of SvelteKit's fail(400, { form })
// Return explicit error payloads:
const createOrg = createServerFn({ method: "POST" })
  .validator(zodValidator(orgSchema))
  .handler(async ({ data }) => {
    try {
      const org = await prisma.org.create({ data });
      return { success: true as const, org };
    } catch (error) {
      return { success: false as const, error: "Failed to create org" };
    }
  });
```

## File Organization

Recommended structure for server functions:

```
src/
  functions/
    orgs.ts          # Server function definitions (createServerFn)
    orgs.server.ts   # Internal server-only helpers (Prisma queries)
    orgs.schema.ts   # Zod schemas (shared between client and server)
  routes/
    orgs.index.svelte
    orgs.$id.svelte
```

**Rules:**

- `.server.ts` files: Internal helpers, never directly imported from client code
- `.ts` files with `createServerFn`: Safe to import from client (build strips server code)
- `.schema.ts` files: Validation schemas shared across client and server
- Static imports are safe (build handles tree-shaking). Avoid dynamic imports.

## Prisma Isolation Rules (Unchanged)

- Prisma singleton must only be imported inside server functions or `.server.ts` files
- Never import `@prisma/client` in client-side Svelte components
- Use `$prisma/browser` for type-only imports in client code (if needed)
- TanStack Start's build process handles server/client code splitting, but always verify with bundle analysis

## Headers Propagation

The `X-Community` header pattern used in the current API must be preserved:

```typescript
// Server function middleware to extract community context
const communityMiddleware = createMiddleware().server(async ({ next }) => {
  const communityHash = getRequestHeader("X-Community");
  return next({ context: { communityHash } });
});

// Use in server functions
const getEvents = createServerFn({ method: "GET" })
  .middleware([communityMiddleware])
  .handler(async ({ context }) => {
    const where = context.communityHash
      ? { org: { hash: context.communityHash } }
      : {};
    return prisma.ampEvent.findMany({ where });
  });
```
