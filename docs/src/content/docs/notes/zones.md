---
title: "Zones and change detection"
description: "Learn about Zone.js and change detection in Angular"
---

## Zone.js

Zone.js notifies Angular about user events

## Zone.js Change Detection

- When a change occurs all component's templates are re-evaluated to determine what has changed in the DOM

```ts
// timer.component.ts
import { Component, NgZone } from "@angular/core";

@Component({
  selector: "app-timer",
  standalone: true,
  imports: [],
  templateUrl: "./timer.component.html",
  styleUrl: "./timer.component.css",
})
export class TimerComponent {
  constructor(private zone: NgZone) {
    // Avoiding zone pollution
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        console.log("Timer tick");
      }, 1000);
    });
  }
}
```

## OnPush Change Detection

- When a change occurs only the component which has changed and its children are re-evaluated to determine what has changed in the DOM
- Change detection OnPush it can be triggered by:
  - An @Input() property changes
  - An event originated from the component or one of its children
  - Manually triggering change detection
  - A Signal used in the template changes

```ts
// on-push.component.ts
import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-on-push",
  standalone: true,
  imports: [],
  templateUrl: "./on-push.component.html",
  styleUrl: "./on-push.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnPushComponent {
  count = 0;

  increment() {
    this.count++;
  }
}
```

_When using signals, zone.js is not required anymore for change detection_
