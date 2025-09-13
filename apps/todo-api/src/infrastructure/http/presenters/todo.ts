import type { Todo } from "@/application/entities/todo";

export class TodoHTTPPresenter {
  static present(todo: Todo) {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completedAt,
      createdAt: todo.createdAt,
      userId: todo.userId,
    };
  }
}
