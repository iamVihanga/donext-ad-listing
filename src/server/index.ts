import { createApp } from "@/server/helpers/create-app";

// Routes
import { authController } from "@/server/routes/auth/auth.routes";

const app = createApp();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/auth", authController);
//   .route("/private", privateRoutes);

export type AppType = typeof routes;

export default app;
