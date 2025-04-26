import { RouteConfig } from "@hono/zod-openapi";

import { serverAuthMiddleware } from "@/server/middlewares/auth-middleware";
import { AppRouteHandler } from "@/types/server";

export function withAuth<R extends RouteConfig>(
  handler: AppRouteHandler<R>
): AppRouteHandler<R> {
  return async (c, next) => {
    return serverAuthMiddleware(c, async () => {
      // Create a self-executing async function to handle the next() pattern properly
      return handler(c, next);
    }) as ReturnType<AppRouteHandler<R>>;
  };
}
