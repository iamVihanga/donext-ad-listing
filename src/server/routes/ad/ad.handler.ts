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
      filterByUser = false,
    } = c.req.query() as any;

    const session = c.get("session");
    const user = c.get("user");

    // Convert to numbers and validate
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit))); // Cap at 100 items
    const offset = (pageNum - 1) * limitNum;

    // Build the where condition for efficient searching
    let whereCondition: any = {};

    // Filter by current user if filterByUser is true
    if (filterByUser === "true" || filterByUser === true) {
      if (!user) {
        return c.json(
          { message: "Authentication required to filter by user" },
          HttpStatusCodes.UNAUTHORIZED
        );
      }
      whereCondition.createdBy = user.id;
    }

    // Add search functionality if search term is provided
    if (search && search.trim() !== "") {
      const searchCondition = {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            model: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      };

      // If we already have user filter, combine with AND
      if (whereCondition.createdBy) {
        whereCondition = {
          AND: [{ createdBy: whereCondition.createdBy }, searchCondition],
        };
      } else {
        whereCondition = searchCondition;
      }
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
        media: {
          include: {
            media: true,
          },
        },
        category: true,
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        analytics: true,
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

      // Handle all enum types explicitly
      type: ad.type as
        | "CAR"
        | "VAN"
        | "MOTORCYCLE"
        | "BICYCLE"
        | "THREE_WHEEL"
        | "BUS"
        | "LORRY"
        | "HEAVY_DUTY"
        | "TRACTOR"
        | "AUTO_SERVICE"
        | "RENTAL"
        | "AUTO_PARTS"
        | "MAINTENANCE"
        | "BOAT",
      status: ad.status as
        | "ACTIVE"
        | "EXPIRED"
        | "DRAFT"
        | "PENDING_REVIEW"
        | "REJECTED",
      fuelType: ad.fuelType as
        | "PETROL"
        | "DIESEL"
        | "HYBRID"
        | "ELECTRIC"
        | "GAS"
        | null,
      transmission: ad.transmission as "MANUAL" | "AUTOMATIC" | "CVT" | null,
      bodyType: ad.bodyType as "SALOON" | "HATCHBACK" | "STATION_WAGON" | null,
      bikeType: ad.bikeType as
        | "SCOOTER"
        | "E_BIKE"
        | "MOTORBIKES"
        | "QUADRICYCLES"
        | null,
      vehicleType: ad.vehicleType as
        | "BED_TRAILER"
        | "BOWSER"
        | "BULLDOZER"
        | "CRANE"
        | "DUMP_TRUCK"
        | "EXCAVATOR"
        | "LOADER"
        | "OTHER"
        | null,

      // Handle all the new dynamic fields
      condition: ad.condition ?? null,
      brand: ad.brand ?? null,
      model: ad.model ?? null,
      trimEdition: ad.trimEdition ?? null,
      manufacturedYear: ad.manufacturedYear ?? null,
      modelYear: ad.modelYear ?? null,
      mileage: ad.mileage ?? null,
      engineCapacity: ad.engineCapacity ?? null,
      serviceType: ad.serviceType ?? null,
      partType: ad.partType ?? null,
      maintenanceType: ad.maintenanceType ?? null,

      // Contact & Location fields
      name: ad.name ?? null,
      phoneNumber: ad.phoneNumber ?? null,
      whatsappNumber: ad.whatsappNumber ?? null,
      termsAndConditions: ad.termsAndConditions ?? null,
      address: ad.address ?? null,
      province: ad.province ?? null,
      district: ad.district ?? null,
      city: ad.city ?? null,
      specialNote: ad.specialNote ?? null,

      // SEO fields
      seoTitle: ad.seoTitle ?? null,
      seoDescription: ad.seoDescription ?? null,
      seoSlug: ad.seoSlug ?? null,
      categoryId: ad.categoryId ?? null,

      // Status fields
      published: ad.published ?? false,
      isDraft: ad.isDraft ?? true,
      boosted: ad.boosted ?? false,
      featured: ad.featured ?? false,

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
    let seoSlug = "";
    if (adDetails.title) {
      seoSlug = adDetails.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    } else {
      // Generate a slug from brand, model, and year if available
      const slugParts = [
        adDetails.brand,
        adDetails.model,
        adDetails.manufacturedYear || adDetails.modelYear,
      ].filter(Boolean);

      if (slugParts.length > 0) {
        seoSlug = slugParts
          .join(" ")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");
      } else {
        // If no title or vehicle info, use a placeholder with timestamp
        seoSlug = `vehicle-${Date.now()}`;
      }
    }

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
        isDraft: adDetails.isDraft ?? true,
        boosted: adDetails.boosted || false,
        featured: adDetails.featured || false,

        // SEO fields
        seoTitle: adDetails.seoTitle || null,
        seoDescription: adDetails.seoDescription || null,

        // Category & Tags
        categoryId: adDetails.categoryId || null,
        tags: adDetails.tags || [],

        // Pricing
        price: adDetails.price || null,

        // Common Vehicle Fields (used by multiple types)
        condition: adDetails.condition || null,
        brand: adDetails.brand || null,
        model: adDetails.model || null,
        trimEdition: adDetails.trimEdition || null,

        // Year Fields (different names for different types)
        manufacturedYear: adDetails.manufacturedYear || null, // Used by: Car, Motor Bike
        modelYear: adDetails.modelYear || null, // Used by: Van, Three Wheeler, Bus, Lorry, Heavy Duty, Tractor

        // Performance Fields
        mileage: adDetails.mileage || null, // Used by: Car, Van, Motor Bike, Three Wheeler, Bus, Lorry
        engineCapacity: adDetails.engineCapacity || null, // Used by: Car, Van, Motor Bike, Bus, Lorry

        // Car & Van Specific Fields
        fuelType: adDetails.fuelType || null, // Used by: Car
        transmission: adDetails.transmission || null, // Used by: Car
        bodyType: adDetails.bodyType || null, // Used by: Car

        // Motor Bike Specific Fields
        bikeType: adDetails.bikeType || null, // Used by: Motor Bike

        // Heavy Duty Specific Fields
        vehicleType: adDetails.vehicleType || null, // Used by: Heavy Duty

        // Service & Parts Specific Fields
        serviceType: adDetails.serviceType || null, // Used by: Auto Service, Rental
        partType: adDetails.partType || null, // Used by: Auto Parts
        maintenanceType: adDetails.maintenanceType || null, // Used by: Maintenance

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

    // Handle media relationships if mediaIds are provided
    if (
      adDetails.mediaIds &&
      Array.isArray(adDetails.mediaIds) &&
      adDetails.mediaIds.length > 0
    ) {
      const mediaRelations = adDetails.mediaIds.map(
        (mediaId: string, index: number) => ({
          adId: createdAd.id,
          mediaId: mediaId,
          order: index,
        })
      );

      await prisma.adMedia.createMany({
        data: mediaRelations,
      });
    }

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
        creator: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        analytics: true,
        org: {
          select: {
            id: true,
            name: true,
            slug: true,
            logo: true,
          },
        },
        favorites: {
          select: {
            userId: true,
          },
        },
        reports: {
          select: {
            id: true,
            reason: true,
            status: true,
          },
        },
        shareEvents: {
          select: {
            platform: true,
            sharedAt: true,
          },
        },
      },
    });

    if (!ad) {
      return c.json(
        { message: HttpStatusPhrases.NOT_FOUND },
        HttpStatusCodes.NOT_FOUND
      );
    }

    // Format dates for the response and ensure all fields have correct types
    const formattedAd = {
      ...ad,
      // Ensure these fields have the correct types
      price: ad.price ?? null,
      location: ad.location ?? null,
      metadata: typeof ad.metadata === "object" ? ad.metadata : null,
      tags: ad.tags ?? [],

      // Handle all enum types explicitly
      type: ad.type as
        | "CAR"
        | "VAN"
        | "MOTORCYCLE"
        | "BICYCLE"
        | "THREE_WHEEL"
        | "BUS"
        | "LORRY"
        | "HEAVY_DUTY"
        | "TRACTOR"
        | "AUTO_SERVICE"
        | "RENTAL"
        | "AUTO_PARTS"
        | "MAINTENANCE"
        | "BOAT",
      status: ad.status as
        | "ACTIVE"
        | "EXPIRED"
        | "DRAFT"
        | "PENDING_REVIEW"
        | "REJECTED",
      fuelType: ad.fuelType as
        | "PETROL"
        | "DIESEL"
        | "HYBRID"
        | "ELECTRIC"
        | "GAS"
        | null,
      transmission: ad.transmission as "MANUAL" | "AUTOMATIC" | "CVT" | null,
      bodyType: ad.bodyType as "SALOON" | "HATCHBACK" | "STATION_WAGON" | null,
      bikeType: ad.bikeType as
        | "SCOOTER"
        | "E_BIKE"
        | "MOTORBIKES"
        | "QUADRICYCLES"
        | null,
      vehicleType: ad.vehicleType as
        | "BED_TRAILER"
        | "BOWSER"
        | "BULLDOZER"
        | "CRANE"
        | "DUMP_TRUCK"
        | "EXCAVATOR"
        | "LOADER"
        | "OTHER"
        | null,

      // Handle all the new dynamic fields
      condition: ad.condition ?? null,
      brand: ad.brand ?? null,
      model: ad.model ?? null,
      trimEdition: ad.trimEdition ?? null,
      manufacturedYear: ad.manufacturedYear ?? null,
      modelYear: ad.modelYear ?? null,
      mileage: ad.mileage ?? null,
      engineCapacity: ad.engineCapacity ?? null,
      serviceType: ad.serviceType ?? null,
      partType: ad.partType ?? null,
      maintenanceType: ad.maintenanceType ?? null,

      // Contact & Location fields
      name: ad.name ?? null,
      phoneNumber: ad.phoneNumber ?? null,
      whatsappNumber: ad.whatsappNumber ?? null,
      termsAndConditions: ad.termsAndConditions ?? null,
      address: ad.address ?? null,
      province: ad.province ?? null,
      district: ad.district ?? null,
      city: ad.city ?? null,
      specialNote: ad.specialNote ?? null,

      // SEO fields
      seoTitle: ad.seoTitle ?? null,
      seoDescription: ad.seoDescription ?? null,
      seoSlug: ad.seoSlug ?? null,
      categoryId: ad.categoryId ?? null,

      // Status fields
      published: ad.published ?? false,
      isDraft: ad.isDraft ?? true,
      boosted: ad.boosted ?? false,
      featured: ad.featured ?? false,

      // Convert Date objects to ISO strings
      createdAt: ad.createdAt.toISOString(),
      updatedAt: ad.updatedAt.toISOString(),
      boostExpiry: ad.boostExpiry?.toISOString() ?? null,
      featureExpiry: ad.featureExpiry?.toISOString() ?? null,
      expiryDate: ad.expiryDate?.toISOString() ?? null,
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

    // Prepare update data with all the new dynamic fields
    const updateData: any = {
      updatedAt: new Date(),
    };

    // Basic fields
    if (adUpdates.title !== undefined) updateData.title = adUpdates.title;
    if (adUpdates.description !== undefined)
      updateData.description = adUpdates.description;
    if (adUpdates.type !== undefined) updateData.type = adUpdates.type;
    if (adUpdates.price !== undefined) updateData.price = adUpdates.price;
    if (adUpdates.published !== undefined)
      updateData.published = adUpdates.published;
    if (adUpdates.isDraft !== undefined) updateData.isDraft = adUpdates.isDraft;
    if (adUpdates.boosted !== undefined) updateData.boosted = adUpdates.boosted;
    if (adUpdates.featured !== undefined)
      updateData.featured = adUpdates.featured;

    // SEO fields
    if (adUpdates.seoTitle !== undefined)
      updateData.seoTitle = adUpdates.seoTitle;
    if (adUpdates.seoDescription !== undefined)
      updateData.seoDescription = adUpdates.seoDescription;

    // Category & Tags
    if (adUpdates.categoryId !== undefined)
      updateData.categoryId = adUpdates.categoryId;
    if (adUpdates.tags !== undefined) updateData.tags = adUpdates.tags;

    // Common Vehicle Fields
    if (adUpdates.condition !== undefined)
      updateData.condition = adUpdates.condition;
    if (adUpdates.brand !== undefined) updateData.brand = adUpdates.brand;
    if (adUpdates.model !== undefined) updateData.model = adUpdates.model;
    if (adUpdates.trimEdition !== undefined)
      updateData.trimEdition = adUpdates.trimEdition;

    // Year Fields
    if (adUpdates.manufacturedYear !== undefined)
      updateData.manufacturedYear = adUpdates.manufacturedYear;
    if (adUpdates.modelYear !== undefined)
      updateData.modelYear = adUpdates.modelYear;

    // Performance Fields
    if (adUpdates.mileage !== undefined) updateData.mileage = adUpdates.mileage;
    if (adUpdates.engineCapacity !== undefined)
      updateData.engineCapacity = adUpdates.engineCapacity;

    // Type-specific fields
    if (adUpdates.fuelType !== undefined)
      updateData.fuelType = adUpdates.fuelType;
    if (adUpdates.transmission !== undefined)
      updateData.transmission = adUpdates.transmission;
    if (adUpdates.bodyType !== undefined)
      updateData.bodyType = adUpdates.bodyType;
    if (adUpdates.bikeType !== undefined)
      updateData.bikeType = adUpdates.bikeType;
    if (adUpdates.vehicleType !== undefined)
      updateData.vehicleType = adUpdates.vehicleType;
    if (adUpdates.serviceType !== undefined)
      updateData.serviceType = adUpdates.serviceType;
    if (adUpdates.partType !== undefined)
      updateData.partType = adUpdates.partType;
    if (adUpdates.maintenanceType !== undefined)
      updateData.maintenanceType = adUpdates.maintenanceType;

    // Contact Info
    if (adUpdates.name !== undefined) updateData.name = adUpdates.name;
    if (adUpdates.phoneNumber !== undefined)
      updateData.phoneNumber = adUpdates.phoneNumber;
    if (adUpdates.whatsappNumber !== undefined)
      updateData.whatsappNumber = adUpdates.whatsappNumber;
    if (adUpdates.termsAndConditions !== undefined)
      updateData.termsAndConditions = adUpdates.termsAndConditions;

    // Location Info
    if (adUpdates.location !== undefined)
      updateData.location = adUpdates.location;
    if (adUpdates.address !== undefined) updateData.address = adUpdates.address;
    if (adUpdates.province !== undefined)
      updateData.province = adUpdates.province;
    if (adUpdates.district !== undefined)
      updateData.district = adUpdates.district;
    if (adUpdates.city !== undefined) updateData.city = adUpdates.city;

    // Miscellaneous
    if (adUpdates.specialNote !== undefined)
      updateData.specialNote = adUpdates.specialNote;
    if (adUpdates.metadata !== undefined)
      updateData.metadata = adUpdates.metadata;

    // Handle media relationships update
    if (adUpdates.mediaIds !== undefined && Array.isArray(adUpdates.mediaIds)) {
      // Delete existing media relationships
      await prisma.adMedia.deleteMany({
        where: { adId },
      });

      // Create new media relationships if any
      if (adUpdates.mediaIds.length > 0) {
        const mediaRelations = adUpdates.mediaIds.map(
          (mediaId: string, index: number) => ({
            adId: adId,
            mediaId: mediaId,
            order: index,
          })
        );

        await prisma.adMedia.createMany({
          data: mediaRelations,
        });
      }
    }

    // Make the update
    const updatedAd = await prisma.ad.update({
      where: { id: adId },
      data: updateData,
    });

    // Format dates for the response
    const formattedAd = {
      ...updatedAd,
      createdAt: updatedAd.createdAt.toISOString(),
      updatedAt: updatedAd.updatedAt.toISOString(),
      boostExpiry: updatedAd.boostExpiry?.toISOString() ?? null,
      featureExpiry: updatedAd.featureExpiry?.toISOString() ?? null,
      expiryDate: updatedAd.expiryDate?.toISOString() ?? null,
      metadata:
        typeof updatedAd.metadata === "object" ? updatedAd.metadata : null,
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
