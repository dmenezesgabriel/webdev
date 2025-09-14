import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoComponent } from './todo.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CardComponent } from '../../shared/card/card.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TodoService } from './todo.service';
import type { Todo } from './todo.model';
import { TodoItemComponent } from './todo-item/todo-item.component';
import { By } from '@angular/platform-browser';

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let mockActivatedRoute: any;
  let todoService: TodoService;

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

  beforeEach(async () => {
    mockActivatedRoute = {
      data: of({ todos: mockTodos }),
    };

    const todoServiceMock = {
      getTodos: jest.fn().mockReturnValue(of({ data: mockTodos })),
      addTodo: jest.fn().mockReturnValue(of({ data: mockTodos[0] })),
      toggleTodo: jest.fn().mockReturnValue(of({ data: mockTodos[1] })),
      deleteTodo: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [TodoComponent, CardComponent, TodoItemComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
        {
          provide: TodoService,
          useValue: todoServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService);
    fixture.detectChanges();
  });

  describe('TodoComponent', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });
  });

  it('should load todos from the route resolver on ngOnInit', () => {
    expect(component.todos).toEqual(mockTodos);
  });

  it('should render the list of todos received from the resolver', () => {
    const todoItems = fixture.debugElement.queryAll(By.css('app-todo-item'));

    expect(todoItems.length).toBe(mockTodos.length);
  });

  it('should render the correct number of todo items', () => {
    const todoItems = fixture.debugElement.queryAll(By.css('app-todo-item'));

    expect(todoItems.length).toBe(mockTodos.length);
  });

  it('should call addTodo and should not reset form when form is invalid', () => {
    const addTodoSpy = jest.spyOn(component, 'addTodo');
    const addTodoServiceSpy = jest.spyOn(todoService, 'addTodo');
    const formResetSpy = jest.spyOn(component.newTodoForm, 'reset');

    component.newTodoForm.setValue({ title: '' });
    fixture.detectChanges();

    component.addTodo();

    expect(addTodoSpy).toHaveBeenCalled();
    expect(addTodoServiceSpy).not.toHaveBeenCalled();
    expect(formResetSpy).not.toHaveBeenCalled();
  });

  it('should add a new todo when form is submitted', () => {
    const newTodo: Todo = {
      id: '3',
      userId: '1',
      title: 'New Todo 3',
      completedAt: null,
      createdAt: new Date(),
    };

    jest.spyOn(todoService, 'addTodo').mockReturnValue(of({ data: newTodo }));
    const fetchTodosSpy = jest.spyOn(component, 'fetchTodos');

    component.newTodoForm.setValue({ title: 'New Todo 3' });
    fixture.detectChanges();

    const formElement = fixture.debugElement.query(
      By.css('form')
    ).nativeElement;

    formElement.dispatchEvent(new Event('submit'));

    expect(todoService.addTodo).toHaveBeenCalledWith('New Todo 3');
    expect(fetchTodosSpy).toHaveBeenCalled();
    expect(component.newTodoForm.value.title).toBeNull();
  });

  it('should toggle a todo item and update the todos array', () => {
    const updatedTodo = { ...mockTodos[0], completedAt: new Date() };
    jest
      .spyOn(todoService, 'toggleTodo')
      .mockReturnValue(of({ data: updatedTodo }));

    component.toggleTodo('1');

    expect(todoService.toggleTodo).toHaveBeenCalledWith('1');
    expect(component.todos[0].completedAt).toBeInstanceOf(Date);
  });

  it('should delete a todo item and remove it from the todos array', () => {
    const initialTodoCount = component.todos.length;
    component.deleteTodo('1');

    expect(todoService.deleteTodo).toHaveBeenCalledWith('1');
    expect(component.todos.length).toBe(initialTodoCount - 1);
    expect(component.todos.find((todo) => todo.id === '1')).toBeUndefined();
  });

  it('should show the loading state when isLoading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.debugElement.query(By.css('.loading-state'));
    expect(loadingElement).toBeTruthy();

    const todoListElement = fixture.debugElement.query(By.css('.todo-list'));
    expect(todoListElement).toBeFalsy();
  });

  it('should show the empty state when there are no todos', () => {
    component.todos = [];
    component.isLoading = false;
    fixture.detectChanges();

    const emptyElement = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyElement).toBeTruthy();

    const todoListElement = fixture.debugElement.query(By.css('.todo-list'));
    expect(todoListElement).toBeFalsy();
  });

  it('should show the todo list when there are todos', () => {
    component.todos = mockTodos;
    component.isLoading = false;
    fixture.detectChanges();

    const todoListElement = fixture.debugElement.query(By.css('.todo-list'));
    expect(todoListElement).toBeTruthy();

    const emptyElement = fixture.debugElement.query(By.css('.empty-state'));
    expect(emptyElement).toBeFalsy();
  });
});
