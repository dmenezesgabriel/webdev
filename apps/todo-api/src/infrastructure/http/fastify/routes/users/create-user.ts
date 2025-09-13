import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { UserAlreadyExistsError } from "@/application/use-cases/error/user-already-exists-error";
import { UserHTTPPresenter } from "@/infrastructure/http/presenters/user";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    name: z.string().min(1),
    email: z.email(),
    password: z.string().min(6),
  });

  const { name, email, password } = bodySchema.parse(request.body);

  try {
    const createUserUseCase = request.diScope.resolve("createUserUseCase");
    const { user } = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    const userPresentation = UserHTTPPresenter.present(user);

    const response = { data: userPresentation };

    reply.code(201).send(response);
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ error: err.message });
    }

    throw err;
  }
}
