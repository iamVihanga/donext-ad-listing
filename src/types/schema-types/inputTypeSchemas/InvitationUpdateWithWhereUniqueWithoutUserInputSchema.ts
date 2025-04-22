import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationWhereUniqueInputSchema } from './InvitationWhereUniqueInputSchema';
import { InvitationUpdateWithoutUserInputSchema } from './InvitationUpdateWithoutUserInputSchema';
import { InvitationUncheckedUpdateWithoutUserInputSchema } from './InvitationUncheckedUpdateWithoutUserInputSchema';

export const InvitationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default InvitationUpdateWithWhereUniqueWithoutUserInputSchema;
