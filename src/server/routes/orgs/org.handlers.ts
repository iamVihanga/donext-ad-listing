/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as HttpStatusCodes from "stoker/http-status-codes";

import { prisma } from "@/server/prisma/client";
import type { ListRoute } from "./org.routes";
import { AppRouteHandler } from "@/types/server";

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const user = c.get("user");

  if (!user)
    return c.json(
      { message: "Unauthenticated user" },
      HttpStatusCodes.UNAUTHORIZED
    );

  const isAdmin = user?.role === "admin";

  const { page = "1", limit = "10", search = "" } = c.req.valid("query");

  // Convert to numbers and validate
  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.max(1, Math.min(100, parseInt(limit)));
  const offset = (pageNum - 1) * limitNum;

  // For non-admin users, get the organizations they're enrolled in
  let userOrganizationIds: string[] = [];

  if (!isAdmin && user) {
    // Get the organizations where the user is a member
    const userMemberships = await prisma.member.findMany({
      select: { organizationId: true },
      where: { userId: user.id },
    });

    userOrganizationIds = userMemberships.map((m) => m.organizationId);

    if (userOrganizationIds.length === 0) {
      return c.json(
        {
          organizations: [],
          pagination: {
            total: 0,
            page: pageNum,
            limit: limitNum,
            totalPages: 0,
          },
        },
        HttpStatusCodes.OK
      );
    }
  }

  // Build the where condition based on user role and search parameter
  let whereCondition: any = {};

  // If not admin, add organization filter
  if (!isAdmin && userOrganizationIds.length > 0) {
    whereCondition.id = {
      in: userOrganizationIds,
    };
  }

  // Add search condition if provided
  if (search && search.trim() !== "") {
    whereCondition.name = {
      contains: search,
      mode: "insensitive", // Case insensitive search
    };
  }

  // First, get the total count
  const totalOrganizations = await prisma.organization.count({
    where: whereCondition,
  });

  // Then get the paginated items
  const organizations = await prisma.organization.findMany({
    where: whereCondition,
    skip: offset,
    take: limitNum,
    orderBy: {
      createdAt: "desc",
    },
  });

  return c.json(
    {
      organizations,
      pagination: {
        total: totalOrganizations,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(totalOrganizations / limitNum),
      },
    },
    HttpStatusCodes.OK
  );
};
