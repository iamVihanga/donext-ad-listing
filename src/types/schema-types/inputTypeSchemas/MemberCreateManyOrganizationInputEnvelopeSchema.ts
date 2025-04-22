import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { MemberCreateManyOrganizationInputSchema } from './MemberCreateManyOrganizationInputSchema';

export const MemberCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyOrganizationInputSchema),z.lazy(() => MemberCreateManyOrganizationInputSchema).array() ]),
}).strict();

export default MemberCreateManyOrganizationInputEnvelopeSchema;
