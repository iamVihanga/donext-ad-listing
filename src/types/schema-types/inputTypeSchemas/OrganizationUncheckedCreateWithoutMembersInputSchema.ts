import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationUncheckedCreateWithoutMembersInputSchema;
