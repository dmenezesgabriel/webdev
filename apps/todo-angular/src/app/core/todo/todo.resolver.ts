import { Injectable } from '@angular/core';
import { Resolve, type MaybeAsync } from '@angular/router';

import { map } from 'rxjs/operators';
import { TodoService } from './todo.service';
import { Todo } from '../todo/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodosResolver implements Resolve<Todo[]> {
  constructor(private todoService: TodoService) {}

  resolve(): MaybeAsync<Todo[]> {
    return this.todoService.getTodos().pipe(map((response) => response.data));
  }
}
