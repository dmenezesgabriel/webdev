---
title: "Http Requests"
description: "Making HTTP requests in Angular applications."
---

### Standalone components

```ts
// main.ts
import { bootstrapApplication } from "@angular/platform-browser";

import { AppComponent } from "./app/app.component";
import { provideHttpClient } from "@angular/common/http";

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()],
}).catch((err) => console.error(err));
```

```ts
// some-component.ts
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-some",
  standalone: true,
  imports: [],
  templateUrl: "./some.component.html",
  styleUrl: "./some.component.css",
})
export class SomeComponent {
  constructor(private http: HttpClient) {}
  fetchData() {
    this.http.get("https://api.example.com/data").subscribe((data) => {
      console.log(data);
    });
  }
}
```

### Non-standalone components (NgModules)

```ts
// app.module.ts
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { provideHttpClient } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```ts
// some-component.ts
import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";

@Component({
  selector: "app-some",
  templateUrl: "./some.component.html",
  styleUrl: "./some.component.css",
})
export class SomeComponent {
  constructor(private http: HttpClient) {}
  fetchData() {
    this.http.get("https://api.example.com/data").subscribe((data) => {
      console.log(data);
    });
  }
}
```
