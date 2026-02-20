/**
 * Server Entry Point
 *
 * Handles SSR rendering for incoming requests.
 * The core plugin's dev server expects `serverEntry.default.fetch(request)`.
 */

import {
  createStartHandler,
  defaultStreamHandler,
  createServerEntry,
} from "@tanstack/svelte-start/server";

const fetch = createStartHandler(defaultStreamHandler);

export default createServerEntry({ fetch });
