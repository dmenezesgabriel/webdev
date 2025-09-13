import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import type { Observable } from 'rxjs';
import type { TodoListResponse, TodoResponse } from '../core/models/api';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'http://localhost:3333';

  constructor(private http: HttpClient) {}

  getTodos(): Observable<TodoListResponse> {
    return this.http.get<TodoListResponse>(`${this.baseUrl}/todos`);
  }

  addTodo(title: string): Observable<TodoResponse> {
    return this.http.post<TodoResponse>(`${this.baseUrl}/todos`, { title });
  }

  deleteTodo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/todos/${id}`);
  }
}
