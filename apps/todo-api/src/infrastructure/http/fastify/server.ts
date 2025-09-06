import cors from "@fastify/cors";
import Fastify from "fastify";

import { todoRoutes } from "./controllers/todos/todos-routes";
import { userRoutes } from "./controllers/users/users.routes";

async function bootstrap() {
  const app = Fastify();

  app.register(cors, { origin: true });
  app.register(userRoutes);
  app.register(todoRoutes);

  try {
    app
      .listen({ port: 3333 })
      .then(() => console.log("🚀 Server running at http://localhost:3333"));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
