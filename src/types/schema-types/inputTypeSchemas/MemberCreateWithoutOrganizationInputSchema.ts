import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateNestedOneWithoutMembersInputSchema } from './UserCreateNestedOneWithoutMembersInputSchema';

export const MemberCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MemberCreateWithoutOrganizationInputSchema;
