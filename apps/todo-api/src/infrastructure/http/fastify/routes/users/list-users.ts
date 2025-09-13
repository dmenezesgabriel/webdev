import { type FastifyReply, type FastifyRequest } from "fastify";

import { UserHTTPPresenter } from "@/infrastructure/http/presenters/user";

export async function listUsers(request: FastifyRequest, reply: FastifyReply) {
  const listUsersUseCase = request.diScope.resolve("listUsersUseCase");
  const { users } = await listUsersUseCase.execute();

  const usersPresentation = users.map(UserHTTPPresenter.present);

  const response = { data: usersPresentation };

  return reply.send(response);
}
