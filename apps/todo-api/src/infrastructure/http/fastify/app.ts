import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import openapiSpec from "todo-openapi/spec";

import { containerPlugin } from "./container";
import { errorHandler } from "./error-handler";
import { todoRoutes } from "./routes/todos/todos-routes";
import { userRoutes } from "./routes/users/users.routes";

export const app = Fastify({ logger: true });

app.setErrorHandler(errorHandler);

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
