import { routes } from './todo-routing.module';
import { AuthGuard } from '../../auth/auth.guard';
import { TodoComponent } from './todo.component';
import { TodosResolver } from './todo.resolver';

describe('TodoRoutingModule', () => {
  it('should have a route for "todos" with the correct configuration', () => {
    const todoRoute = routes.find((route) => route.path === 'todos');

    expect(todoRoute).toBeTruthy();

    expect(todoRoute?.component).toBe(TodoComponent);
    expect(todoRoute?.canActivate).toEqual([AuthGuard]);
    expect(todoRoute?.resolve).toEqual({ todos: TodosResolver });
  });
});
