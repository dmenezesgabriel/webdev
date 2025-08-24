/**
 * Structural directive example
 */
import {
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import type { Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true,
})
export class AuthDirective {
  userType = input.required<Permission>({ alias: 'appAuth' });
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef); // content of template
  private viewContainerRef = inject(ViewContainerRef); // place in the DOM

  constructor() {
    //effect can be used as  a side effect for input changes
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
