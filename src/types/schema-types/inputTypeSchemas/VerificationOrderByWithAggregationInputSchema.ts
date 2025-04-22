import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { VerificationCountOrderByAggregateInputSchema } from './VerificationCountOrderByAggregateInputSchema';
import { VerificationMaxOrderByAggregateInputSchema } from './VerificationMaxOrderByAggregateInputSchema';
import { VerificationMinOrderByAggregateInputSchema } from './VerificationMinOrderByAggregateInputSchema';

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export default VerificationOrderByWithAggregationInputSchema;
