/**
 * Client Entry Point
 *
 * Hydrates the server-rendered app in the browser.
 */

import { hydrateStart } from "../../../../src/client";
import { getRouter } from "./router";

const router = getRouter();

hydrateStart({ router });
