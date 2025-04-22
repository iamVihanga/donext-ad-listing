import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const OrganizationCreateManyInputSchema: z.ZodType<Prisma.OrganizationCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable()
}).strict();

export default OrganizationCreateManyInputSchema;
