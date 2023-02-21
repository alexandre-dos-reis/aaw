import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: "cjs",
  watch: true,
  onSuccess: "node dist/index.js",
  splitting: false,
  sourcemap: true,
  noExternal: ["@aaw/prisma"],
  //   noExternal: [],
});
