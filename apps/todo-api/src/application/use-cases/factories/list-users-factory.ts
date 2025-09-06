import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";

import { ListUsersUseCase } from "../list-users";

export function listUsersUseCaseFactory() {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const listUsersUseCase = new ListUsersUseCase(inMemoryUserRepository);

  return listUsersUseCase;
}
