import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TwoFactorScalarWhereInputSchema } from './TwoFactorScalarWhereInputSchema';
import { TwoFactorUpdateManyMutationInputSchema } from './TwoFactorUpdateManyMutationInputSchema';
import { TwoFactorUncheckedUpdateManyWithoutUserInputSchema } from './TwoFactorUncheckedUpdateManyWithoutUserInputSchema';

export const TwoFactorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TwoFactorUpdateManyMutationInputSchema),z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export default TwoFactorUpdateManyWithWhereWithoutUserInputSchema;
