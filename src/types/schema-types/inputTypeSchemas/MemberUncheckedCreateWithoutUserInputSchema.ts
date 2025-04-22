import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberUncheckedCreateWithoutUserInputSchema;
