import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton], a[appButton]',
  standalone: true,
  imports: [],
  styleUrl: './button.component.css',
  template: `
    <span>
      <ng-content />
    </span>
    <span class="icon">
      <ng-content select="icon" />
    </span>
  `,
})
export class ButtonComponent {}
