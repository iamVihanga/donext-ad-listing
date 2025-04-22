import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationCreateManyInputSchema } from '../inputTypeSchemas/VerificationCreateManyInputSchema'

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
}).strict() ;

export default VerificationCreateManyArgsSchema;
