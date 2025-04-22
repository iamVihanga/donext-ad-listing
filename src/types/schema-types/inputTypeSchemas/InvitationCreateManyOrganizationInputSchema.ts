import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const InvitationCreateManyOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateManyOrganizationInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string()
}).strict();

export default InvitationCreateManyOrganizationInputSchema;
