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
