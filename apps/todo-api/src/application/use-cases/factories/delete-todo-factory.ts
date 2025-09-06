import { InMemoryTodoRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-todo-repoitory";
import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";
import { DeleteTodoUseCase } from "../delete-todo";

export function deleteTodoUseCaseFactory() {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const inMemoryTodoRepository = new InMemoryTodoRepository();
  const deleteTodoUseCase = new DeleteTodoUseCase(
    inMemoryTodoRepository,
    inMemoryUserRepository
  );

  return deleteTodoUseCase;
}
