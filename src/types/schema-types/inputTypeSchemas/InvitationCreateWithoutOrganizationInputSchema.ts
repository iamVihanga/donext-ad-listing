import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutInvitationsInputSchema } from './UserCreateNestedOneWithoutInvitationsInputSchema';

export const InvitationCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export default InvitationCreateWithoutOrganizationInputSchema;
