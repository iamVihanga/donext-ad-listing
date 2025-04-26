import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError } from "stoker/middlewares";
import { defaultHook } from "stoker/openapi";

import type { AppBindings } from "@/types/server";

import { logger } from "@/server/middlewares/logger";

export function createRouter() {
  const newRouterInstance = new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook
  });

  return newRouterInstance;
}

export function createApp() {
  const app = createRouter().basePath("/api");

  // logger Middleware
  app.use(logger());

  // Not found Handler
  app.notFound(notFound);

  // Error handler
  app.onError(onError);

  return app;
}
