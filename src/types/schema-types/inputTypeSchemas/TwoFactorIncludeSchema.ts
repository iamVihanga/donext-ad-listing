import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TwoFactorIncludeSchema: z.ZodType<Prisma.TwoFactorInclude> = z.object({
}).strict()

export default TwoFactorIncludeSchema;
