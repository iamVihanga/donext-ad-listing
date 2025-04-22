import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const InvitationIncludeSchema: z.ZodType<Prisma.InvitationInclude> = z.object({
}).strict()

export default InvitationIncludeSchema;
