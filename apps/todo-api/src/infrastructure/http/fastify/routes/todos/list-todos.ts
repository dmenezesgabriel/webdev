import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { TodoPresenter } from "@/infrastructure/http/presenters/todo";

export async function listTodos(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.uuid(),
  });

  const { userId } = paramsSchema.parse(request.params);
  const listTodosUseCase = request.diScope.resolve("listTodosUseCase");
  const { todos } = await listTodosUseCase.execute(userId);

  const todosPresentation = todos.map(TodoPresenter.present);

  const response = { data: { todos: todosPresentation } };

  return reply.send(response);
}
