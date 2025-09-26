import { Injectable } from '@angular/core';
import { CanActivate, Router, type GuardResult } from '@angular/router';
import { JwtAuthService } from './jwt-auth.service';
import { map, take, type Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private JwtAuthService: JwtAuthService,
    private router: Router,
  ) {}

  canActivate(): Observable<GuardResult> {
    return this.JwtAuthService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn) => {
        if (isLoggedIn) {
          return true;
        }

        this.router.navigate(['/sign-in']);
        return false;
      }),
    );
  }
}
