import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateManyUserInputSchema } from './MemberCreateManyUserInputSchema';

export const MemberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyUserInputSchema),z.lazy(() => MemberCreateManyUserInputSchema).array() ]),
}).strict();

export default MemberCreateManyUserInputEnvelopeSchema;
