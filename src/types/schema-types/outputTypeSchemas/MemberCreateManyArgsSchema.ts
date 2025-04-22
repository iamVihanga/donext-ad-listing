import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MemberCreateManyInputSchema } from '../inputTypeSchemas/MemberCreateManyInputSchema'

export const MemberCreateManyArgsSchema: z.ZodType<Prisma.MemberCreateManyArgs> = z.object({
  data: z.union([ MemberCreateManyInputSchema,MemberCreateManyInputSchema.array() ]),
}).strict() ;

export default MemberCreateManyArgsSchema;
