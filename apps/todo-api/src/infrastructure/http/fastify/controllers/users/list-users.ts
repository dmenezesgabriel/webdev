import { type FastifyReply, type FastifyRequest } from "fastify";

import { listUsersUseCaseFactory } from "@/application/use-cases/factories/list-users-factory";

export async function listUsersController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const listUsersUseCase = listUsersUseCaseFactory();
  const users = await listUsersUseCase.execute();

  return reply.send(users);
}
