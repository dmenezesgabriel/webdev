import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { AuthGuard } from '../../auth/auth.guard';
import { TodosResolver } from './todo.resolver';

const routes: Routes = [
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [AuthGuard],
    resolve: { todos: TodosResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
