import {
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Inject,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  styleUrl: './control.component.css',
  // disables styles encapsulation (turn into global styles)
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control', // old @HostBinding('class'), @HostListener('click')
  },
  template: `
    <p class="control">
      <label>{{ label }}</label>
      <ng-content select="input, textarea" />
    </p>
  `,
})
export class ControlComponent {
  // @HostBinding('class') className = 'control'; backward compatibility
  @Input({ required: true }) label!: string;
  @ContentChild('input') private control?: ElementRef<
    HTMLInputElement | HTMLTextAreaElement
  >;
  private el = inject(ElementRef);

  @HostListener('click') onClick() {
    console.log(this.el);
    console.log(this.control);
  }
}
