import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const MemberUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export default MemberUncheckedCreateWithoutOrganizationInputSchema;
