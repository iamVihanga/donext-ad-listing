import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { InvitationCountOrderByAggregateInputSchema } from './InvitationCountOrderByAggregateInputSchema';
import { InvitationMaxOrderByAggregateInputSchema } from './InvitationMaxOrderByAggregateInputSchema';
import { InvitationMinOrderByAggregateInputSchema } from './InvitationMinOrderByAggregateInputSchema';

export const InvitationOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvitationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationMinOrderByAggregateInputSchema).optional()
}).strict();

export default InvitationOrderByWithAggregationInputSchema;
