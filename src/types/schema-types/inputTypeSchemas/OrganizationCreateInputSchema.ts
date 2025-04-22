import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateNestedManyWithoutOrganizationInputSchema } from './MemberCreateNestedManyWithoutOrganizationInputSchema';
import { InvitationCreateNestedManyWithoutOrganizationInputSchema } from './InvitationCreateNestedManyWithoutOrganizationInputSchema';

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export default OrganizationCreateInputSchema;
