---
title: "Typescript TS2729"
description: "Typescript error TS2729"
---

Angular Property is used before its initialization error

```ts
class Foo {
  bar = this.buz;
  constructor(private buz: unknown) {}
}
```

TS2729: Property 'buz' is used before its initialization.

```json
  "compilerOptions": {
    "useDefineForClassFields": false
  },
```

- https://github.com/microsoft/TypeScript/issues/48814
- https://github.com/microsoft/TypeScript/issues/53286

## References

- https://charliegreenman.medium.com/angular-property-is-used-before-its-initialization-error-2e748d775575
