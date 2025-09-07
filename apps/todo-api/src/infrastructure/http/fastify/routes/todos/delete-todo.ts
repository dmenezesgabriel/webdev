import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTodo(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.uuid(),
    todoId: z.uuid(),
  });

  const { userId, todoId } = paramsSchema.parse(request.params);
  const deleteTodoUseCase = request.diScope.resolve("deleteTodoUseCase");
  await deleteTodoUseCase.execute({ userId, todoId });

  return reply.code(204).send();
}
