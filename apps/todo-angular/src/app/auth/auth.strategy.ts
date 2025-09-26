import { Observable } from 'rxjs';
import type { AuthTokenResponse, LoginCredentials } from './auth.model';
import type { NewUser } from '../core/user/user.model';

export interface AuthStrategy {
  isLoggedIn$: Observable<boolean>;

  registerUser(userData: NewUser): Observable<any>;

  loginUser(credentials: LoginCredentials): Observable<AuthTokenResponse>;

  saveToken(token: string): void;

  getToken(): string | null;

  logout(): void;
}
