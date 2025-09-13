import { type FastifyReply, type FastifyRequest } from "fastify";

import { UserHTTPPresenter } from "@/infrastructure/http/presenters/user";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = request.diScope.resolve("getUserProfileUseCase");
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const userPresentation = UserHTTPPresenter.present(user);

  const response = { data: userPresentation };

  reply.status(200).send(response);
}
