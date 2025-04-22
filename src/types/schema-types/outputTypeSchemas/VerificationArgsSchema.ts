import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { VerificationSelectSchema } from '../inputTypeSchemas/VerificationSelectSchema';

export const VerificationArgsSchema: z.ZodType<Prisma.VerificationDefaultArgs> = z.object({
  select: z.lazy(() => VerificationSelectSchema).optional(),
}).strict();

export default VerificationArgsSchema;
