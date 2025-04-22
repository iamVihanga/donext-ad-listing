import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCreateManyOrganizationInputSchema } from './InvitationCreateManyOrganizationInputSchema';

export const InvitationCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyOrganizationInputSchema),z.lazy(() => InvitationCreateManyOrganizationInputSchema).array() ]),
}).strict();

export default InvitationCreateManyOrganizationInputEnvelopeSchema;
