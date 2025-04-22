import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrganizationCreateNestedOneWithoutInvitationsInputSchema } from './OrganizationCreateNestedOneWithoutInvitationsInputSchema';
import { UserCreateNestedOneWithoutInvitationsInputSchema } from './UserCreateNestedOneWithoutInvitationsInputSchema';

export const InvitationCreateInputSchema: z.ZodType<Prisma.InvitationCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export default InvitationCreateInputSchema;
