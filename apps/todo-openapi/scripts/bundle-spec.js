import fs from "node:fs";
import path from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";

const root = path.resolve(".");
const distDir = path.join(root, "dist");

async function bundleOpenApi() {
  const inputFile = path.join(root, "openapi.yaml");
  const bundleJsonFile = path.join(distDir, "openapi.bundle.json");

  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  const api = await SwaggerParser.bundle(inputFile);

  fs.writeFileSync(bundleJsonFile, JSON.stringify(api, null, 2), "utf8");
}

bundleOpenApi().catch((err) => {
  console.error(err);
  process.exit(1);
});
