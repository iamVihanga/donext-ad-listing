import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorCreateWithoutUserInputSchema } from './TwoFactorCreateWithoutUserInputSchema';
import { TwoFactorUncheckedCreateWithoutUserInputSchema } from './TwoFactorUncheckedCreateWithoutUserInputSchema';
import { TwoFactorCreateOrConnectWithoutUserInputSchema } from './TwoFactorCreateOrConnectWithoutUserInputSchema';
import { TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema } from './TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema';
import { TwoFactorCreateManyUserInputEnvelopeSchema } from './TwoFactorCreateManyUserInputEnvelopeSchema';
import { TwoFactorWhereUniqueInputSchema } from './TwoFactorWhereUniqueInputSchema';
import { TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema } from './TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema';
import { TwoFactorUpdateManyWithWhereWithoutUserInputSchema } from './TwoFactorUpdateManyWithWhereWithoutUserInputSchema';
import { TwoFactorScalarWhereInputSchema } from './TwoFactorScalarWhereInputSchema';

export const TwoFactorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export default TwoFactorUpdateManyWithoutUserNestedInputSchema;
