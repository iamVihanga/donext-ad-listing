import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationScalarWhereInputSchema } from './InvitationScalarWhereInputSchema';
import { InvitationUpdateManyMutationInputSchema } from './InvitationUpdateManyMutationInputSchema';
import { InvitationUncheckedUpdateManyWithoutUserInputSchema } from './InvitationUncheckedUpdateManyWithoutUserInputSchema';

export const InvitationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateManyMutationInputSchema),z.lazy(() => InvitationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default InvitationUpdateManyWithWhereWithoutUserInputSchema;
