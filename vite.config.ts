/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 3500,
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  server: {
    host: true,
  },
});
