/**
 * Side-effect module that patches @tanstack/router-generator to support the
 * "svelte" target type.
 *
 * IMPORTANT: This module must be imported BEFORE @tanstack/start-plugin-core
 * so the file on disk is patched before the router-generator module is loaded
 * into memory. ES module evaluation order guarantees this when the import
 * appears first in the importing module.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

const SVELTE_TEMPLATE_CASE = `case "svelte": return {
\t\t\t\tfullPkg: "@tanstack/svelte-router",
\t\t\t\tsubPkg: "svelte-router",
\t\t\t\trootRoute: {
\t\t\t\t\ttemplate: () => [
\t\t\t\t\t\t"%%tsrImports%%",
\t\t\t\t\t\t"\\n\\n",
\t\t\t\t\t\t"%%tsrExportStart%%{}%%tsrExportEnd%%\\n"
\t\t\t\t\t].join(""),
\t\t\t\t\timports: {
\t\t\t\t\t\ttsrImports: () => "import { createRootRoute } from '@tanstack/svelte-router';",
\t\t\t\t\t\ttsrExportStart: () => "export const Route = createRootRoute(",
\t\t\t\t\t\ttsrExportEnd: () => ");"
\t\t\t\t\t}
\t\t\t\t},
\t\t\t\troute: {
\t\t\t\t\ttemplate: () => [
\t\t\t\t\t\t"%%tsrImports%%",
\t\t\t\t\t\t"\\n\\n",
\t\t\t\t\t\t"%%tsrExportStart%%{}%%tsrExportEnd%%\\n"
\t\t\t\t\t].join(""),
\t\t\t\t\timports: {
\t\t\t\t\t\ttsrImports: () => config.verboseFileRoutes === false ? "" : "import { createFileRoute } from '@tanstack/svelte-router';",
\t\t\t\t\t\ttsrExportStart: (routePath) => config.verboseFileRoutes === false ? "export const Route = createFileRoute(" : \`export const Route = createFileRoute('\${routePath}')(\`,
\t\t\t\t\t\ttsrExportEnd: () => ");"
\t\t\t\t\t}
\t\t\t\t},
\t\t\t\tlazyRoute: {
\t\t\t\t\ttemplate: () => [
\t\t\t\t\t\t"%%tsrImports%%",
\t\t\t\t\t\t"\\n\\n",
\t\t\t\t\t\t"%%tsrExportStart%%{}%%tsrExportEnd%%\\n"
\t\t\t\t\t].join(""),
\t\t\t\t\timports: {
\t\t\t\t\t\ttsrImports: () => config.verboseFileRoutes === false ? "" : "import { createLazyFileRoute } from '@tanstack/svelte-router';",
\t\t\t\t\t\ttsrExportStart: (routePath) => config.verboseFileRoutes === false ? "export const Route = createLazyFileRoute(" : \`export const Route = createLazyFileRoute('\${routePath}')(\`,
\t\t\t\t\t\ttsrExportEnd: () => ");"
\t\t\t\t\t}
\t\t\t\t}
\t\t\t};
\t\t\t`;

function patchRouterGeneratorTemplate(): void {
  try {
    let dir = process.cwd();
    const templatePaths: string[] = [];

    // Walk up from cwd to find node_modules — in monorepos, they may be hoisted
    for (let i = 0; i < 10; i++) {
      // Standard node_modules layout
      const standardPath = resolve(
        dir,
        "node_modules/@tanstack/router-generator/dist/esm/template.js",
      );
      if (existsSync(standardPath)) {
        templatePaths.push(standardPath);
      }

      // Bun's flat store layout
      const bunDir = resolve(dir, "node_modules/.bun");
      if (existsSync(bunDir)) {
        try {
          const entries = readdirSync(bunDir);
          for (const entry of entries) {
            if (entry.startsWith("@tanstack+router-generator@")) {
              const bunPath = join(
                bunDir,
                entry,
                "node_modules/@tanstack/router-generator/dist/esm/template.js",
              );
              if (existsSync(bunPath)) {
                templatePaths.push(bunPath);
              }
            }
          }
        } catch {
          // Can't read .bun directory
        }
      }

      const parent = resolve(dir, "..");
      if (parent === dir) break;
      dir = parent;
    }

    let patchedCount = 0;
    for (const templatePath of templatePaths) {
      let code = readFileSync(templatePath, "utf-8");

      if (code.includes('case "svelte"')) continue;

      code = code.replace(
        /default:\s*throw new Error\(`router-generator: Unknown target type:/,
        SVELTE_TEMPLATE_CASE +
          "default: throw new Error(`router-generator: Unknown target type:",
      );

      writeFileSync(templatePath, code);
      patchedCount++;
    }

    if (patchedCount > 0) {
      console.log(
        `[svelte-start] Patched ${patchedCount} router-generator template(s) with svelte target`,
      );
    }
  } catch {
    // If patching fails, the error will surface later as "Unknown target type: svelte"
  }
}

patchRouterGeneratorTemplate();
