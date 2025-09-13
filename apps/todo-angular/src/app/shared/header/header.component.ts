import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private AuthService: AuthService) {}

  isLoggedIn(): boolean {
    return this.AuthService.isLoggedIn();
  }

  logout(): void {
    this.AuthService.logout();
  }
}
