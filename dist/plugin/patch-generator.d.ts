/**
 * Side-effect module that patches @tanstack/router-generator to support the
 * "svelte" target type.
 *
 * IMPORTANT: This module must be imported BEFORE @tanstack/start-plugin-core
 * so the file on disk is patched before the router-generator module is loaded
 * into memory. ES module evaluation order guarantees this when the import
 * appears first in the importing module.
 */
export {};
//# sourceMappingURL=patch-generator.d.ts.map