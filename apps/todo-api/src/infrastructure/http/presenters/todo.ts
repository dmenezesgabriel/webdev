import type { Todo } from "@/application/entities/todo";

export class TodoHTTPPresenter {
  static present(todo: Todo) {
    return {
      id: todo.id,
      title: todo.title,
      completedAt: todo.completedAt ?? null,
      createdAt: todo.createdAt ?? null,
      userId: todo.userId,
    };
  }
}
