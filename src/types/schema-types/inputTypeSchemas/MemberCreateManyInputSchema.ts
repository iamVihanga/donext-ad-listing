import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberCreateManyInputSchema: z.ZodType<Prisma.MemberCreateManyInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberCreateManyInputSchema;
