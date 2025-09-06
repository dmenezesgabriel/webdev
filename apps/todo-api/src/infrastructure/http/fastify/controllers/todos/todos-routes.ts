import { FastifyInstance } from "fastify";

import { createTodoController } from "./create-todo";
import { deleteTodoController } from "./delete-todo";
import { listTodosController } from "./list-todos";

export async function todoRoutes(app: FastifyInstance) {
  app.post("/users/:userId/todos", createTodoController);
  app.get("/users/:userId/todos", listTodosController);
  app.delete("/users/:userId/todos/:todoId", deleteTodoController);
}
