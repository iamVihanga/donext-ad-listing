import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationCreateManyInputSchema } from '../inputTypeSchemas/InvitationCreateManyInputSchema'

export const InvitationCreateManyArgsSchema: z.ZodType<Prisma.InvitationCreateManyArgs> = z.object({
  data: z.union([ InvitationCreateManyInputSchema,InvitationCreateManyInputSchema.array() ]),
}).strict() ;

export default InvitationCreateManyArgsSchema;
