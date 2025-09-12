import { type FastifyReply, type FastifyRequest } from "fastify";

import { UserPresenter } from "@/infrastructure/http/presenters/user";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const listUsersUseCase = request.diScope.resolve("listUsersUseCase");
  const { users } = await listUsersUseCase.execute();

  const usersPresentation = users.map(UserPresenter.present);

  const response = { data: { users: usersPresentation } };

  return reply.send(response);
}
