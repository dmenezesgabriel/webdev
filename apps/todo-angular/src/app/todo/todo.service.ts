import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TodoListResponse, TodoResponse } from '../core/models/api';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTodos(): Observable<TodoListResponse> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<TodoListResponse>(`${this.baseUrl}/todos`, {
      headers,
    });
  }

  addTodo(title: string): Observable<TodoResponse> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<TodoResponse>(
      `${this.baseUrl}/todos`,
      { title },
      { headers }
    );
  }

  toggleTodo(id: string): Observable<TodoResponse> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.patch<TodoResponse>(
      `${this.baseUrl}/todos/${id}/toggle`,
      {},
      { headers }
    );
  }

  deleteTodo(id: string): Observable<void> {
    const token = this.authService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`, { headers });
  }
}
