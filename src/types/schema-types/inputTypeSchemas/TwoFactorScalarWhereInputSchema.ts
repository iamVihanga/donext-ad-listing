import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';

export const TwoFactorScalarWhereInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default TwoFactorScalarWhereInputSchema;
