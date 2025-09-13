import { type FastifyReply, type FastifyRequest } from "fastify";

import { z } from "zod";

import { TodoHTTPPresenter } from "@/infrastructure/http/presenters/todo";

export async function toggleTodoCompletion(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const paramSchema = z.object({
    todoId: z.uuid(),
  });

  const { todoId } = paramSchema.parse(request.params);
  const userId = request.user.sub;

  const toggleTodoCompletionUseCase = request.diScope.resolve(
    "toggleTodoCompletionUseCase"
  );

  const { todo } = await toggleTodoCompletionUseCase.execute({
    todoId,
    userId,
  });

  const todoPresentation = TodoHTTPPresenter.present(todo);
  const response = { data: todoPresentation };

  return reply.code(200).send(response);
}
