import { app } from "./app";

async function bootstrap() {
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
