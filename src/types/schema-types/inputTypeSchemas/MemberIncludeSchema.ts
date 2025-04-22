import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const MemberIncludeSchema: z.ZodType<Prisma.MemberInclude> = z.object({
}).strict()

export default MemberIncludeSchema;
