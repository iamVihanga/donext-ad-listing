import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TwoFactorCountOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TwoFactorCountOrderByAggregateInputSchema;
