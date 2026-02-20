import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/svelte-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      // Optional: customize Svelte compiler options
      // svelte: { compilerOptions: { ... } },
    }),
  ],
});
