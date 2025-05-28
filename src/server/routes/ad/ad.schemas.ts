import { z } from "zod";

import { AdSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

// CRUD Schemas
export const selectAdSchema = AdSchema;

export type SelectAdSchema = z.infer<typeof selectAdSchema>;

export const createAdSchema = AdSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})
  .refine((data) => data.orgId !== "", {
    message: "Organization ID is required !",
    path: ["orgId"]
  })
  .refine((data) => data.title !== "", {
    message: "Ad title is required !",
    path: ["title"]
  })
  .refine((data) => data.createdBy !== "", {
    message: "Created By is required !",
    path: ["createdBy"]
  });

export type CreateAdSchema = z.infer<typeof createAdSchema>;

export const updateAdSchema = AdSchema.partial();

export type UpdateAdSchema = z.infer<typeof updateAdSchema>;

export const deleteAdSchema = IdParamsSchema;

export type DeleteAdSchema = z.infer<typeof deleteAdSchema>;
