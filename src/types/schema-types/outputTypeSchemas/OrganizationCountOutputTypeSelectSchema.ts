import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
  invitations: z.boolean().optional(),
}).strict();

export default OrganizationCountOutputTypeSelectSchema;
