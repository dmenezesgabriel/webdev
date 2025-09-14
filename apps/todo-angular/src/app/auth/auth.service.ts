import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import type { NewUser, User } from '../core/user/user.model';
import type { Observable } from 'rxjs';
import type { AuthTokenResponse, LoginCredentials } from './auth.model';
import { environment } from '../../environments/environment';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  private baseUrl = environment.todoApiBaseUrl;
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  registerUser(userData: NewUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userData);
  }

  loginUser(credentials: LoginCredentials): Observable<AuthTokenResponse> {
    return this.http
      .post<AuthTokenResponse>(`${this.baseUrl}/sessions`, credentials)
      .pipe(
        tap((response) => {
          this.saveToken(response.data.token);
          this.loggedIn.next(true);
        })
      );
  }

  saveToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.loggedIn.next(false);
    this.router.navigate(['/sign-in']);
  }
}
