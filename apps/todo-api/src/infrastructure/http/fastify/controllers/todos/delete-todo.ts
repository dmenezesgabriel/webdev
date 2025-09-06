import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { deleteTodoUseCaseFactory } from "@/application/use-cases/factories/delete-todo-factory";

export async function deleteTodoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userId: z.uuid(),
    id: z.uuid(),
  });

  const { userId, id: todoId } = paramsSchema.parse(request.params);
  const deleteTodoUseCase = deleteTodoUseCaseFactory();
  await deleteTodoUseCase.execute({ userId, todoId });

  return reply.code(204).send();
}
