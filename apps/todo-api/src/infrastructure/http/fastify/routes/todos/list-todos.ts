import { type FastifyReply, type FastifyRequest } from "fastify";

import { TodoHTTPPresenter } from "@/infrastructure/http/presenters/todo";

export async function listTodos(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub;

  const listTodosUseCase = request.diScope.resolve("listTodosUseCase");
  const { todos } = await listTodosUseCase.execute(userId);

  const todosPresentation = todos.map(TodoHTTPPresenter.present);

  const response = { data: todosPresentation };

  return reply.send(response);
}
