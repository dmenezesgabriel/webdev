import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

import { TodoHTTPPresenter } from "@/infrastructure/http/presenters/todo";

export async function createTodo(request: FastifyRequest, reply: FastifyReply) {
  const bodySchema = z.object({
    title: z.string().min(1),
  });

  const { title } = bodySchema.parse(request.body);
  const userId = request.user.sub;

  const createTodoUseCase = request.diScope.resolve("createTodoUseCase");
  const { todo } = await createTodoUseCase.execute({ title, userId });

  const todoPresentation = TodoHTTPPresenter.present(todo);

  const response = { data: todoPresentation };

  return reply.code(201).send(response);
}
