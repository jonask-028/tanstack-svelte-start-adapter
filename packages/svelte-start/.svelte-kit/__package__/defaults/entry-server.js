/**
 * Default Server Entry Point
 *
 * This file is the server entry point for a TanStack Start + Svelte app.
 * It creates the SSR handler that processes incoming requests.
 *
 * Users can copy this to `src/entry-server.ts` in their project,
 * or it will be used as the default if no custom entry is provided.
 */
import { createStartHandler, defaultStreamHandler, } from "@tanstack/svelte-start/server";
import { createRouter } from "./router";
export default createStartHandler({
    createRouter,
    handler: defaultStreamHandler,
});
