import { toast } from "sonner";
import { createAuthClient } from "better-auth/react";
import { adminClient, organizationClient } from "better-auth/client/plugins";

import { ac, admin, member, owner } from "./permissions";

import { env } from "@/lib/env";

export const authClient = createAuthClient({
  baseURL: env.BETTER_AUTH_URL,
  plugins: [
    adminClient(),
    organizationClient({
      ac: ac,
      roles: {
        owner,
        admin,
        member,
      },
    }),
  ],
  fetchOptions: {
    onError: (ctx) => {
      toast.error(ctx.error.message);
    },
  },
});
