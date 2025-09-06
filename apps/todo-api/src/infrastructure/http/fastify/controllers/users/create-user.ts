import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

export async function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const bodySchema = z.object({
    name: z.string().min(1),
    email: z.email(),
  });

  const { name, email } = bodySchema.parse(request.body);
  const createUserUseCase = request.diScope.resolve("createUserUseCase");

  const user = await createUserUseCase.execute({ name, email });

  reply.code(201).send(user);
}
