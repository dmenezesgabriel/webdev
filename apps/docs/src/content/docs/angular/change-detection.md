---
title: "Change Detection"
description: "Learn about Zone.js and Change Detection in Angular"
---

Change detection is the mechanism that Angular uses to update the _view_ when the state of the application changes. Angular provides two main strategies for change detection: `ChangeDetectionStrategy.Default` (_Zone.js_) and `ChangeDetectionStrategy.OnPush`.

Angular's change detection cycle is **synchronous** what means that it will take time to go from the root component to the leaf components in the component tree.

## Zone.js

_Zone.js_ monkey patches all async browser API's and notifies Angular. When an _event_ occurs Zone.js triggers Change Detection and all component's templates are re-evaluated to determine what has changed in the DOM.

### Zones

- [Outer Zone](#outer-zone): ALso known as the _Parent Zone_, and it will never trigger Change Detection, it can be used with `NgZone.runOutsideAngular()`
- [Inner Zone](#inner-zone): Also known as the _Child Zone_, it's the default zone and it will always trigger Change Detection, it can be used with `NgZone.run()`

#### Outer Zone

We can run browser events like `setInterval`, `setTimeout`, `AddEventListener`, outside Angular's zone to avoid unnecessary change detection cycles.

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

#### Inner Zone

Using browser events like `setInterval`, `setTimeout`, `AddEventListener`, inside Angular's zone will always trigger change detection.

## Change Detection

- [Default](#default)
- [OnPush](#onpush)

### Default

When using the default change detection strategy, Angular will check **all** components in the component tree for changes whenever an event occurs.

### OnPush

With `ChangeDetectionStrategy.OnPush` Change Detection never runs unless the view is dirty.

When a change occurs only the component which has changed and its children are re-evaluated to determine what has changed in the DOM.

Change detection OnPush it can be triggered by:

- An `@Input()` property changes.
- An `event` originated from the component or one of its children (event binding in the template).
- async pipes (`| async`). Internally calls `markForCheck()`.
- Manually triggering change detection (`changeDetectorRef.markForCheck()`).
- A Signal used in the template changes.

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

#### markForCheck

`markForCheck()` marks the component and its ancestors as dirty, so they will be checked in the next change detection cycle.

#### detectChanges

`detectChanges()` triggers change detection for the component and its children immediately.

## References

- [(Video) Angular change detection explained in 5 minutes](https://www.youtube.com/watch?v=eNuMUslF8Bw)
- [(Video) From Beginner to Pro: Demystifying Angular Change Detection in Depth](https://www.youtube.com/watch?v=DbUS6h1tANQ)
- [(Article) A change detection, zone.js, zoneless, local change detection, and signals story](https://justangular.com/blog/a-change-detection-zone-js-zoneless-local-change-detection-and-signals-story)
- [(Video) Change Detection in Angular - You Project Is 20x Slower!](https://www.youtube.com/watch?v=-tB-QDrPmuI&t=446s)
- [(Video) WTF is "Zone.js" and is it making your app slow?](https://www.youtube.com/watch?v=lmrf_gPIOZU)
- [(video) Change Detection in Angular - Pt.1 View Checking](https://www.youtube.com/watch?v=hZOauXaO8Z8)
