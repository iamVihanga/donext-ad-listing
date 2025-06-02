import { createRouter } from "@/server/helpers/create-app";

import * as handlers from "./org.handlers";
import * as routes from "./org.routes";

// Now use the withAuth wrapper for the routes that need authentication
const router = createRouter().openapi(routes.list, handlers.list);

export default router;
