import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { MemberOrderByRelationAggregateInputSchema } from './MemberOrderByRelationAggregateInputSchema';
import { InvitationOrderByRelationAggregateInputSchema } from './InvitationOrderByRelationAggregateInputSchema';

export const OrganizationOrderByWithRelationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional()
}).strict();

export default OrganizationOrderByWithRelationInputSchema;
