import { type FastifyReply, type FastifyRequest } from "fastify";

import { UserPresenter } from "@/infrastructure/http/presenters/user";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = request.diScope.resolve("getUserProfileUseCase");
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  const userPresentation = UserPresenter.present(user);

  const response = { data: { user: userPresentation } };

  reply.status(200).send(response);
}
