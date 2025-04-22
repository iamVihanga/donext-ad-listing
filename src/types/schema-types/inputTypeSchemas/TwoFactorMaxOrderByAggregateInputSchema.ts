import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TwoFactorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TwoFactorMaxOrderByAggregateInputSchema;
