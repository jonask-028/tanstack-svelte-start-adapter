# TanStack Start Migration Playbook

## Purpose

Step-by-step migration sequence from SvelteKit to TanStack Start with Svelte 5. Each phase is independently verifiable with rollback capability.

## Prerequisites

Before starting migration:

- [ ] Read `tanstack-start-svelte/SKILL.md` (concept mapping)
- [ ] Read `tanstack-start-adapter/SKILL.md` (custom adapter)
- [ ] Read `tanstack-start-routing/SKILL.md` (route conventions)
- [ ] Read `tanstack-start-server-functions/SKILL.md` (server function patterns)
- [ ] Read `sveltekit-adapters/SKILL.md` (current adapter setup)
- [ ] Read `sveltekit-server-functions/SKILL.md` (current server patterns)

## Phase 0: Adapter Development

**Goal:** Build the Svelte adapter for TanStack Start before touching any app code.

### Steps

1. Study TanStack Start source code and `@tanstack/solid-start` for abstraction points
2. Create `packages/svelte-start/` with Vite plugin wrapper
3. Create `packages/svelte-router/` with Link, Outlet, navigation hooks
4. Build SSR handler using Svelte 5's `render()`
5. Build client hydration entry point
6. Test with a minimal standalone route (not in the monorepo apps yet)

### Verification

- [ ] Single Svelte component renders via TanStack Start dev server
- [ ] `createServerFn` works and returns data to Svelte component
- [ ] Route navigation works between two test routes
- [ ] SSR produces valid HTML
- [ ] Client hydration picks up without full re-render
- [ ] HMR works for Svelte component changes

### Rollback

No app code is modified. Delete `packages/` directory if abandoning.

---

## Phase 1: Migrate `apps/server` (API Server)

**Goal:** Convert the SSR API server from SvelteKit to TanStack Start with Bun runtime.

### Why First

The server app is the most complex (14 API route groups, auth middleware, CORS, session management). If Start can handle this, the simpler SPA apps will follow.

### Steps

1. **Inventory server routes and middleware**
   - List all `+server.ts` API endpoints (14 groups)
   - Document `hooks.server.ts` middleware chain (CORS, auth, session)
   - Map `$lib/server/` utilities (prisma, session, crypto, email, push, chat, image)

2. **Create server function files**
   - Create `src/functions/auth.ts` (login, logout, me, signup, password reset, verify)
   - Create `src/functions/orgs.ts` (CRUD operations)
   - Create `src/functions/users.ts` (CRUD operations)
   - Create `src/functions/events.ts` (CRUD operations)
   - Create `src/functions/chat.ts` (messages, sessions, attachments)
   - Create `src/functions/broadcasts.ts`
   - Continue for all 14 API groups

3. **Migrate middleware**
   - Convert `hooks.server.ts` CORS handling to `createMiddleware`
   - Convert auth/session middleware
   - Set up global middleware in `src/start.ts`

4. **Configure Start for Bun**
   - Set up `src/server.ts` entry point for Bun runtime
   - Configure Vite for server build

5. **Migrate routes**
   - Most server app routes are API-only, but any SSR pages need migration
   - Convert `+page.svelte` files to Start route format

6. **Update shared code imports**
   - Verify `$prisma`, `$components`, `$utils`, `$styles` aliases work
   - Adapt `$lib/server/` imports to new structure

### Verification

- [ ] All API endpoints respond correctly (test with existing manager/member apps)
- [ ] Auth flow works (login, session, logout)
- [ ] CORS headers are correct
- [ ] `X-Community` header filtering works
- [ ] Prisma queries execute (no client bundle leakage)
- [ ] Server starts on Bun runtime
- [ ] No regressions in manager/member apps calling the API

### Rollback

Keep the SvelteKit server app alongside. Run both on different ports during migration. Switch back by changing port config.

---

## Phase 2: Migrate `apps/manager` (Admin SPA)

**Goal:** Convert the manager dashboard from SvelteKit SPA to TanStack Start SPA mode.

### Context

The manager app runs with `ssr = false` (fully client-side SPA) using `adapter-static`. It proxies `/api` requests to the server app at `localhost:3000`.

### Steps

1. **Inventory routes** (8 route groups)
   - `/` (home/redirect)
   - `/amp-events` (event management)
   - `/broadcasts` (broadcast management)
   - `/groups/[hash]` (group detail)
   - `/login` (authentication)
   - `/members` (member management)
   - `/orgs` (organization management)
   - `/requests` (join requests)
   - `/settings` (app settings)

2. **Set up Start SPA mode**
   - Configure `tanstackSvelteStart()` in `vite.config.ts`
   - Set SPA mode (no SSR)
   - Configure API proxy to server app

3. **Migrate route files**
   - Convert each `+page.svelte` to Start flat route (e.g., `orgs.index.svelte`)
   - Convert `+layout.svelte` to `__root.svelte`
   - If using `+page.server.ts` load functions with `ssr = false`, convert to client-side data fetching via server functions or API calls

4. **Migrate auth flow**
   - Convert client-side auth check (`api.get('/auth/me')`)
   - Set up route guard for authenticated routes

5. **Update navigation**
   - Replace `goto()` with TanStack Router `navigate()`
   - Replace `<a>` links with `<Link>` component

6. **Update form handling**
   - If using `sveltekit-superforms`, adapt to work with server functions
   - Or replace with direct server function calls + Zod validation

### Verification

- [ ] All routes render correctly
- [ ] Auth redirect works (unauthenticated -> /login)
- [ ] API proxy to server app works
- [ ] Form submissions work (create/edit/delete operations)
- [ ] Navigation between routes works
- [ ] Static build produces valid output (`bun run build`)
- [ ] No SvelteKit imports remain

### Rollback

Keep the SvelteKit manager app alongside. Swap Vite config to switch back.

---

## Phase 3: Migrate `apps/member` (Mobile SPA + Capacitor)

**Goal:** Convert the member app from SvelteKit SPA to TanStack Start SPA mode while maintaining Capacitor compatibility.

### Context

The member app has the most routes (15 groups), uses Capacitor for iOS/Android, and has native plugins (barcode scanner, push notifications, secure storage, keyboard).

### Steps

1. **Inventory routes** (15 route groups)
   - `/account`, `/agenda`, `/broadcasts/[hash]`, `/chat`, `/chat/[hash]`
   - `/communities`, `/contacts`, `/events/[hash]`, `/feed`, `/id-badge`
   - `/leaderboard`, `/login`, `/map`, `/market`

2. **Set up Start SPA mode**
   - Same SPA configuration as manager
   - Configure API proxy

3. **Migrate route files**
   - Convert all 15+ route groups to Start flat routes

4. **Verify Capacitor compatibility**
   - Static build output must work with `capacitor.config.ts`
   - Capacitor plugins must still work (barcode scanner, push notifications, etc.)
   - Test on iOS simulator and Android emulator

5. **Migrate native integrations**
   - Push notification registration
   - Barcode scanner
   - Secure storage for auth tokens
   - Keyboard handling

6. **Migrate client utilities**
   - `api-config.ts` (API URL configuration)
   - `community-store.svelte.ts` (community selection)
   - `scanner.ts` (barcode scanning)

### Verification

- [ ] All routes render correctly in browser
- [ ] Capacitor build succeeds for iOS and Android
- [ ] Native plugins work (camera, push, storage)
- [ ] Community filtering works via `X-Community` header
- [ ] Chat functionality works (including SSE for real-time)
- [ ] Static build output matches Capacitor expectations

### Rollback

Keep the SvelteKit member app alongside. Swap Vite config to switch back.

---

## Phase 4: Cleanup

**Goal:** Remove SvelteKit dependencies and finalize migration.

### Steps

1. Remove SvelteKit packages from `package.json`:
   - `@sveltejs/kit`
   - `@sveltejs/adapter-static`
   - `@sveltejs/adapter-node`
   - `svelte-adapter-bun`
   - `sveltekit-superforms` (if fully replaced)

2. Remove SvelteKit config files:
   - `svelte.config.js` (root and per-app)
   - Update `vite.config.ts` files

3. Update `AI_RULES.md`:
   - Replace SvelteKit patterns with TanStack Start patterns
   - Update prohibited items list
   - Update file structure documentation

4. Update `.github/copilot-instructions.md`:
   - Replace SvelteKit-specific instructions with Start equivalents

5. Update shared config:
   - Remove `createSvelteConfig` factory
   - Update `createViteConfig` for Start

6. Archive SvelteKit-specific code:
   - Move to `.old/sveltekit/` if needed for reference

### Verification

- [ ] All three apps build and run correctly
- [ ] No SvelteKit imports remain in the codebase
- [ ] Type checking passes for all apps
- [ ] All AI instruction files are updated

---

## Risk Controls

| Risk                   | Mitigation                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| Adapter doesn't work   | Phase 0 is standalone; abandon without app changes                                           |
| Server functions fail  | Keep SvelteKit server running in parallel during migration                                   |
| Capacitor breaks       | Test native builds after every change to member app                                          |
| Shared code breaks     | Shared code (`components/`, `utils/`) is framework-agnostic Svelte; minimal changes expected |
| Performance regression | Benchmark each phase against SvelteKit baseline                                              |
| Build time increases   | Monitor Vite build times; Start plugin adds overhead                                         |

## Decision Points

At each phase boundary, evaluate:

1. Is the adapter stable enough to proceed?
2. Are there blocking issues that require upstream TanStack changes?
3. Should we contribute adapter code upstream or maintain it as a local package?
4. Is the migration worth completing, or should we stop at a partial state?
