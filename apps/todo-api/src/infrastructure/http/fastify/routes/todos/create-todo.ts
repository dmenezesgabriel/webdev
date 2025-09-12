import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { TodoPresenter } from "@/infrastructure/http/presenters/todo";

export async function createTodo(request: FastifyRequest, reply: FastifyReply) {
  const paramsSchema = z.object({
    userId: z.uuid(),
  });

  const bodySchema = z.object({
    title: z.string().min(1),
  });

  const { userId } = paramsSchema.parse(request.params);
  const { title } = bodySchema.parse(request.body);

  const createTodoUseCase = request.diScope.resolve("createTodoUseCase");
  const { todo } = await createTodoUseCase.execute({ title, userId });

  const todoPresentation = TodoPresenter.present(todo);

  const response = { data: { todo: todoPresentation } };

  return reply.code(201).send(response);
}
