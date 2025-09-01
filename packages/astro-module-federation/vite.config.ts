import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "AstroModuleFederation",
      formats: ["es", "cjs"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "astro",
        "@module-federation/vite",
        "@originjs/vite-plugin-federation",
      ],
    },
  },
  plugins: [dts()],
});
