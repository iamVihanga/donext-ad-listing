import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TwoFactorCreateManyUserInputSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string()
}).strict();

export default TwoFactorCreateManyUserInputSchema;
