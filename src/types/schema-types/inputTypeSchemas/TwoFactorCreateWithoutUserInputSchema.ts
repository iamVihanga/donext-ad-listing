import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TwoFactorCreateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateWithoutUserInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string()
}).strict();

export default TwoFactorCreateWithoutUserInputSchema;
