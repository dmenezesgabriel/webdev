import { FastifyInstance } from "fastify";

import { createUserController } from "./create-user";
import { listUsersController } from "./list-users";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUserController);
  app.get("/users", listUsersController);
}
