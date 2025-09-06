import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";

import { CreateUserUseCase } from "../create-user";

export function createUserUseCaseFactory() {
  const inMemoryUserRepository = new InMemoryUserRepository();
  const createUserUseCaseFactory = new CreateUserUseCase(
    inMemoryUserRepository
  );

  return createUserUseCaseFactory;
}
