import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TodoListResponse, TodoResponse } from './todo.model';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = environment.todoApiBaseUrl;

  constructor(
    private http: HttpClient,
    private JwtAuthService: JwtAuthService,
  ) {}

  getTodos(): Observable<TodoListResponse> {
    const token = this.JwtAuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.get<TodoListResponse>(`${this.baseUrl}/todos`, {
      headers,
    });
  }

  addTodo(title: string): Observable<TodoResponse> {
    const token = this.JwtAuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.post<TodoResponse>(
      `${this.baseUrl}/todos`,
      { title },
      { headers },
    );
  }

  toggleTodo(id: string): Observable<TodoResponse> {
    const token = this.JwtAuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.patch<TodoResponse>(
      `${this.baseUrl}/todos/${id}/toggle`,
      {},
      { headers },
    );
  }

  deleteTodo(id: string): Observable<void> {
    const token = this.JwtAuthService.getToken();
    const headers = { Authorization: `Bearer ${token}` };

    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`, { headers });
  }
}
