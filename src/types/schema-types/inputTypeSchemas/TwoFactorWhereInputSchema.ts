import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { UserScalarRelationFilterSchema } from './UserScalarRelationFilterSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const TwoFactorWhereInputSchema: z.ZodType<Prisma.TwoFactorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export default TwoFactorWhereInputSchema;
