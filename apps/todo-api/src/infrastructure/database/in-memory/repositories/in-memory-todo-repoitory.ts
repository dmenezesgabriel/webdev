import { Todo } from "@/application/entities/todo";
import { TodoRepository } from "@/application/repositories/todo-repository";

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async create(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async findAllByUser(userId: string): Promise<Todo[]> {
    return this.todos.filter((todo) => todo.userId === userId);
  }

  async findById(userId: string, todoId: string): Promise<Todo | null> {
    return (
      this.todos.find((todo) => {
        return todo.userId === userId && todo.id === todoId;
      }) ?? null
    );
  }

  async delete(userId: string, todoId: string): Promise<void> {
    this.todos = this.todos.filter(
      (todo) => !(todo.userId === userId && todo.id === todoId)
    );
  }
}
