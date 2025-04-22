import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationWhereUniqueInputSchema } from './InvitationWhereUniqueInputSchema';
import { InvitationUpdateWithoutUserInputSchema } from './InvitationUpdateWithoutUserInputSchema';
import { InvitationUncheckedUpdateWithoutUserInputSchema } from './InvitationUncheckedUpdateWithoutUserInputSchema';
import { InvitationCreateWithoutUserInputSchema } from './InvitationCreateWithoutUserInputSchema';
import { InvitationUncheckedCreateWithoutUserInputSchema } from './InvitationUncheckedCreateWithoutUserInputSchema';

export const InvitationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationUpdateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default InvitationUpsertWithWhereUniqueWithoutUserInputSchema;
