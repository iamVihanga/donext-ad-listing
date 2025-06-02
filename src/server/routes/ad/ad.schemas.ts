import { z } from "zod";

import { AdSchema, AdTypeSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

export const querySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional()
});

export type QueryParams = z.infer<typeof querySchema>;

export const withPaginationSchema = z.object({
  ads: z.array(AdSchema),
  pagination: z.object({
    total: z.number().default(0),
    page: z.number().default(0),
    limit: z.number().default(0),
    totalPages: z.number().default(0)
  })
});

// CRUD Schemas
export const AdTypes = AdTypeSchema.enum;

export const selectAdSchema = AdSchema;

export type SelectAdSchema = z.infer<typeof selectAdSchema>;

export const createAdSchema = AdSchema.partial()
  .omit({
    id: true,
    createdBy: true,
    createdAt: true,
    updatedAt: true
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

export const updateAdSchema = AdSchema.partial();

export type UpdateAdSchema = z.infer<typeof updateAdSchema>;

export const deleteAdSchema = IdParamsSchema;

export type DeleteAdSchema = z.infer<typeof deleteAdSchema>;
