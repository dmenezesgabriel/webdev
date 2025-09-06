import { InMemoryTodoRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-todo-repoitory";
import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";

import { CreateTodoUseCase } from "../create-todo";

export function createTodoUseCaseFactory() {
  const inMemoryTodoRepository = new InMemoryTodoRepository();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createTodoUseCase = new CreateTodoUseCase(
    inMemoryTodoRepository,
    inMemoryUserRepository
  );

  return createTodoUseCase;
}
