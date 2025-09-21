// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import analogjsangular from "@analogjs/astro-angular";
import astroModuleFederation from "astro-module-federation";
import react from "@astrojs/react";
import { loadEnv } from "vite";

const mode = process.env.NODE_ENV ?? "development";
const { PUBLIC_VITE_REMOTE_URL } = loadEnv(mode, process.cwd(), "");
import expressiveCode from "astro-expressive-code";

console.log(mode);
console.log(PUBLIC_VITE_REMOTE_URL);

// https://astro.build/config
export default defineConfig({
  site: "https://dmenezesgabriel.github.io",
  base: "/webdev",

  integrations: [
    expressiveCode(),
    starlight({
      title: "WebDev",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Angular",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Getting Started", slug: "angular/getting-started" },
            { label: "Components", slug: "angular/components" },
            { label: "Attribute Binding", slug: "angular/attribute-binding" },
            { label: "Directives", slug: "angular/directives" },
            {
              label: "Extending Built-In HTML Elements",
              slug: "angular/extending-builtin-elements",
            },
            { label: "Zones and Change Detection", slug: "angular/zones" },
            { label: "Observables", slug: "angular/observables" },
            { label: "Signals", slug: "angular/signals" },
            { label: "Modules", slug: "angular/modules" },
            { label: "Services", slug: "angular/services" },
            { label: "Http Requests", slug: "angular/http-requests" },
            { label: "Pipes", slug: "angular/pipes" },
            { label: "Typescript erros", slug: "angular/ts-errors" },
            {
              label: "Todo App",
              items: [
                {
                  label: "SignIn Component",
                  slug: "angular/todo/sign-in-component",
                },
              ],
            },
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
