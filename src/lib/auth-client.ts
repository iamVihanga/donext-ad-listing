import { createAuthClient } from "better-auth/react";
import { toast } from "sonner";

import { env } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_API_URL,
  fetchOptions: {
    onError: (ctx) => {
      toast.error(ctx.error.message);
    }
  }
});
