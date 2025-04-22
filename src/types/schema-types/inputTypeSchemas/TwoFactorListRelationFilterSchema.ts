import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorWhereInputSchema } from './TwoFactorWhereInputSchema';

export const TwoFactorListRelationFilterSchema: z.ZodType<Prisma.TwoFactorListRelationFilter> = z.object({
  every: z.lazy(() => TwoFactorWhereInputSchema).optional(),
  some: z.lazy(() => TwoFactorWhereInputSchema).optional(),
  none: z.lazy(() => TwoFactorWhereInputSchema).optional()
}).strict();

export default TwoFactorListRelationFilterSchema;
