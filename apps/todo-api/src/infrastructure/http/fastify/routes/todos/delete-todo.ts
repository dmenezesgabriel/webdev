import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteTodo(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    todoId: z.uuid(),
  });

  const { todoId } = paramsSchema.parse(request.params);
  const userId = request.user.sub;

  const deleteTodoUseCase = request.diScope.resolve("deleteTodoUseCase");
  await deleteTodoUseCase.execute({ userId, todoId });

  return reply.code(204).send();
}
