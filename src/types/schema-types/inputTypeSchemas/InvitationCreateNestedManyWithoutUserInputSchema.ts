import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCreateWithoutUserInputSchema } from './InvitationCreateWithoutUserInputSchema';
import { InvitationUncheckedCreateWithoutUserInputSchema } from './InvitationUncheckedCreateWithoutUserInputSchema';
import { InvitationCreateOrConnectWithoutUserInputSchema } from './InvitationCreateOrConnectWithoutUserInputSchema';
import { InvitationCreateManyUserInputEnvelopeSchema } from './InvitationCreateManyUserInputEnvelopeSchema';
import { InvitationWhereUniqueInputSchema } from './InvitationWhereUniqueInputSchema';

export const InvitationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default InvitationCreateNestedManyWithoutUserInputSchema;
