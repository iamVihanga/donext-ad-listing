import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"

export const TwoFactorSelectSchema: z.ZodType<Prisma.TwoFactorSelect> = z.object({
  id: z.boolean().optional(),
  secret: z.boolean().optional(),
  backupCodes: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export default TwoFactorSelectSchema;
