import { RouteConfig } from "@hono/zod-openapi";

import { serverAuthMiddleware } from "@/server/middlewares/auth-middleware";
import { AppRouteHandler } from "@/types/server";

export function withAuth<R extends RouteConfig>(
  handler: AppRouteHandler<R>
): AppRouteHandler<R> {
  return async (c, next) => {
    return await serverAuthMiddleware(c, async () => {
      return await handler(c, next);
    });
  };
}
