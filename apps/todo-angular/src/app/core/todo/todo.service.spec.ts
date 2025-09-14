import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from '../../auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import type { Todo, TodoResponse } from './todo.model';
import { environment } from '../../../environments/environment';
import { title } from 'process';

describe('TodoService', () => {
  let service: TodoService;
  let httpMock: HttpTestingController;
  let authServiceMock: Partial<AuthService>;

  beforeEach(() => {
    authServiceMock = {
      getToken: jest.fn().mockReturnValue('mock-token'),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        TodoService,
        { provide: AuthService, useValue: authServiceMock },
      ],
    });

    service = TestBed.inject(TodoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('TodoService', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });

    it('should get todos with the correct URL and authorization header', () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          userId: '1',
          title: 'Test Todo',
          completedAt: null,
          createdAt: new Date(),
        },
      ];

      service.getTodos().subscribe((response) => {
        expect(response.data).toEqual(mockTodos);
      });

      const req = httpMock.expectOne(`${environment.todoApiBaseUrl}/todos`);

      expect(req.request.method).toBe('GET');
      expect(req.request.headers.get('Authorization')).toBe(
        'Bearer mock-token'
      );

      req.flush({ data: mockTodos });
    });

    it('should add todo with correct payload and header', () => {
      const newTodoTitle = 'New Test Todo';

      const mockResponse: TodoResponse = {
        data: {
          id: '2',
          userId: '1',
          title: newTodoTitle,
        },
      };

      service.addTodo(newTodoTitle).subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${environment.todoApiBaseUrl}/todos`);

      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ title: newTodoTitle });
      expect(req.request.headers.get('Authorization')).toBe(
        'Bearer mock-token'
      );

      req.flush(mockResponse);
    });

    it('should toggle a todo with the correct URl and headers', () => {
      const todoId = 'mock-id';

      service.toggleTodo(todoId).subscribe((response) => {
        expect(response).toBeDefined();
      });

      const req = httpMock.expectOne(
        `${environment.todoApiBaseUrl}/todos/${todoId}/toggle`
      );

      expect(req.request.method).toBe('PATCH');
      expect(req.request.headers.get('Authorization')).toBe(
        'Bearer mock-token'
      );

      req.flush({});
    });

    it('should delete a todo with the correct URL and headers', () => {
      const todoId = 'mock-id';

      service.deleteTodo(todoId).subscribe((response) => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(
        `${environment.todoApiBaseUrl}/todos/${todoId}`
      );

      expect(req.request.method).toBe('DELETE');
      expect(req.request.headers.get('Authorization')).toBe(
        'Bearer mock-token'
      );

      req.flush(null);
    });
  });
});
