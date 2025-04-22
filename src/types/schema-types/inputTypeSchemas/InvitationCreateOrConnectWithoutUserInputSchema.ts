import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationWhereUniqueInputSchema } from './InvitationWhereUniqueInputSchema';
import { InvitationCreateWithoutUserInputSchema } from './InvitationCreateWithoutUserInputSchema';
import { InvitationUncheckedCreateWithoutUserInputSchema } from './InvitationUncheckedCreateWithoutUserInputSchema';

export const InvitationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default InvitationCreateOrConnectWithoutUserInputSchema;
