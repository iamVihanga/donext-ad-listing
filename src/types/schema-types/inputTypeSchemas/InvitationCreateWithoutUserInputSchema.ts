import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrganizationCreateNestedOneWithoutInvitationsInputSchema } from './OrganizationCreateNestedOneWithoutInvitationsInputSchema';

export const InvitationCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateWithoutUserInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export default InvitationCreateWithoutUserInputSchema;
