import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TwoFactorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TwoFactorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TwoFactorOrderByRelationAggregateInputSchema;
