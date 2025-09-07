import { type FastifyReply, type FastifyRequest } from "fastify";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const listUsersUseCase = request.diScope.resolve("listUsersUseCase");
  const users = await listUsersUseCase.execute();

  return reply.send(users);
}
