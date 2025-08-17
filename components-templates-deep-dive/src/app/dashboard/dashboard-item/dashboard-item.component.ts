import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  styleUrl: './dashboard-item.component.css',
  template: `
    <article>
      <header>
        <img [src]="image.src" [alt]="image.alt" />
        <h2>{{ title }}</h2>
      </header>
      <ng-content />
    </article>
  `,
})
export class DashboardItemComponent {
  @Input({ required: true }) image!: { src: string; alt: string };
  @Input({ required: true }) title!: string;
}
