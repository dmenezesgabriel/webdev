import { type FastifyReply, type FastifyRequest } from "fastify";

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const getUserProfile = request.diScope.resolve("getUserProfileUseCase");
  const { user } = await getUserProfile.execute({
    userId: request.user.sub,
  });

  reply.status(200).send({ user: { ...user, password: undefined } });
}
