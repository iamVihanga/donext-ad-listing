import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';

export const TwoFactorUpdateManyMutationInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyMutationInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export default TwoFactorUpdateManyMutationInputSchema;
