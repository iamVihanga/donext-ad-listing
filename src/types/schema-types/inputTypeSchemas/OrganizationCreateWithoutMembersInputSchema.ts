import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCreateNestedManyWithoutOrganizationInputSchema } from './InvitationCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationCreateWithoutMembersInputSchema;
