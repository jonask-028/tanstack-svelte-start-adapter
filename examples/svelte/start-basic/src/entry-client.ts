/**
 * Client Entry Point
 *
 * Hydrates the server-rendered app in the browser.
 */

import { hydrateStart } from "@tanstack/svelte-start/client";
import { getRouter } from "./router";

const router = getRouter();

hydrateStart({ router });
