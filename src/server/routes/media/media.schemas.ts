import { z } from "zod";

import { MediaSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

// CRUD Schemas
export const selectMediaSchema = MediaSchema;

export type SelectMediaSchema = z.infer<typeof selectMediaSchema>;

export const saveMediaSchema = MediaSchema.omit({
  id: true,
  uploaderId: true,
  createdAt: true
}).refine((data) => data.url !== "", {
  message: "URL is required !",
  path: ["url"]
});

export type SaveMediaSchema = z.infer<typeof saveMediaSchema>;

export const deleteMediaSchema = IdParamsSchema;

export type DeleteMediaSchema = z.infer<typeof deleteMediaSchema>;
