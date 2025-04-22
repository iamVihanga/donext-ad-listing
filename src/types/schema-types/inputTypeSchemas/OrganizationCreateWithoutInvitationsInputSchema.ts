import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateNestedManyWithoutOrganizationInputSchema } from './MemberCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationCreateWithoutInvitationsInputSchema;
