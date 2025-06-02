/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "@/server/prisma/client";
import * as HttpStatusCodes from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/types/server";
import {
  ListRoute,
  CreateRoute,
  GetOneRoute,
  UpdateRoute,
  RemoveRoute
} from "./ad.routes";
import { QueryParams } from "./ad.schemas";

// ---- List Ads Handler ----
export const list: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = ""
    } = c.req.query() as QueryParams;

    // Convert to numbers and validate
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
    const offset = (pageNum - 1) * limitNum;

    // Build the where condition
    const whereCondition = {};

    // Add search condition if provided
    let adWhereCondition = {};

    if (search && search.trim() !== "") {
      adWhereCondition = {
        title: {
          contains: search,
          mode: "insensitive"
        }
      };
    }

    // Count query for total number of records
    const totalAds = await prisma.ad.count({
      where: {
        ...whereCondition,
        ...(Object.keys(adWhereCondition).length > 0
          ? adWhereCondition
          : undefined)
      }
    });

    // Main query with pagination
    const ads = await prisma.ad.findMany({
      where: whereCondition,
      skip: offset,
      take: limitNum,
      orderBy: {
        createdAt: "desc"
      }
    });

    // Filter out records where user doesn't match search criteria
    const filteredAds = search
      ? ads.filter((ad) =>
          ad?.title?.toLowerCase().includes(search.toLowerCase())
        )
      : ads;

    return c.json(
      {
        ads: filteredAds,
        pagination: {
          total: totalAds,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalAds / limitNum)
        }
      },
      HttpStatusCodes.OK
    );
  } catch (error: any) {
    console.error("[GET ALL ADS] Error:", error);

    return c.json(
      { message: HttpStatusPhrases.INTERNAL_SERVER_ERROR },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// ---- Create Ads Handler ----
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const adDetails = c.req.valid("json");
  const user = c.get("user");
  const session = c.get("session");

  if (!user) {
    return c.json(
      { message: HttpStatusPhrases.UNAUTHORIZED },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  if (!session?.activeOrganizationId) {
    return c.json(
      { message: "Active organization is required to create an ad." },
      HttpStatusCodes.UNAUTHORIZED
    );
  }

  // Prepare Seo slug based on title
  let seoSlug = adDetails
    .title!.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  // Bind random suffix to seoSlug for ensure uniqueness
  seoSlug += `-${Math.random().toString(36).substring(2, 8)}`;

  const createdAd = await prisma.ad.create({
    data: {
      ...adDetails,
      createdBy: user.id,
      orgId: session.activeOrganizationId,
      title: adDetails.title || "",
      description: adDetails.description || "",
      type: adDetails.type || "PRODUCT",
      status: "DRAFT",
      seoSlug: seoSlug
    }
  });

  return c.json(createdAd, HttpStatusCodes.CREATED);
};

// ---- Get single Ad Handler ----
export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const adId = c.req.valid("param").id;

  const ad = await prisma.ad.findUnique({
    where: { id: adId }
  });

  if (!ad) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCodes.NOT_FOUND
    );
  }

  return c.json(ad, HttpStatusCodes.OK);
};

// ---- Update Ad Handler ----
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  const adId = c.req.valid("param").id;
  const adUpdates = c.req.valid("json");

  const ad = await prisma.ad.update({
    where: { id: adId },
    data: adUpdates
  });

  return c.json(ad, HttpStatusCodes.OK);
};

// ---- Delete Ad Handler ----
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  const adId = c.req.valid("param").id;

  const deletedAd = await prisma.ad.delete({
    where: { id: adId }
  });

  return c.json(deletedAd, HttpStatusCodes.OK);
};
