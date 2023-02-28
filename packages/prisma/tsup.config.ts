import { defineConfig } from "tsup";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  clean: true,
  dts: true,
  entry: ["src/index.ts", "src/browser.ts"],
  format: ["cjs", "esm"],
  minify: isProduction,
  sourcemap: true,
});
