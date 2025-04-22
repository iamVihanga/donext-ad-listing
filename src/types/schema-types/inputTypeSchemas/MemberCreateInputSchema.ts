import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { OrganizationCreateNestedOneWithoutMembersInputSchema } from './OrganizationCreateNestedOneWithoutMembersInputSchema';
import { UserCreateNestedOneWithoutMembersInputSchema } from './UserCreateNestedOneWithoutMembersInputSchema';

export const MemberCreateInputSchema: z.ZodType<Prisma.MemberCreateInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMembersInputSchema)
}).strict();

export default MemberCreateInputSchema;
