import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { TwoFactorCountOrderByAggregateInputSchema } from './TwoFactorCountOrderByAggregateInputSchema';
import { TwoFactorMaxOrderByAggregateInputSchema } from './TwoFactorMaxOrderByAggregateInputSchema';
import { TwoFactorMinOrderByAggregateInputSchema } from './TwoFactorMinOrderByAggregateInputSchema';

export const TwoFactorOrderByWithAggregationInputSchema: z.ZodType<Prisma.TwoFactorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TwoFactorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TwoFactorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TwoFactorMinOrderByAggregateInputSchema).optional()
}).strict();

export default TwoFactorOrderByWithAggregationInputSchema;
