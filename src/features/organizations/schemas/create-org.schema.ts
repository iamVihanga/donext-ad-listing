import { z } from "zod";

export const createOrgSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  description: z.string().optional(),
  logo: z.string().optional()
});

export type CreateOrgSchema = z.infer<typeof createOrgSchema>;
