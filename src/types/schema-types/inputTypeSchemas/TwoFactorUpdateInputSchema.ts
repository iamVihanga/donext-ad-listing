import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema } from './UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema';

export const TwoFactorUpdateInputSchema: z.ZodType<Prisma.TwoFactorUpdateInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema).optional()
}).strict();

export default TwoFactorUpdateInputSchema;
