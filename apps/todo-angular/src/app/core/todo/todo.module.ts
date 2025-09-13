import { NgModule } from '@angular/core';
import { TodoComponent } from './todo.component';

import { TodoItemComponent } from './todo-item/todo-item.component';
import { SharedModule } from '../../shared/shared.module';
import { TodoRoutingModule } from './todo-routing.module';
import { AuthGuard } from '../../auth/auth.guard';

@NgModule({
  declarations: [TodoComponent, TodoItemComponent],
  imports: [SharedModule, TodoRoutingModule],
  providers: [AuthGuard],
})
export class TodoModule {}
