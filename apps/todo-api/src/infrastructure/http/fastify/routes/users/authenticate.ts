import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { InvalidCredentialsError } from "@/application/use-cases/error/invalid-credentials-error";

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const authenticateBodySchema = z.object({
    email: z.email(),
    password: z.string(),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const authenticateUseCase = request.diScope.resolve("authenticateUseCase");
    const { user } = await authenticateUseCase.execute({
      email,
      password,
    });

    const accessToken = await reply.jwtSign(
      { role: user.role },
      { sign: { sub: user.id, expiresIn: "15m" } }
    );

    // const refreshToken = await reply.jwtSign(
    //   { role: user.role },
    //   { sign: { sub: user.id, expiresIn: "7d" } }
    // );

    const response = { data: { token: accessToken } };

    reply
      // .setCookie("refreshToken", refreshToken, {
      //   path: "/",
      //   secure: true, // HTTPS
      //   sameSite: true,
      //   httpOnly: true,
      // })
      .status(200)
      .send(response);
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message });
    }

    throw err;
  }
}
