/* eslint-disable @typescript-eslint/no-explicit-any */
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import {
  organization,
  twoFactor,
  admin as adminPlugin,
  openAPI,
  bearer
} from "better-auth/plugins";
import { ac, admin, member, owner } from "./permissions";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb"
  }),
  plugins: [
    twoFactor(),
    adminPlugin(),
    openAPI(),
    bearer(),
    organization({
      ac: ac,
      roles: {
        member,
        admin,
        owner
      },

      allowUserToCreateOrganization(user) {
        const isAdmin = (user as any)?.role === "admin";
        return isAdmin;
      },

      async sendInvitationEmail(data) {
        const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/accept-invitation/${data.id}`;

        console.log({ inviteLink });

        // TODO: implement sending email functionality

        // TODO: Implement sending notification functionality
      }
    })
  ],
  emailAndPassword: {
    enabled: true
  }
});

export type Session = typeof auth.$Infer.Session;
