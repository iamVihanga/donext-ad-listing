import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const InvitationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default InvitationOrderByRelationAggregateInputSchema;
