import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

console.log(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  resolve: {
    alias: {
      "@aaw/validation": path.resolve(
        __dirname,
        "../../packages/validation/src"
      ),
    },
  },
});
