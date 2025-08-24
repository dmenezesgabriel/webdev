---
title: "Directives"
description: "Learn about Angular directives"
---

### Structural directives

Change the DOM

- `*ngIf`
- `*ngFor`

_`*` is syntactic sugar for `ng-template`_

```html
<!-- my-component.component.html -->
<ng-template ngIf="condition">
  <p>Show me!</p>
</ng-template>
```
