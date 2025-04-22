import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { organization, twoFactor, admin, openAPI } from "better-auth/plugins";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb"
  }),
  plugins: [organization(), twoFactor(), admin(), openAPI()],

  emailAndPassword: {
    enabled: true
  }
});
