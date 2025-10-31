import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [react()],
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "public"),
  build: {
    outDir: resolve(__dirname, "../js/dist"),
    emptyOutDir: false,
    sourcemap: true,
    rollupOptions: {
      input: {
        header: resolve(__dirname, "src/entries/header.tsx"),
        consent: resolve(__dirname, "src/entries/consent.ts"),
        newsletter: resolve(__dirname, "src/entries/newsletter.tsx")
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
        format: "es"
      }
    }
  },
  resolve: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@utils": resolve(__dirname, "src/utils"),
      "@types": resolve(__dirname, "src/types")
    }
  }
});
