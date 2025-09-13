import { Component, Input, Output } from '@angular/core';
import type { Todo } from '../../core/models/api';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}
