# GitHub Copilot Instructions

## Architecture Overview

This is a **SvelteKit monorepo** with:

- **Routing**: File-based routes in `src/routes/` using SvelteKit conventions
- **Data Layer**: Server-side load functions in `+page.server.ts` files
- **Database**: Prisma ORM with Postgres (server-side only)
- **Forms**: `sveltekit-superforms` + Zod validation
- **UI**: Tailwind CSS 4 + shadcn-svelte (Bits UI/Melt UI primitives)
- **Runtime**: Bun (package manager & production runtime)

**Critical**: This is a **Svelte 5** project using modern runes (`$state`, `$props`, `$derived`). Do not use legacy Svelte syntax.

## Monorepo Structure

```
apps/
  api/         # API-only app (REST endpoints)
  manager/     # SSR app (backend management)
  member/      # SPA/static app (mobile/capacitor)
prisma/        # Database schema and migrations
server/        # Shared server utilities (auth, email, prisma singleton)
```

Use Bun workspace filtering: `bun --filter @amp/manager dev`

## Server-Side Patterns

All backend operations use SvelteKit's built-in patterns:

### Load Functions

```typescript
// +page.server.ts
import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    orgs: await prisma.org.findMany({ where: { deleted: null } }),
  };
};
```

### Form Actions

```typescript
// +page.server.ts
import { fail } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    // Process form submission
    return { success: true };
  },
};
```

## Prisma Isolation (Critical)

**Import rules by file type:**

| Import                    | Server Files | Client Files |
| ------------------------- | ------------ | ------------ |
| `$prisma/client` (types)  | ✅ Yes       | ❌ No        |
| `$prisma/browser` (types) | ❌ No        | ✅ Yes       |
| `prisma` instance         | ✅ Yes       | ❌ Never     |
| DB queries                | ✅ Yes       | ❌ Never     |

```typescript
// ✅ Correct - server file (+page.server.ts, +server.ts, $lib/server/*)
import prisma from "$lib/server/prisma";
import type { org } from "$prisma/client";
return prisma.org.findMany();

// ✅ Correct - client file (+page.svelte, $lib/components/*)
import type { org } from "$prisma/browser";

// ❌ Wrong - never in client-side code
import prisma from "$lib/server/prisma";
import type { org } from "$prisma/client";
```

The Prisma singleton is in `server/prisma.ts`. All DB access must go through server files. SvelteKit's `$lib/server/` directory is automatically excluded from client bundles.

## Forms (sveltekit-superforms + Zod)

**Modern pattern**:

```svelte
<script lang="ts">
  import { superForm } from 'sveltekit-superforms';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  const { form, errors, enhance } = superForm(data.form);
</script>

<form method="POST" use:enhance>
  <input name="email" bind:value={$form.email} />
  {#if $errors.email}<span>{$errors.email}</span>{/if}
  <Button type="submit">Submit</Button>
</form>
```

```typescript
// +page.server.ts
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export const load: PageServerLoad = async () => {
  return { form: await superValidate(zod(schema)) };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, zod(schema));
    if (!form.valid) return fail(400, { form });
    // Process valid data
    return { form };
  },
};
```

## Svelte 5 Runes

Use modern Svelte 5 syntax:

```svelte
<script lang="ts">
  // State
  let count = $state(0);

  // Props
  let { title, items = [] }: { title: string; items?: string[] } = $props();

  // Derived
  let doubled = $derived(count * 2);

  // Effects
  $effect(() => {
    console.log('Count changed:', count);
  });
</script>
```

**Don't** use legacy syntax: `export let`, `$:` reactive declarations

## Routes & File Structure

```
src/routes/+layout.svelte              # Root layout
src/routes/+page.svelte                # Home page (/)
src/routes/orgs/+page.svelte         # /orgs
src/routes/orgs/[id]/+page.svelte    # /orgs/:id
```

Each route uses:

- `+page.svelte` - Component
- `+page.server.ts` - Server load & actions
- `+page.ts` - Universal load (rarely needed)

## Commands (Bun)

```bash
bun --filter @amp/manager dev      # Dev server
bun --filter @amp/manager build    # Production build
bun --filter @amp/manager check    # Type check
bun run db:migrate                 # Prisma migrations
bun run db:generate                # Regenerate Prisma client
bun run db:studio                  # Prisma Studio UI
```

## Key Conventions

1. **Imports**: Use `$lib/` for `src/lib/`
2. **Components**: PascalCase `.svelte` files
3. **Server files**: Code in `$lib/server/` is automatically server-only
4. **Prisma types (server)**: Import from `$prisma/client`
5. **Prisma types (client)**: Import from `$prisma/browser`
6. **Soft deletes**: Use `deleted: DateTime?` - filter with `where: { deleted: null }`
7. **API requests**: Always use the shared `api` client from `$utils` (never raw `fetch`)

## API Client (Critical)

**Always use the shared API client for HTTP requests in client-side code:**

```typescript
// ✅ Correct - use the api client
import { api } from "$utils";

await api.post("/auth/logout", {});
await api.get("/users");
await api.put("/users/123", { name: "John" });
await api.delete("/users/123");

// ❌ Wrong - never use raw fetch for API calls
await fetch("/api/auth/logout", { method: "POST", body: JSON.stringify({}) });
```

The `api` client:

- Uses `VITE_API_URL` to route to the correct server (handles dev tunnels, production URLs)
- Automatically includes credentials for session authentication
- Sets proper headers (`Content-Type: application/json`)
- Has built-in error handling via `ApiClientError`
- Includes `X-Community` header with selected community hash for content filtering

## Community Filtering (Member App)

The member app supports filtering content by community. The selected community is stored in localStorage and automatically sent with every API request via the `X-Community` header.

**Client-side store** (`apps/member/src/lib/community-store.svelte.ts`):

```typescript
import { getSelectedCommunity, setSelectedCommunity, clearSelectedCommunity } from "$lib/community-store.svelte";

// Get current selection (reactive)
let community = $derived(getSelectedCommunity());

// Set a community
setSelectedCommunity(hash, name, imageUrl);

// Clear selection (show all communities)
clearSelectedCommunity();
```

**Server-side filtering** (API endpoints):

```typescript
// +server.ts
export const GET: RequestHandler = async ({ request }) => {
  const communityHash = request.headers.get("X-Community");
  
  // If communityHash is provided, filter content to that org
  const where = communityHash 
    ? { org: { hash: communityHash } }
    : {};
  
  const items = await prisma.item.findMany({ where });
  return json(items);
};
```

When implementing API endpoints that return community-scoped content (events, posts, products, etc.), check for the `X-Community` header and filter accordingly. If the header is absent, return content from all communities the user has access to.

## Common Patterns

**Page Data Access**:

```svelte
<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
</script>

{#each data.items as item}
  <p>{item.name}</p>
{/each}
```

**Form Submission**:

```svelte
<form method="POST" use:enhance>
  <!-- Form fields -->
</form>
```

**Navigation**:

```svelte
<script>
  import { goto } from '$app/navigation';

  function navigate() {
    goto('/orgs');
  }
</script>
```

## Don'ts

- ❌ Import `$prisma/client` in client-side code (use `$prisma/browser` instead)
- ❌ Import the Prisma instance or make DB queries in client-side code
- ❌ Use `pnpm` or `npm` (use `bun` instead)
- ❌ Use legacy Svelte syntax (`export let`, `$:`)
- ❌ Install any software (Homebrew, apt, etc.) without asking first — only npm/bun packages are allowed
- ❌ Use raw `fetch()` for API calls in client-side code (use `api` from `$utils` instead)

## Session Checklist

Before generating code:

1. Use **Svelte MCP server** for Svelte/SvelteKit documentation
   - Call `list-sections` to discover relevant docs
   - Call `get-documentation` to fetch needed sections
   - Call `svelte-autofixer` to validate generated Svelte code
2. Use **context7 MCP** for other library docs when using advanced APIs
3. Read full files before editing
4. Verify app context (api, manager, or member)
5. Test Prisma isn't imported client-side

See `AI_RULES.md` for comprehensive conventions and patterns.
