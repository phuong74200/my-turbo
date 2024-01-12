import { vitePluginTypesriptAlias } from "@repo/vite-plugins";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

const TURBO_INVOCATION_DIR = process.env.TURBO_INVOCATION_DIR || __dirname;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginTypesriptAlias({
      root: TURBO_INVOCATION_DIR + "/app/aladin",
    }),
  ],
});
