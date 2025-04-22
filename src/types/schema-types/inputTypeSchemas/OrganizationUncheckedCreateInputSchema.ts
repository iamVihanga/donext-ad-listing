import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema';
import { InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema } from './InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationUncheckedCreateInputSchema;
