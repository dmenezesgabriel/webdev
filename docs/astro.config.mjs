// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import analogjsangular from "@analogjs/astro-angular";

// https://astro.build/config
export default defineConfig({
  site: "https://dmenezesgabriel.github.io",
  base: "/angular",

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
          ],
        },
      ],
    }),
    analogjsangular({
      vite: {
        transformFilter: (_code, id) => {
          return id.includes("src/components"); // <- only transform Angular TypeScript files
        },
      },
    }),
  ],
});
