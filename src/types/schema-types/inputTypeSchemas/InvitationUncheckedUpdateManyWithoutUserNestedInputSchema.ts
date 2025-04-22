import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { InvitationCreateWithoutUserInputSchema } from './InvitationCreateWithoutUserInputSchema';
import { InvitationUncheckedCreateWithoutUserInputSchema } from './InvitationUncheckedCreateWithoutUserInputSchema';
import { InvitationCreateOrConnectWithoutUserInputSchema } from './InvitationCreateOrConnectWithoutUserInputSchema';
import { InvitationUpsertWithWhereUniqueWithoutUserInputSchema } from './InvitationUpsertWithWhereUniqueWithoutUserInputSchema';
import { InvitationCreateManyUserInputEnvelopeSchema } from './InvitationCreateManyUserInputEnvelopeSchema';
import { InvitationWhereUniqueInputSchema } from './InvitationWhereUniqueInputSchema';
import { InvitationUpdateWithWhereUniqueWithoutUserInputSchema } from './InvitationUpdateWithWhereUniqueWithoutUserInputSchema';
import { InvitationUpdateManyWithWhereWithoutUserInputSchema } from './InvitationUpdateManyWithWhereWithoutUserInputSchema';
import { InvitationScalarWhereInputSchema } from './InvitationScalarWhereInputSchema';

export const InvitationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default InvitationUncheckedUpdateManyWithoutUserNestedInputSchema;
