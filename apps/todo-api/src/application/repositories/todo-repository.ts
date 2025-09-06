import { Todo } from "@/application/entities/todo";

export interface TodoRepository {
  create(todo: Todo): Promise<void>;
  findAllByUser(userId: string): Promise<Todo[]>;
  findById(userId: string, todoId: string): Promise<Todo | null>;
  delete(userId: string, todoId: string): Promise<void>;
}
