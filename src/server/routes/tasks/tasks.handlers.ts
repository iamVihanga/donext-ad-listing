import type { AppRouteHandler } from "@/types/server";
import type { ListRoute } from "./tasks.routes";

export const list: AppRouteHandler<ListRoute> = (c) => {
  return c.json(
    [
      {
        name: "Learn Hono",
        done: false
      }
    ],
    200
  );
};
