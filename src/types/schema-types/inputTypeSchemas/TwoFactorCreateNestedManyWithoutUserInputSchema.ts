import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorCreateWithoutUserInputSchema } from './TwoFactorCreateWithoutUserInputSchema';
import { TwoFactorUncheckedCreateWithoutUserInputSchema } from './TwoFactorUncheckedCreateWithoutUserInputSchema';
import { TwoFactorCreateOrConnectWithoutUserInputSchema } from './TwoFactorCreateOrConnectWithoutUserInputSchema';
import { TwoFactorCreateManyUserInputEnvelopeSchema } from './TwoFactorCreateManyUserInputEnvelopeSchema';
import { TwoFactorWhereUniqueInputSchema } from './TwoFactorWhereUniqueInputSchema';

export const TwoFactorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export default TwoFactorCreateNestedManyWithoutUserInputSchema;
