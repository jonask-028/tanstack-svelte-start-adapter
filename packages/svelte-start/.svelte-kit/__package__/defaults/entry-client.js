/**
 * Default Client Entry Point
 *
 * This file is the browser entry point for a TanStack Start + Svelte app.
 * It hydrates the server-rendered HTML and boots the client-side router.
 *
 * Users can copy this to `src/entry-client.ts` in their project,
 * or it will be used as the default if no custom entry is provided.
 */
import { hydrateStart } from "@tanstack/svelte-start/client";
import { createRouter } from "./router";
const router = createRouter();
hydrateStart({ router });
