import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { MemberCreateNestedManyWithoutUserInputSchema } from './MemberCreateNestedManyWithoutUserInputSchema';
import { TwoFactorCreateNestedManyWithoutUserInputSchema } from './TwoFactorCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutInvitationsInputSchema;
