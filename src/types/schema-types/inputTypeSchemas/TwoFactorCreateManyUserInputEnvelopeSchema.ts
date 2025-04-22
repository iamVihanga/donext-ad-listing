import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorCreateManyUserInputSchema } from './TwoFactorCreateManyUserInputSchema';

export const TwoFactorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TwoFactorCreateManyUserInputSchema),z.lazy(() => TwoFactorCreateManyUserInputSchema).array() ]),
}).strict();

export default TwoFactorCreateManyUserInputEnvelopeSchema;
