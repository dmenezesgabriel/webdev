# Angular

## Run

## Use specific Angular version

```sh
npx @angular/cli@SPECIFIC_VERSION new my-app
```

```sh
npx ng generate component dir/my-component
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
