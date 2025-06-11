import { z } from "zod";

import { AdSchema, AdTypeSchema, AdStatusSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

export const querySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  location: z.string().optional()
});

export type QueryParams = z.infer<typeof querySchema>;

// Make sure the Ad fields match what's generated from Prisma
const formattedAdSchema = AdSchema.extend({
  price: z.number().nullable(),
  location: z.string().nullable(),
  metadata: z.record(z.any()).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  boostExpiry: z.string().nullable(),
  featureExpiry: z.string().nullable(),
  expiryDate: z.string().nullable()
});

export const withPaginationSchema = z.object({
  ads: z.array(formattedAdSchema),
  pagination: z.object({
    total: z.number(),
    page: z.number(),
    limit: z.number(),
    totalPages: z.number()
  })
});

// CRUD Schemas
export const AdTypes = AdTypeSchema.enum;
export const AdStatuses = AdStatusSchema.enum;

export const selectAdSchema = formattedAdSchema;

export type SelectAdSchema = z.infer<typeof selectAdSchema>;

export const createAdSchema = AdSchema.partial()
  .omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true
  })
  .extend({
    // Explicitly define price and location to ensure they match the Prisma schema
    price: z.number().nullable().optional(),
    location: z.string().nullable().optional(),
    metadata: z.record(z.any()).optional(),
    // Add mediaIds field for media relationships
    mediaIds: z.array(z.string()).optional()
  })
  .refine((data) => data.title !== "", {
    message: "Ad title is required !",
    path: ["title"]
  })
  .refine((data) => data.description !== "", {
    message: "Ad description is required !",
    path: ["description"]
  })
  .refine((data) => !!data.type, {
    message: "Please select an ad type",
    path: ["type"]
  });

export type CreateAdSchema = z.infer<typeof createAdSchema>;

export const updateAdSchema = AdSchema.partial().extend({
  // Explicitly define price and location for update operations
  price: z.number().nullable().optional(),
  location: z.string().nullable().optional(),
  metadata: z.record(z.any()).optional()
});

export type UpdateAdSchema = z.infer<typeof updateAdSchema>;

export const deleteAdSchema = IdParamsSchema;

export type DeleteAdSchema = z.infer<typeof deleteAdSchema>;
