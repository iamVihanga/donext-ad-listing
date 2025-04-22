import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorWhereUniqueInputSchema } from './TwoFactorWhereUniqueInputSchema';
import { TwoFactorUpdateWithoutUserInputSchema } from './TwoFactorUpdateWithoutUserInputSchema';
import { TwoFactorUncheckedUpdateWithoutUserInputSchema } from './TwoFactorUncheckedUpdateWithoutUserInputSchema';

export const TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export default TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema;
