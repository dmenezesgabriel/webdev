import { FastifyInstance } from "fastify";

import { createUser } from "./create-user";
import { listUsers } from "./list-users";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.get("/users", listUsers);
}
