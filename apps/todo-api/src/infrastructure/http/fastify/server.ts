import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import openapiSpec from "todo-openapi/spec";

import { containerPlugin } from "./container";
import { todoRoutes } from "./controllers/todos/todos-routes";
import { userRoutes } from "./controllers/users/users.routes";

async function bootstrap() {
  const app = Fastify({ logger: true });

  app.register(containerPlugin);
  app.register(cors, { origin: true });
  app.register(fastifySwagger);
  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
      spec: openapiSpec,
    },
  });

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
