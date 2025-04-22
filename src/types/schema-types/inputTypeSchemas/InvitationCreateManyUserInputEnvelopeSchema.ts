import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCreateManyUserInputSchema } from './InvitationCreateManyUserInputSchema';

export const InvitationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyUserInputSchema),z.lazy(() => InvitationCreateManyUserInputSchema).array() ]),
}).strict();

export default InvitationCreateManyUserInputEnvelopeSchema;
