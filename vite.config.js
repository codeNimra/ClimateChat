import { defineConfig } from "vite";

export default defineConfig({
  // Project root is the folder containing index.html
  root: ".",

  server: {
    port: 3000,
    open: true, // auto-opens browser on npm run dev
  },

  build: {
    outDir: "dist",
  },
});