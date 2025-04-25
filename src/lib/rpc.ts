import type { AppType } from "@/server";
import { hc } from "hono/client";

import { env } from "@/lib/env";

export const client = hc<AppType>(env.NEXT_PUBLIC_API_URL as string);
