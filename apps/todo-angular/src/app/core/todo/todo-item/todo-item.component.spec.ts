import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';
import type { Todo } from '../todo.model';
import { By } from '@angular/platform-browser';
import { first } from 'rxjs';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  const mockTodo: Todo = {
    id: 'todo-test-id',
    userId: 'user-test-id',
    title: 'Test Todo',
    completedAt: null,
    createdAt: new Date(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = mockTodo;
    fixture.detectChanges();
  });

  describe('TodoItemComponent', () => {
    it('should create component', () => {
      expect(component).toBeTruthy();
    });

    it('should render correct title', () => {
      const todoTitle = fixture.debugElement.query(
        By.css('[data-testid="todo-title"]')
      );

      expect(todoTitle.nativeElement.textContent.trim()).toBe('Test Todo');
    });

    it('should emit the id of todo when its completion was toggled', (done) => {
      const checkbox = fixture.debugElement.query(By.css('.todo-checkbox'));

      component.toggle.pipe(first()).subscribe((emittedId) => {
        expect(emittedId).toBe(mockTodo.id);
        done();
      });

      checkbox.triggerEventHandler('change', null);
    });

    it('should emit the id of todo when it is deleted', (done) => {
      const deleteButton = fixture.debugElement.query(By.css('.delete-btn'));

      component.delete.pipe(first()).subscribe((emittedId) => {
        expect(emittedId).toBe(mockTodo.id);
        done();
      });

      deleteButton.triggerEventHandler('click', null);
    });

    it('should check the checkbox if the todo is completed', () => {
      component.todo = { ...mockTodo, completedAt: new Date() };

      fixture.detectChanges();

      const checkbox = fixture.debugElement.query(By.css('.todo-checkbox'));

      expect(checkbox.nativeElement.checked).toBe(true);
    });

    it('should not check the checkbox if the todo is not completed', () => {
      const checkbox = fixture.debugElement.query(By.css('.todo-checkbox'));

      expect(checkbox.nativeElement.checked).toBe(false);
    });

    it('should throw an error if the todo input is not provided', () => {
      component.todo = undefined as any;

      expect(() => fixture.detectChanges()).toThrow();
    });
  });
});
