import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberCreateManyUserInputSchema: z.ZodType<Prisma.MemberCreateManyUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberCreateManyUserInputSchema;
