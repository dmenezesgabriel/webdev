---
title: "Modules"
description: "Learn about Angular modules"
---

## NgModules

For Non-standalone modules plus standalone modules live together on NgModules is necessary to use declarations

Example:

```ts
// app.module.ts
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
