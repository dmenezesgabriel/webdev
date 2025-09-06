import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function listTodosController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userId: z.uuid(),
  });

  const { userId } = paramsSchema.parse(request.params);
  const listTodosUseCase = request.diScope.resolve("listTodosUseCase");
  const todos = await listTodosUseCase.execute(userId);

  return reply.send(todos);
}
