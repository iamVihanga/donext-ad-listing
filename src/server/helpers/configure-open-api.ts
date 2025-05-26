import { Scalar } from "@scalar/hono-api-reference";

import { AppOpenAPI } from "@/types/server";

import packageJSON from "$/package.json";

export function configureOpenAPI(app: AppOpenAPI) {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      version: packageJSON.version,
      title: "DONEXT - Web Boilerplate"
    }
  });

  app.get("/reference", Scalar({ url: "/api/doc", theme: "kepler" }));
}
