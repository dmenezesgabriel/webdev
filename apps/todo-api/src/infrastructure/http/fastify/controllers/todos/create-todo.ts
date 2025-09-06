import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { createTodoUseCaseFactory } from "@/application/use-cases/factories/create-todo-factory";

export async function createTodoController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramsSchema = z.object({
    userId: z.uuid(),
  });

  const bodySchema = z.object({
    title: z.string().min(1),
  });

  const { userId } = paramsSchema.parse(request.params);
  const { title } = bodySchema.parse(request.body);

  const createTodoUseCase = createTodoUseCaseFactory();
  const todo = createTodoUseCase.execute({ title, userId });

  return reply.code(201).send(todo);
}
