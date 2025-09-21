import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isPreview = mode === "preview";

  return {
    base: isPreview ? "/webdev/vite-remote" : "./",
    build: {
      outDir: "dist",
      assetsDir: "",
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    plugins: [
      react(),
      federation({
        name: "viteRemote",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        shared: ["react", "react-dom"],
      }),
    ],
  };
});
