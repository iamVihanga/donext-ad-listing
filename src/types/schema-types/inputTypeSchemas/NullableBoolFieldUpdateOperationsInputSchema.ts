import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export default NullableBoolFieldUpdateOperationsInputSchema;
