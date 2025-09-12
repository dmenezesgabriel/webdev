import { type FastifyReply, type FastifyRequest } from "fastify";

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("refreshToken", {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });

  return reply
    .status(200)
    .send({ data: { message: "Logged out successfully" } });
}
