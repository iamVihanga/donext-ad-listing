import { createRouter } from "@/server/helpers/create-app";

import * as handlers from "./tasks.handlers";
import * as routes from "./tasks.routes";

import { withAuth } from "@/server/helpers/guards/with-auth";

// Now use the withAuth wrapper for the routes that need authentication
const router = createRouter()
  // Public routes
  .openapi(routes.list, handlers.list)
  .openapi(routes.getOne, handlers.getOne)

  // Protected routes with auth middleware
  .openapi(routes.create, withAuth(handlers.create))
  .openapi(routes.update, withAuth(handlers.update))
  .openapi(routes.remove, withAuth(handlers.remove));

export default router;
