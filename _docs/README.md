# Learning Angular

## Reproduce this repo

- Create a new Astro project with the Starlight template

```sh
pnpm create astro --template starlight
```

- Add the Analog Angular integration

```sh
pnpm astro add @analogjs/astro-angular
```

- Create tsconfig.app.json in the root of your project

```json
// tsconfig.app.json
{
  "extends": "./tsconfig.json",
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "noEmit": false,
    "target": "es2020",
    "module": "es2020",
    "lib": ["es2020", "dom"],
    "skipLibCheck": true
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true,
    "allowJs": false
  },
  "files": [],
  "include": ["src/**/*.ts", "src/**/*.tsx"]
}
```

- update your `astro.config.mjs` to include analogjs vite options

```js
    analogjsangular({
      vite: {
        transformFilter: (_code, id) => {
          return id.includes("src/components"); // <- only transform Angular TypeScript files
        },
      },
    }),
```

- [Astro + Angular](https://www.youtube.com/watch?v=idUSomBLows&list=WL&index=2)
