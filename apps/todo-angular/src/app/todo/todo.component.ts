import { Component, type OnInit } from '@angular/core';
import type { Todo } from '../core/models/api';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from './todo.service';
import { Router } from '@angular/router';

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
    router: Router
  ) {}

  newTodoForm = this.fb.group({
    title: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.isLoading = true;
    this.todoService.getTodos().subscribe({
      next: (response) => {
        this.todos = response.data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load todos: ', err);
        this.isLoading = false;
      },
    });
  }

  addTodo() {
    if (this.newTodoForm.valid) {
      const title = this.newTodoForm.value.title as string;
      this.todoService.addTodo(title).subscribe({
        next: (response) => {
          this.todos = [...this.todos, response.data];
          this.newTodoForm.reset();
        },
        error: (err) => {
          console.log('Failed to add todo: ', err);
        },
      });
    }
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
