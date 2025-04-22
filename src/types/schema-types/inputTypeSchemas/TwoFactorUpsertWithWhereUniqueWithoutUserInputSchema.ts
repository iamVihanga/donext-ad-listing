import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorWhereUniqueInputSchema } from './TwoFactorWhereUniqueInputSchema';
import { TwoFactorUpdateWithoutUserInputSchema } from './TwoFactorUpdateWithoutUserInputSchema';
import { TwoFactorUncheckedUpdateWithoutUserInputSchema } from './TwoFactorUncheckedUpdateWithoutUserInputSchema';
import { TwoFactorCreateWithoutUserInputSchema } from './TwoFactorCreateWithoutUserInputSchema';
import { TwoFactorUncheckedCreateWithoutUserInputSchema } from './TwoFactorUncheckedCreateWithoutUserInputSchema';

export const TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export default TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema;
