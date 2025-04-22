import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema } from './MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationUncheckedCreateWithoutInvitationsInputSchema;
