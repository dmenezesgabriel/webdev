# Angular

## Separation of Concerns

Every component should only do "one thing"

## Run

## Use specific Angular version

```sh
npx @angular/cli@SPECIFIC_VERSION new my-app
```

```sh
npx ng generate component dir/my-component --skip-tests
```

```sh
npx ng serve
```

## Attribute binding

Attributes which does not have an equally-named underlying property like _ARIA attributes_ must be bind with the use of `attr.` ex: [attr.aria-label]

- Attributes exists in _HTML_ and the _DOM_, whereas properties are _DOM_ only.

## Zone.js

Zone.js notifies Angular about user events

## computed

When dealing with computed properties without `signals` new API, use `get` method

Example:

```ts
@Component({
  selector: "app-user",
  standalone: true,
  imports: [],
  templateUrl: "./user.component.html",
  styleUrl: "./user.component.css",
})
export class UserComponent {
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();

  // Getters are computed variables similar to Vue.js
  get imagePath() {
    return `users/${this.user.avatar}`;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }
}
```

## Two way binding

`ngModel` (FormsModule)

## NgModules

For Non-standalone modules plus standalone modules live together on NgModules is necessary to use declarations

Example:

```ts
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { UserComponent } from "./user/user.component";
import { TasksComponent } from "./tasks/tasks.component";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent], // Non-standalone modules
  bootstrap: [AppComponent],
  imports: [
    // standalone modules
    BrowserModule,
    HeaderComponent,
    UserComponent,
    TasksComponent,
  ],
})
export class AppModule {}
```

## Extending a built-in element

```ts
import { Component } from "@angular/core";

@Component({
  selector: "button[appButton]",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
})
export class ButtonComponent {}
```

```html
<button appButton></button>
```

## Directives

### Structural directives

Change the DOM

- `*ngIf`
- `*ngFor`

_`*` is syntactic sugar for `ng-template`_

```html
<ng-template ngIf="condition">
  <p>Show me!</p>
</ng-template>
```

## Services

- Share logic and data
- Injecting a service garante that only one instance of that service will be used in the entire application

## Dependency Injection

- ElementInjector: Each component has its own injector and a instance of a service provided in the component is unique to that component and its children

```ts
@Component({
  selector: "app-task-item",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./task-item.component.html",
  styleUrl: "./task-item.component.css",
  providers: [TaskService], // <- ElementInjector
})
```

- ModuleInjector: Each NgModule has its own injector and a instance of a service provided in the NgModule is unique to that NgModule and its children

```ts
@NgModule({
  declarations: [AppComponent], // Non-standalone modules
  bootstrap: [AppComponent],
  imports: [
    // standalone modules
    BrowserModule,
    HeaderComponent,
    UserComponent,
    TasksComponent,
  ],
  providers: [TaskService], // <- ModuleInjector
})
```

- RootInjector: The root injector is the parent of all injectors and a instance of a service provided in the root injector is unique in the entire application

```ts
@Injectable({
  providedIn: "root", // <- RootInjector
})
export class TaskService {
  ...
}
```

- PlatformInjector: The platform injector is the parent of the root injector and a instance of a service provided in the platform injector is unique in the entire platform, which means that if there are multiple applications running on the same page, they will share the same instance of that service

```ts
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      /* providers here */
    ], // <- PlatformInjector
  })
  .catch((err) => console.error(err));
```

## Zone.js Change Detection

- When a change occurs all component's templates are re-evaluated to determine what has changed in the DOM

```ts
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

## Observables

It is a concept introduced by RxJS library to handle asynchronous data streams

## Signals vs Observables

- Observables are values over time, while signals are values in a container that don't need a subscription to be accessed
- With signals, rxjs is not required anymore for reactivity, but since signals are a new concept from version 17 of Angular, you may see a lot of legacy code using observables
- Rxjs Observables can be less verbose than signals when dealing with complex data transformations and operators, for example when using operators like `map`, `filter`, `switchMap`, `debounceTime`, etc.
- Observables are great for managing events and streamed data whereas signals are better suited for managing application state
- Signals can be converted to observables using `toObservable()` and observables can be converted to signals using `toSignal()`
- Observables have no initial value, whereas signals always have an initial value
