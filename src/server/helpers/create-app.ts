import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";

import type { AppBindings } from "@/types/server";

import { logger } from "@/server/middlewares/logger";

export function createApp() {
  const app = new OpenAPIHono<AppBindings>({
    strict: false
  }).basePath("/api");

  // logger Middleware
  app.use(logger());

  // Not found Handler
  app.notFound(notFound);

  // Error handler
  app.onError(onError);

  return app;
}
