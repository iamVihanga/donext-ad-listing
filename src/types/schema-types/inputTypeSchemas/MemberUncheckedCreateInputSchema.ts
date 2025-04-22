import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberUncheckedCreateInputSchema: z.ZodType<Prisma.MemberUncheckedCreateInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberUncheckedCreateInputSchema;
