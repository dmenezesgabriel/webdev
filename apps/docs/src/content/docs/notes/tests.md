---
title: "Tests"
description: "Learn about attribute tests in Angular"
---

## Why Unit tests?

- Guard against breaking changes
- Analyze code behavior (Expected, Unexpected)
- Reveal mistakes

## Angular with Jest

- https://github.com/karma-runner/karma?tab=readme-ov-file#karma-is-deprecated-and-is-not-accepting-new-features-or-general-bug-fixes
- https://blog.angular.dev/moving-angular-cli-to-jest-and-web-test-runner-ef85ef69ceca

```sh
npm uninstall @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter
```

<16

```sh
pnpm install -D jest jest-environment-jsdom jest-preset-angular @types/jest
```

remove `angular.json` `test` key

```json
// angular.json
"test": {
    "builder": "@angular-devkit/build-angular:karma",
    "options": {
    "polyfills": [
        "zone.js",
        "zone.js/testing"
    ],
    "tsConfig": "tsconfig.spec.json",
    "inlineStyleLanguage": "css",
    "assets": [
        {
        "glob": "**/*",
        "input": "public"
        }
    ],
    "styles": [
        "src/styles.css"
    ],
    "scripts": [],
    "codeCoverage": true
    }
},
```

update `tsconfig.spec.json`

```json
// tsconfig.spec.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/spec",
    "types": ["jest"]
  },
  "files": ["src/setup-jest.ts"],
  "include": ["src/**/*.spec.ts", "src/**/*.d.ts"]
}
```

add `jest.config.js`:

```js
// jest.config.js
globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: "tsconfig.spec.json", // this is the project root tsconfig
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: "jest-preset-angular",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest", // Only transform .ts files
  },
  transformIgnorePatterns: [
    "/node_modules/(?!flat)/", // Exclude modules except 'flat' from transformation
  ],
  moduleDirectories: ["node_modules", "src"],
  fakeTimers: {
    enableGlobally: true,
  },
};
```

add `setup.jest.ts`

```ts
// setup.jest.ts
import { setupZoneTestEnv } from "jest-preset-angular/setup-env/zone";

setupZoneTestEnv();
```

## References

- [setting-up-jest-in-your-angular-16](https://medium.com/@philip.mutua/setting-up-jest-in-your-angular-16-project-3638ef65f3a3)
- [Angular Unit Testing Crash Course - Make Your Project Bullet Proof](https://www.youtube.com/watch?v=V322hFii-H8&list=WL&index=1)
