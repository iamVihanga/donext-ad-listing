import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const TwoFactorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyWithoutUserInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default TwoFactorUncheckedUpdateManyWithoutUserInputSchema;
