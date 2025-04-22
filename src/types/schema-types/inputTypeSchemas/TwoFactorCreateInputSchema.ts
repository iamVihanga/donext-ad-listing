import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutTwofactorsInputSchema } from './UserCreateNestedOneWithoutTwofactorsInputSchema';

export const TwoFactorCreateInputSchema: z.ZodType<Prisma.TwoFactorCreateInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutTwofactorsInputSchema)
}).strict();

export default TwoFactorCreateInputSchema;
