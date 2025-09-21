import path from "path";
import fs from "fs";
import type { AstroIntegration } from "astro";

export function findPnpmWorkspaceRoot(
  startDir: string = process.cwd(),
  maxDepth: number = 20
): string | null {
  let currentDir = startDir;
  let depth = 0;

  while (depth < maxDepth) {
    const pnpmWorkspacePath = path.join(currentDir, "pnpm-workspace.yaml");

    if (fs.existsSync(pnpmWorkspacePath)) {
      return currentDir;
    }

    const parentDir = path.dirname(currentDir);
    if (currentDir === parentDir) {
      return null;
    }

    currentDir = parentDir;
    depth++;
  }

  // Max depth reached
  return null;
}

const virtualModuleId = "virtual:pnpm-root";
const resolvedVirtualModuleId = `\0${virtualModuleId}`;

export default function pnpmRootPlugin(): AstroIntegration {
  const monorepoRoot = findPnpmWorkspaceRoot();

  return {
    name: "pnpm-root",
    hooks: {
      "astro:config:setup": ({ config, updateConfig, logger }) => {
        logger.info(`Found monorepo root: ${monorepoRoot}`);
        updateConfig({
          vite: {
            plugins: [
              {
                name: "vite-plugin-pnpm-root",
                resolveId(id) {
                  if (id === virtualModuleId) {
                    return resolvedVirtualModuleId;
                  }
                },
                load(id) {
                  if (id === resolvedVirtualModuleId) {
                    return `export const pnpmRoot = '${monorepoRoot}';`;
                  }
                },
              },
            ],
          },
        });
      },
    },
  };
}
