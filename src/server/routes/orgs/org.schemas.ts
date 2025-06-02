import { z } from "zod";
import { OrganizationSchema } from "@/types/schema-types";

export const IdParamsSchema = z.object({ id: z.string() });

export const querySchema = z.object({
  page: z.string().optional().default("1"),
  limit: z.string().optional().default("10"),
  search: z.string().optional()
});

export const withPaginationSchema = z.object({
  organizations: z.array(OrganizationSchema),
  pagination: z.object({
    total: z.number().default(0),
    page: z.number().default(0),
    limit: z.number().default(0),
    totalPages: z.number().default(0)
  })
});
