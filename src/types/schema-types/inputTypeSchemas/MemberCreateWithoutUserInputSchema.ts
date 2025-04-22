import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrganizationCreateNestedOneWithoutMembersInputSchema } from './OrganizationCreateNestedOneWithoutMembersInputSchema';

export const MemberCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateWithoutUserInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MemberCreateWithoutUserInputSchema;
