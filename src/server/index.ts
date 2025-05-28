import { createApp } from "@/server/helpers/create-app";
import { configureOpenAPI } from "@/server/helpers/configure-open-api";

// Routes
import { authController } from "@/server/routes/auth/auth.routes";
import rootRoute from "@/server/routes/root/index.route";
import tasksRoute from "@/server/routes/tasks/tasks.index";
import adRoute from "@/server/routes/ad/ad.index";

const app = createApp();

// Configure Open API Documentation
configureOpenAPI(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/auth", authController)
  .route("/", rootRoute)
  .route("/tasks", tasksRoute)
  .route("/ad", adRoute);

export type AppType = typeof routes;

export default app;
