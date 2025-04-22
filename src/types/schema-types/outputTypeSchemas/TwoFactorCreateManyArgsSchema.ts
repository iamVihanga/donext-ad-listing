import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TwoFactorCreateManyInputSchema } from '../inputTypeSchemas/TwoFactorCreateManyInputSchema'

export const TwoFactorCreateManyArgsSchema: z.ZodType<Prisma.TwoFactorCreateManyArgs> = z.object({
  data: z.union([ TwoFactorCreateManyInputSchema,TwoFactorCreateManyInputSchema.array() ]),
}).strict() ;

export default TwoFactorCreateManyArgsSchema;
