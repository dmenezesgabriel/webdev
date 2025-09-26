import { Component } from '@angular/core';
import { JwtAuthService } from '../../auth/jwt-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn$ = this.JwtAuthService.isLoggedIn$;

  constructor(private JwtAuthService: JwtAuthService) {}

  logout(): void {
    this.JwtAuthService.logout();
  }
}
