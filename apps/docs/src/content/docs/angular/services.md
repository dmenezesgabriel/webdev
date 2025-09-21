---
title: "Services and Dependency Injection"
description: "Learn about services and dependency injection in Angular."
---

## Services

- Share logic and data
- Injecting a service garante that only one instance of that service will be used in the entire application

## Dependency Injection

- ElementInjector: Each component has its own injector and a instance of a service provided in the component is unique to that component and its children

```ts
// some-service.service.ts
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
// some-module.module.ts
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
// task.service.ts
@Injectable({
  providedIn: "root", // <- RootInjector
})
export class TaskService {
  ...
}
```

- PlatformInjector: The platform injector is the parent of the root injector and a instance of a service provided in the platform injector is unique in the entire platform, which means that if there are multiple applications running on the same page, they will share the same instance of that service

```ts
// main.ts
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    providers: [
      /* providers here */
    ], // <- PlatformInjector
  })
  .catch((err) => console.error(err));
```
