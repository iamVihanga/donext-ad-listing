import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const OrganizationIncludeSchema: z.ZodType<Prisma.OrganizationInclude> = z.object({
}).strict()

export default OrganizationIncludeSchema;
