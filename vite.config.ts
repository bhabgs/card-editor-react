import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export const pathResolve = (dir: string) => resolve(process.cwd(), ".", dir);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": pathResolve("src"),
    },
  },
  esbuild: {
    loader: "tsx",
  },
  server: {
    host: "0.0.0.0",
    port: 3002,
  },
});
