# SvelteKit Adapters (Current Configuration)

## Purpose

Documents the current adapter setup per app as migration source-of-truth. This is the baseline to migrate FROM.

## Root Config Factory

All apps extend a shared config factory at the monorepo root:

```javascript
// svelte.config.js (root)
export function createSvelteConfig({ adapter, ...overrides }) {
  return {
    kit: {
      adapter,
      alias: {
        $prisma: "./prisma/generated",
        "$prisma/client": "./prisma/generated/client",
        "$prisma/browser": "./prisma/generated/client/browser",
        $server: "./server",
        $components: "./components",
        $styles: "./styles",
        $utils: "./utils",
      },
      ...overrides,
    },
  };
}
```

Each app imports and calls this factory with its own adapter.

## App Configurations

### apps/server (SSR / Bun Runtime)

```javascript
// apps/server/svelte.config.js
import bunAdapter from "svelte-adapter-bun";
import { createSvelteConfig } from "../../svelte.config.js";

export default createSvelteConfig({
  adapter: bunAdapter(),
});
```

- **Adapter**: `svelte-adapter-bun@^1.0.1`
- **Mode**: Full SSR (default)
- **Runtime**: Bun
- **Port**: 3000 (dev)
- **Purpose**: API server handling REST endpoints, auth, CORS, sessions

### apps/manager (Static SPA)

```javascript
// apps/manager/svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { createSvelteConfig } from "../../svelte.config.js";

export default createSvelteConfig({
  adapter: adapter({
    pages: "build",
    assets: "build",
    fallback: "index.html",
  }),
});
```

- **Adapter**: `@sveltejs/adapter-static@3.0.10`
- **Mode**: SPA (`ssr = false`, `csr = true` in root layout)
- **Port**: 5173 (dev)
- **Proxy**: `/api` requests proxied to `localhost:3000`
- **Purpose**: Admin dashboard for managing orgs, events, members

### apps/member (Static SPA + Capacitor)

```javascript
// apps/member/svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { createSvelteConfig } from "../../svelte.config.js";

export default createSvelteConfig({
  adapter: adapter({
    pages: "build",
    assets: "build",
    fallback: "index.html",
  }),
});
```

- **Adapter**: `@sveltejs/adapter-static@3.0.10`
- **Mode**: SPA (`ssr = false`)
- **Port**: 5174 (dev)
- **Proxy**: `/api` requests proxied to `localhost:3000`
- **Native**: Capacitor for iOS/Android (reads from `build/` directory)
- **Purpose**: Member-facing mobile/web app

## Shared Path Aliases

All apps share these aliases (configured in root `svelte.config.js`):

| Alias             | Path                                | Usage                                  |
| ----------------- | ----------------------------------- | -------------------------------------- |
| `$prisma`         | `./prisma/generated`                | Prisma generated types                 |
| `$prisma/client`  | `./prisma/generated/client`         | Server-only Prisma client              |
| `$prisma/browser` | `./prisma/generated/client/browser` | Client-safe Prisma types               |
| `$server`         | `./server`                          | Shared server utilities                |
| `$components`     | `./components`                      | Shared UI components                   |
| `$styles`         | `./styles`                          | Shared CSS/styles                      |
| `$utils`          | `./utils`                           | Shared client utilities                |
| `$lib`            | `./src/lib`                         | Per-app library (SvelteKit convention) |

**Migration note**: All aliases except `$lib` need to be preserved in TanStack Start's Vite config (via `vite-tsconfig-paths` or manual `resolve.alias`). The `$lib` alias is SvelteKit-specific and will need to be replaced or reconfigured.

## Vite Config Factory

```typescript
// vite.config.ts (root)
export function createViteConfig(overrides) {
  return defineConfig({
    plugins: [sveltekit(), tailwindcss(), devtoolsJson()],
    ssr: {
      external: ["@prisma/client", "argon2", "sharp" /* Capacitor packages */],
    },
    build: {
      rollupOptions: {
        external: ["@prisma/client/runtime/*", "argon2", "sharp"],
      },
    },
    ...overrides,
  });
}
```

**Migration note**: Replace `sveltekit()` with `tanstackSvelteStart()` and `svelte()` plugins. Keep `tailwindcss()` and SSR externals.

## Adapter Rules (Current)

1. Use `apps/server/svelte.config.js` for SSR/server features
2. Keep `apps/manager` + `apps/member` as static SPA unless explicitly changed
3. Preserve prerender settings and SPA fallback when using adapter-static
4. Do not edit root `svelte.config.js` unless changing shared defaults
5. Always import from `../../svelte.config.js` and extend via `createSvelteConfig`
