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
  RemoveRoute,
} from "./ad.routes";
import { QueryParams } from "./ad.schemas";
import { AdStatus, AdType } from "@prisma/client";

// ---- List Ads Handler ----
export const list: AppRouteHandler<ListRoute> = async (c) => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
    } = c.req.query() as QueryParams;

    // Convert to numbers and validate
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
    const offset = (pageNum - 1) * limitNum;

    // Build the where condition for efficient searching
    let whereCondition: any = {};

    if (search && search.trim() !== "") {
      whereCondition = {
        title: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    // Count query for total number of records
    const totalAds = await prisma.ad.count({
      where: whereCondition,
    });

    // Main query with pagination
    const ads = await prisma.ad.findMany({
      where: whereCondition,
      skip: offset,
      take: limitNum,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        media: true,
        category: true,
      },
    });

    // Format the response data to ensure it matches the expected types
    const formattedAds = ads.map((ad) => ({
      ...ad,
      // Ensure these fields have the correct types
      price: ad.price ?? null,
      location: ad.location ?? null,
      metadata: typeof ad.metadata === "object" ? ad.metadata : null,
      tags: ad.tags ?? [],
      // Convert Date objects to ISO strings
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      boostExpiry: ad.boostExpiry?.toISOString() ?? null,
      featureExpiry: ad.featureExpiry?.toISOString() ?? null,
      expiryDate: ad.expiryDate?.toISOString() ?? null,
    }));

    return c.json(
      {
        ads: formattedAds,
        pagination: {
          total: totalAds,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(totalAds / limitNum),
        },
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

// ---- Create Ad Handler ----
export const create: AppRouteHandler<CreateRoute> = async (c) => {
  try {
    const adDetails = c.req.valid("json");
    const user = c.get("user");
    const session = c.get("session");

    if (!user) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      ) as any;
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
        orgId: session.activeOrganizationId,
        createdBy: user.id,
        title: adDetails.title || "",
        description: adDetails.description || "",
        type: (adDetails.type as AdType) || AdType.CAR,
        status: AdStatus.DRAFT,
        seoSlug: seoSlug,

        // Basic Info
        published: adDetails.published || false,
        isDraft: true,
        boosted: adDetails.boosted || false,
        featured: adDetails.featured || false,

        // SEO fields
        seoTitle: adDetails.seoTitle || null,
        seoDescription: adDetails.seoDescription || null,

        // Category & Tags
        categoryId: adDetails.categoryId || null,
        tags: adDetails.tags || [],

        // Pricing & Vehicle Info
        price: adDetails.price || null,
        discountPrice: adDetails.discountPrice || null,
        condition: adDetails.condition || null,
        brand: adDetails.brand || null,
        model: adDetails.model || null,
        mileage: adDetails.mileage || null,
        vehicleType: adDetails.vehicleType || null,
        manufacturedYear: adDetails.manufacturedYear || null,
        transmission: adDetails.transmission || null,
        fuelType: adDetails.fuelType || null,
        engineCapacity: adDetails.engineCapacity || null,
        options: adDetails.options || [],
        isLeased: adDetails.isLeased || null,

        // Contact Info
        name: adDetails.name || null,
        phoneNumber: adDetails.phoneNumber || null,
        whatsappNumber: adDetails.whatsappNumber || null,
        termsAndConditions: adDetails.termsAndConditions || null,

        // Location Info
        location: adDetails.location || null,
        address: adDetails.address || null,
        province: adDetails.province || null,
        district: adDetails.district || null,
        city: adDetails.city || null,

        // Miscellaneous
        specialNote: adDetails.specialNote || null,
        metadata: adDetails.metadata || {},
      },
    });

    // Format dates for the response and ensure metadata is an object or null
    const formattedAd = {
      ...createdAd,
      createdAt: createdAd.createdAt.toISOString(),
      updatedAt: createdAd.updatedAt.toISOString(),
      boostExpiry: createdAd.boostExpiry?.toISOString() ?? null,
      featureExpiry: createdAd.featureExpiry?.toISOString() ?? null,
      expiryDate: createdAd.expiryDate?.toISOString() ?? null,
      // Ensure metadata is an object or null
      metadata:
        typeof createdAd.metadata === "object" ? createdAd.metadata : null,
    };

    return c.json(formattedAd, HttpStatusCodes.CREATED);
  } catch (error: any) {
    console.error("[CREATE AD] Error:", error);

    if (error.name === "ZodError") {
      return c.json(
        {
          message: "Validation error",
          details: error.issues,
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY
      );
    }

    return c.json(
      { message: error.message || HttpStatusPhrases.UNPROCESSABLE_ENTITY },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    );
  }
};

// ---- Get single Ad Handler ----
export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  try {
    const adId = c.req.valid("param").id;

    const ad = await prisma.ad.findUnique({
      where: { id: adId },
      include: {
        media: {
          include: {
            media: true,
          },
        },
        category: true,
      },
    });

    if (!ad) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Format dates for the response and ensure metadata is an object or null
    const formattedAd = {
      ...ad,
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      boostExpiry: ad.boostExpiry?.toISOString() ?? null,
      featureExpiry: ad.featureExpiry?.toISOString() ?? null,
      expiryDate: ad.expiryDate?.toISOString() ?? null,
      metadata: typeof ad.metadata === "object" ? ad.metadata : null,
    };

    return c.json(formattedAd, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error("[GET AD] Error:", error);

    return c.json(
      { message: error.message || "Invalid request" },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    );
  }
};

// ---- Update Ad Handler ----
export const update: AppRouteHandler<UpdateRoute> = async (c) => {
  try {
    const adId = c.req.valid("param").id;
    const adUpdates = c.req.valid("json");
    const user = c.get("user");

    if (!user) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    // Check if ad exists and if user has permission
    const existingAd = await prisma.ad.findUnique({
      where: { id: adId },
    });

    if (!existingAd) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      ) as any;
    }

    // Verify user is the owner of the ad
    if (existingAd.createdBy !== user.id) {
      return c.json(
        { message: "You don't have permission to update this ad" },
        HttpStatusCodes.FORBIDDEN
      ) as any;
    }

    // Make the update
    const updatedAd = await prisma.ad.update({
      where: { id: adId },
      data: {
        ...adUpdates,
        updatedAt: new Date(),
      },
    });

    // Format dates for the response
    const formattedAd = {
      ...updatedAd,
      createdAt: updatedAd.createdAt.toISOString(),
      updatedAt: updatedAd.updatedAt.toISOString(),
      boostExpiry: updatedAd.boostExpiry?.toISOString() ?? null,
      featureExpiry: updatedAd.featureExpiry?.toISOString() ?? null,
      expiryDate: updatedAd.expiryDate?.toISOString() ?? null,
    };

    return c.json(formattedAd, HttpStatusCodes.OK);
  } catch (error: any) {
    console.error("[UPDATE AD] Error:", error);

    // Match the error structure required by jsonContentOneOf
    if (error.name === "ZodError") {
      return c.json(
        {
          error: {
            issues: error.issues,
            name: "ZodError",
          },
          success: false,
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY
      ) as any;
    }

    return c.json(
      {
        error: {
          issues: [
            {
              code: "custom_error",
              message: error.message || "Invalid request",
              path: ["id"],
            },
          ],
          name: "ValidationError",
        },
        success: false,
      },
      HttpStatusCodes.UNPROCESSABLE_ENTITY
    ) as any;
  }
};

// ---- Delete Ad Handler ----
export const remove: AppRouteHandler<RemoveRoute> = async (c) => {
  try {
    const adId = c.req.valid("param").id;
    const user = c.get("user");

    if (!user) {
      return c.json(
        { message: HttpStatusPhrases.UNAUTHORIZED },
        HttpStatusCodes.UNAUTHORIZED
      );
    }

    // Check if ad exists and if user has permission
    const existingAd = await prisma.ad.findUnique({
      where: { id: adId },
    });

    if (!existingAd) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Verify user is the owner of the ad
    if (existingAd.createdBy !== user.id) {
      return c.json(
        { message: "You don't have permission to delete this ad" },
        HttpStatusCodes.FORBIDDEN
      );
    }

    // Delete related records to avoid foreign key constraints
    await prisma.adMedia.deleteMany({
      where: { adId },
    });

    // Also delete any related records in analytics, GeoHeatmap, etc.
    await prisma.adAnalytics.deleteMany({
      where: { adId },
    });

    await prisma.geoHeatmap.deleteMany({
      where: { adId },
    });

    await prisma.shareEvent.deleteMany({
      where: { adId },
    });

    await prisma.adRevision.deleteMany({
      where: { adId },
    });

    await prisma.favorite.deleteMany({
      where: { adId },
    });

    await prisma.payment.deleteMany({
      where: { adId },
    });

    await prisma.report.deleteMany({
      where: { adId },
    });

    // Now delete the ad itself
    await prisma.ad.delete({
      where: { id: adId },
    });

    return c.body(null, HttpStatusCodes.NO_CONTENT);
  } catch (error: any) {
    console.error("[DELETE AD] Error:", error);

    if (error.message && error.message.includes("Invalid")) {
      return c.json(
        {
          error: {
            issues: [
              {
                code: "validation_error",
                path: ["id"],
                message: error.message,
              },
            ],
            name: "ValidationError",
          },
          success: false,
        },
        HttpStatusCodes.UNPROCESSABLE_ENTITY
      );
    }

    return c.json(
      { message: error.message || "Failed to delete ad" },
      HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
