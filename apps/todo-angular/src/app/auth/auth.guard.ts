import { Injectable } from '@angular/core';
import { CanActivate, Router, type GuardResult } from '@angular/router';
import { AuthService } from './auth.service';
import { map, take, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<GuardResult> {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        this.router.navigate(['/sign-in']);
        return false;
      })
    );
  }
}
