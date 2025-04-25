import { createRoute } from "@hono/zod-openapi";
import { z } from "zod";

import { createRouter } from "@/server/helpers/create-app";

const router = createRouter().openapi(
  createRoute({
    method: "get",
    path: "/root",
    responses: {
      200: {
        content: {
          "application/json": {
            schema: z.object({
              message: z.string()
            })
          }
        },
        description: "DONEXT Boilerplate API - Index"
      }
    }
  }),
  (c) => {
    return c.json({
      message: "DONEXT Boilerplate API - Index"
    });
  }
);

export default router;
