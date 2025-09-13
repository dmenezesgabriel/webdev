import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TodoListResponse, TodoResponse } from './todo.model';
import { AuthTokenService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:3333';

  constructor(
    private http: HttpClient,
    private AuthTokenService: AuthTokenService
  ) {}

  getTodos(): Observable<TodoListResponse> {
    const token = this.AuthTokenService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<TodoListResponse>(`${this.baseUrl}/todos`, {
      headers,
    });
  }

  addTodo(title: string): Observable<TodoResponse> {
    const token = this.AuthTokenService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<TodoResponse>(
      `${this.baseUrl}/todos`,
      { title },
      { headers }
    );
  }

  toggleTodo(id: string): Observable<TodoResponse> {
    const token = this.AuthTokenService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.patch<TodoResponse>(
      `${this.baseUrl}/todos/${id}/toggle`,
      {},
      { headers }
    );
  }

  deleteTodo(id: string): Observable<void> {
    const token = this.AuthTokenService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`, { headers });
  }
}
