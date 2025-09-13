import { Component, type OnInit } from '@angular/core';
import type { Todo } from '../todo/todo.model';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { ActivatedRoute } from '@angular/router';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    private route: ActivatedRoute
  ) {}

  newTodoForm = this.fb.group({
    title: ['', Validators.required],
  });

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(({ todos }) => {
      this.todos = todos;
    });
  }

  fetchTodos() {
    this.isLoading = true;
    this.todoService
      .getTodos()
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.todos = response.data;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to fetch todos: ', err);
          this.isLoading = false;
        },
      });
  }

  addTodo() {
    if (this.newTodoForm.valid) {
      const title = this.newTodoForm.value.title as string;
      this.todoService
        .addTodo(title)
        .pipe(tap(() => this.fetchTodos()))
        .subscribe({
          next: () => {
            this.newTodoForm.reset();
          },
          error: (err) => {
            console.log('Failed to add todo: ', err);
          },
        });
    }
  }

  toggleTodo(id: string) {
    this.todoService
      .toggleTodo(id)
      .pipe(take(1))
      .subscribe({
        next: (response) => {
          this.todos = this.todos.map((todo) => {
            return todo.id === id ? response.data : todo;
          });
        },
        error: (err) => {
          console.error('Failed to toggle todo: ', err);
        },
      });
  }

  deleteTodo(id: string) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      error: (err) => {
        console.log('Failed to delete todo: ', err);
      },
    });
  }
}
