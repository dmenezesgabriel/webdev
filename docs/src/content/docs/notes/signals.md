---
title: "Signals"
description: "Learn about Angular Signals"
---

## computed

When dealing with computed properties without `signals` new API, use `get` method

Example:

```ts
// user.component.ts
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
