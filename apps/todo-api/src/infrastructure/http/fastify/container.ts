import { diContainer, fastifyAwilixPlugin } from "@fastify/awilix";
import { asClass, asFunction, Lifetime } from "awilix";
import fp from "fastify-plugin";

import { AuthenticateUseCase } from "@/application/use-cases/authenticate";
import { CreateTodoUseCase } from "@/application/use-cases/create-todo";
import { CreateUserUseCase } from "@/application/use-cases/create-user";
import { DeleteTodoUseCase } from "@/application/use-cases/delete-todo";
import { ListTodosUseCase } from "@/application/use-cases/list-todos";
import { ListUsersUseCase } from "@/application/use-cases/list-users";
import { GetUserProfileUseCase } from "@/application/use-cases/profile";
import { InMemoryTodoRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-todo-repository";
import { InMemoryUserRepository } from "@/infrastructure/database/in-memory/repositories/in-memory-user-repository";
import { ToggleTodoCompletionUseCase } from "@/application/use-cases/toggle-todo-completion";

declare module "@fastify/awilix" {
  interface Cradle {
    userRepository: InMemoryUserRepository;
    todoRepository: InMemoryTodoRepository;

    createUserUseCase: CreateUserUseCase;
    listUsersUseCase: ListUsersUseCase;
    createTodoUseCase: CreateTodoUseCase;
    listTodosUseCase: ListTodosUseCase;
    toggleTodoCompletionUseCase: ToggleTodoCompletionUseCase;
    deleteTodoUseCase: DeleteTodoUseCase;

    authenticateUseCase: AuthenticateUseCase;
    getUserProfileUseCase: GetUserProfileUseCase;
  }
}

export const containerPlugin = fp(async (app) => {
  await app.register(fastifyAwilixPlugin, {
    disposeOnClose: true,
    disposeOnResponse: false,
    strictBooleanEnforced: true,
  });

  diContainer.register({
    userRepository: asClass(InMemoryUserRepository, {
      lifetime: Lifetime.SINGLETON,
    }),
    todoRepository: asClass(InMemoryTodoRepository, {
      lifetime: Lifetime.SINGLETON,
    }),

    createUserUseCase: asFunction(
      ({ userRepository }) => {
        return new CreateUserUseCase(userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    listUsersUseCase: asFunction(
      ({ userRepository }) => {
        return new ListUsersUseCase(userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    createTodoUseCase: asFunction(
      ({ userRepository, todoRepository }) => {
        return new CreateTodoUseCase(todoRepository, userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    listTodosUseCase: asFunction(
      ({ userRepository, todoRepository }) => {
        return new ListTodosUseCase(todoRepository, userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    toggleTodoCompletionUseCase: asFunction(({ todoRepository }) => {
      return new ToggleTodoCompletionUseCase(todoRepository);
    }),
    deleteTodoUseCase: asFunction(
      ({ userRepository, todoRepository }) => {
        return new DeleteTodoUseCase(todoRepository, userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    authenticateUseCase: asFunction(
      ({ userRepository }) => {
        return new AuthenticateUseCase(userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
    getUserProfileUseCase: asFunction(
      ({ userRepository }) => {
        return new GetUserProfileUseCase(userRepository);
      },
      { lifetime: Lifetime.SCOPED }
    ),
  });
});
