import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';

export const TwoFactorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export default TwoFactorScalarWhereWithAggregatesInputSchema;
