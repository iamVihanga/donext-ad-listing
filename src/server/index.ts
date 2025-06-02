import { createApp } from "@/server/helpers/create-app";
import { configureOpenAPI } from "@/server/helpers/configure-open-api";

// Routes
import rootRoute from "@/server/routes/root/index.route";
import tasksRoute from "@/server/routes/tasks/tasks.index";
import { authController } from "@/server/routes/auth/auth.routes";
import orgRoute from "@/server/routes/orgs/org.index";
import adRoute from "@/server/routes/ad/ad.index";
import mediaRoute from "@/server/routes/media/media.index";

const app = createApp();

// Configure Open API Documentation
configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/", rootRoute)
  .route("/tasks", tasksRoute)

  // Project Routes
  .route("/auth", authController)
  .route("/organizations", orgRoute)
  .route("/ad", adRoute)
  .route("/media", mediaRoute);

export type AppType = typeof routes;

export default app;
