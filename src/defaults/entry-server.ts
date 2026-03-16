/**
 * Default Server Entry Point
 *
 * This file is the server entry point for a TanStack Start + Svelte app.
 * It creates the SSR handler that processes incoming requests.
 *
 * The dev server (from start-plugin-core) expects the default export to
 * have a `.fetch(request)` method. We wrap `createStartHandler` in a
 * `createServerEntry` helper to satisfy this contract.
 *
 * Users can copy this to `src/entry-server.ts` in their project,
 * or it will be used as the default if no custom entry is provided.
 */

import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/svelte-start/server";
import type { RequestHandler } from "@tanstack/svelte-start/server";

const fetch = createStartHandler(defaultStreamHandler);

export type ServerEntry = { fetch: RequestHandler };

export function createServerEntry(entry: ServerEntry): ServerEntry {
  return {
    async fetch(...args) {
      return await entry.fetch(...args);
    },
  };
}

export default createServerEntry({ fetch });
