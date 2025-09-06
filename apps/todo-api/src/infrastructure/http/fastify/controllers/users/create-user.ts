import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { createUserUseCaseFactory } from "@/application/use-cases/factories/create-user-factory";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string().min(1),
    email: z.email(),
  });

  const { name, email } = bodySchema.parse(request.body);
  const createUserUseCase = createUserUseCaseFactory();

  const user = createUserUseCase.execute({ name, email });

  reply.code(201).send(user);
}
