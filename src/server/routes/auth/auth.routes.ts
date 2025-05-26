import { auth } from "@/lib/auth";
import { Hono } from "hono";

export const authController = new Hono().on(["POST", "GET"], "/**", (c) => {
  return auth.handler(c.req.raw);
});
