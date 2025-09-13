import { Component } from '@angular/core';
import { AuthTokenService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private AuthTokenService: AuthTokenService) {}

  isLoggedIn(): boolean {
    return this.AuthTokenService.isLoggedIn();
  }

  logout(): void {
    this.AuthTokenService.logout();
  }
}
