import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const InvitationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export default InvitationUncheckedCreateWithoutUserInputSchema;
