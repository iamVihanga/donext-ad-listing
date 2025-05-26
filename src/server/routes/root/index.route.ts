import { createRoute } from "@hono/zod-openapi";
import { jsonContent } from "stoker/openapi/helpers";
import * as HttpStatusCodes from "stoker/http-status-codes";

import { createRouter } from "@/server/helpers/create-app";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

const router = createRouter().openapi(
  createRoute({
    tags: ["Root"],
    method: "get",
    path: "/root",
    responses: {
      [HttpStatusCodes.OK]: jsonContent(
        createMessageObjectSchema("Donext Boilerplate"),
        "DONEXT Boilerplate API - Index"
      )
    }
  }),
  (c) => {
    return c.json(
      {
        message: "DONEXT Boilerplate API - Index"
      },
      HttpStatusCodes.OK
    );
  }
);

export default router;
