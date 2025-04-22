import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TwoFactorUncheckedCreateInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string()
}).strict();

export default TwoFactorUncheckedCreateInputSchema;
