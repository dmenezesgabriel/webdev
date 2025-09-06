import { InMemoryTodoRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-todo-repoitory";
import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";

import { ListTodosUseCase } from "../list-todos";

export function listTodosUseCaseFactory() {
  const inMemoryTodoRepository = new InMemoryTodoRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const listTodosUseCase = new ListTodosUseCase(
    inMemoryTodoRepository,
    inMemoryUserRepository
  );

  return listTodosUseCase;
}
