import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';

import { TodoItemComponent } from './todo-item/todo-item.component';
import { SharedModule } from '../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';

@NgModule({
  declarations: [TodoComponent, TodoItemComponent],
  imports: [SharedModule, TodoRoutingModule],
})
export class TodoModule {}
