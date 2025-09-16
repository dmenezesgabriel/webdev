// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import analogjsangular from "@analogjs/astro-angular";
import astroModuleFederation from "astro-module-federation";
import react from "@astrojs/react";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV ?? "development";
const { PUBLIC_VITE_REMOTE_URL } = loadEnv(mode, process.cwd(), "");

console.log(mode);
console.log(PUBLIC_VITE_REMOTE_URL);

// https://astro.build/config
export default defineConfig({
  site: "https://dmenezesgabriel.github.io",
  base: "/webdev",

  integrations: [
    starlight({
      title: "Angular Notes",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Notes",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Getting Started", slug: "notes/getting-started" },
            { label: "Components", slug: "notes/components" },
            { label: "Attribute Binding", slug: "notes/attribute-binding" },
            { label: "Directives", slug: "notes/directives" },
            {
              label: "Extending Built-In HTML Elements",
              slug: "notes/extending-builtin-elements",
            },
            { label: "Zones and Change Detection", slug: "notes/zones" },
            { label: "Observables", slug: "notes/observables" },
            { label: "Signals", slug: "notes/signals" },
            { label: "Modules", slug: "notes/modules" },
            { label: "Services", slug: "notes/services" },
            { label: "Http Requests", slug: "notes/http-requests" },
            { label: "Pipes", slug: "notes/pipes" },
            { label: "Typescript erros", slug: "notes/ts-errors" },
          ],
        },
      ],
    }),
    react(),
    analogjsangular({
      vite: {
        transformFilter: (_code, id) => {
          return id.includes("src/components"); // <- only transform Angular TypeScript files
        },
      },
    }),
    astroModuleFederation({
      name: "astroHost",
      remotes: {
        viteRemote: PUBLIC_VITE_REMOTE_URL,
      },
      exposes: {},
      // putting react and react-dom on shared deps generates build error
    }),
  ],
  vite: {
    build: {
      sourcemap: true,
      rollupOptions: {
        logLevel: "debug",
        external: ["viteRemote/App"],
      },
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
    server:
      mode === "development"
        ? {
            proxy: {
              "/webdev/vite-remote": {
                target: "http://localhost:4173",
                changeOrigin: true,
                secure: false,
                ws: true,
              },
            },
          }
        : {},
  },
});
