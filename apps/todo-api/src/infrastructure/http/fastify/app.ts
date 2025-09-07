import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import Fastify from "fastify";
import openapiSpec from "todo-openapi/spec";

import { env } from "@/env";

import { containerPlugin } from "./container";
import { errorHandler } from "./error-handler";
import { todoRoutes } from "./routes/todos/todos-routes";
import { userRoutes } from "./routes/users/users.routes";

export const app = Fastify({ logger: true });

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

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
  sign: {
    expiresIn: "10m",
  },
});
app.register(fastifyCookie);

app.register(containerPlugin);
app.register(userRoutes);
app.register(todoRoutes);

app.setErrorHandler(errorHandler);
