import { z } from "zod";

import { AdSchema, AdTypeSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

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
