import { Component } from '@angular/core';
import { ButtonComponent } from '../shared/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent {}
