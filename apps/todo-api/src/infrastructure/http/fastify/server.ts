import { env } from "@/env";

import { app } from "./app";

async function bootstrap() {
  try {
    app
      .listen({ host: env.HOST, port: env.PORT })
      .then(() => console.log(`🚀 Server running at ${env.HOST}:${env.PORT}`));
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

bootstrap();
