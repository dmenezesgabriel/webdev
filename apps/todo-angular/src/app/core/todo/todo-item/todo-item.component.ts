import { Component, Input, Output } from '@angular/core';
import type { Todo } from '../todo.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css',
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;
  @Output() delete = new EventEmitter<string>();
  @Output() toggle = new EventEmitter<string>();

  onToggle() {
    this.toggle.emit(this.todo.id);
  }

  onDelete() {
    this.delete.emit(this.todo.id);
  }
}
