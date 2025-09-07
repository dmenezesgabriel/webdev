#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import SwaggerParser from "@apidevtools/swagger-parser";
async function bundleOpenApi() {
    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.error("Usage: openapi-bundle <input-file> <output-file>");
        process.exit(1);
    }
    const [inputFile, outputFile] = args.map((p) => path.resolve(p));
    const distDir = path.dirname(outputFile);
    if (!fs.existsSync(distDir)) {
        fs.mkdirSync(distDir, { recursive: true });
    }
    const api = await SwaggerParser.bundle(inputFile);
    fs.writeFileSync(outputFile, JSON.stringify(api, null, 2), "utf8");
    console.log(`✅ OpenAPI bundled to ${outputFile}`);
}
bundleOpenApi().catch((err) => {
    console.error("❌ Failed to bundle OpenAPI:", err);
    process.exit(1);
});
