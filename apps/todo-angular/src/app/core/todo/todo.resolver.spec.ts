import { TestBed } from '@angular/core/testing';
import { TodosResolver } from './todo.resolver';
import { TodoService } from './todo.service';
import { from, of, throwError } from 'rxjs';
import { Todo } from './todo.model';

describe('TodosResolver', () => {
  let resolver: TodosResolver;
  let todoServiceMock: Partial<TodoService>;

  const mockTodos: Todo[] = [
    {
      id: '1',
      userId: '1',
      title: 'Test Todo 1',
      completedAt: null,
      createdAt: new Date(),
    },
    {
      id: '2',
      userId: '1',
      title: 'Test Todo 2',
      completedAt: new Date(),
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    todoServiceMock = {
      getTodos: jest.fn().mockReturnValue(of({ data: mockTodos })),
    };

    TestBed.configureTestingModule({
      providers: [
        TodosResolver,
        { provide: TodoService, useValue: todoServiceMock },
      ],
    });

    resolver = TestBed.inject(TodosResolver);
  });

  it('should fetch and return an array of todos', (done) => {
    from(resolver.resolve()).subscribe((todos) => {
      expect(todos).toEqual(mockTodos);
      expect(todoServiceMock.getTodos).toHaveBeenCalled();
    });
    done();
  });

  it('should handle errors from service', (done) => {
    jest
      .spyOn(todoServiceMock, 'getTodos')
      .mockReturnValue(throwError(() => new Error('API Error')));

    from(resolver.resolve()).subscribe({
      next: () => fail('Expected an error, but got a successful response'),
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(todoServiceMock.getTodos).toHaveBeenCalled();
      },
    });
    done();
  });
});
