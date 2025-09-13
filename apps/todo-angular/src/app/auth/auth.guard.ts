import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  type GuardResult,
  type MaybeAsync,
} from '@angular/router';
import { AuthTokenService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private AuthTokenService: AuthTokenService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.AuthTokenService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }
}
