import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/infrastructure/http/fastify/middlewares/verify-jwt";

import { createTodo } from "./create-todo";
import { deleteTodo } from "./delete-todo";
import { listTodos } from "./list-todos";

export async function todoRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJWT);

  app.post("/users/:userId/todos", createTodo);
  app.get("/users/:userId/todos", listTodos);
  app.delete("/users/:userId/todos/:todoId", deleteTodo);
}
