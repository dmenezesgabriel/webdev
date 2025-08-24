import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  template: `
    <div>
      <h1>Hello, World!</h1>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelloWorld {}
