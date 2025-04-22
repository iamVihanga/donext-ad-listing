import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberCreateManyOrganizationInputSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInput> = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberCreateManyOrganizationInputSchema;
