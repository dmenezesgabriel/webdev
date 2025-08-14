import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  styleUrl: './control.component.css',
  // disables styles encapsulation (turn into global styles)
  encapsulation: ViewEncapsulation.None,
  template: `
    <p class="control">
      <label>{{ label }}</label>
      <ng-content select="input, textarea" />
    </p>
  `,
})
export class ControlComponent {
  @Input({ required: true }) label!: string;
}
