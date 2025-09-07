import { FastifyInstance } from "fastify";

import { createTodo } from "./create-todo";
import { deleteTodo } from "./delete-todo";
import { listTodos } from "./list-todos";

export async function todoRoutes(app: FastifyInstance) {
  app.post("/users/:userId/todos", createTodo);
  app.get("/users/:userId/todos", listTodos);
  app.delete("/users/:userId/todos/:todoId", deleteTodo);
}
