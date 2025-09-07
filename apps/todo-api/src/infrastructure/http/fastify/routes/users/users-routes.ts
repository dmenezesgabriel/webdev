import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/infrastructure/http/fastify/middlewares/verify-jwt";
import { verifyUserRole } from "@/infrastructure/http/fastify/middlewares/verify-user-role";

import { authenticate } from "./authenticate";
import { createUser } from "./create-user";
import { listUsers } from "./list-users";
import { logout } from "./logout";
import { profile } from "./profile";
import { refreshToken } from "./refresh-token";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.post("/sessions", authenticate);
  app.patch("/token/refresh", refreshToken);
  app.post("/sessions/logout", logout);

  app.get("/users", { onRequest: [verifyUserRole("ADMIN")] }, listUsers);
  app.get("/me", { onRequest: [verifyJWT] }, profile);
}
