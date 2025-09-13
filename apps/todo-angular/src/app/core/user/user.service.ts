import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type {
  AuthTokenResponse,
  NewUser,
  User,
  UserCredentials,
} from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  registerUser(userData: NewUser): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userData);
  }

  loginUser(credentials: UserCredentials): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(
      `${this.baseUrl}/sessions`,
      credentials
    );
  }
}
