import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { NewUser, User } from '../core/user/user.model';
import type { Observable } from 'rxjs';
import type { AuthTokenResponse, LoginCredentials } from './auth.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private baseUrl = environment.todoApiBaseUrl;

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(userData: NewUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userData);
  }

  loginUser(credentials: LoginCredentials): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(
      `${this.baseUrl}/sessions`,
      credentials
    );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/sign-in']);
  }
}
