import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { listTodosUseCaseFactory } from "@/application/use-cases/factories/list-todos.factory";

export async function listTodosController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userId: z.uuid(),
  });

  const { userId } = paramsSchema.parse(request.params);
  const listTodosUseCase = listTodosUseCaseFactory();
  const todos = listTodosUseCase.execute(userId);

  return reply.send(todos);
}
