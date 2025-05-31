import { createRouter } from "@/server/helpers/create-app";

import * as handlers from "./media.handler";
import * as routes from "./media.routes";

// Now use the withAuth wrapper for the routes that need authentication
const router = createRouter()
  .openapi(routes.list, handlers.list)
  .openapi(routes.save, handlers.save)
  .openapi(routes.getOne, handlers.getOne)
  .openapi(routes.remove, handlers.remove);

export default router;
