import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/infrastructure/http/fastify/middlewares/verify-jwt";

import { createTodo } from "./create-todo";
import { deleteTodo } from "./delete-todo";
import { listTodos } from "./list-todos";
import { toggleTodoCompletion } from "./toggle-todo-completion";

export async function todoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/todos", createTodo);
  app.get("/todos", listTodos);
  app.patch("/todos/:todoId/toggle", toggleTodoCompletion);
  app.delete("/todos/:todoId", deleteTodo);
}
