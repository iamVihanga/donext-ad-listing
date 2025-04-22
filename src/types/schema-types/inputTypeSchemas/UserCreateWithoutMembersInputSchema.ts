import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { AccountCreateNestedManyWithoutUserInputSchema } from './AccountCreateNestedManyWithoutUserInputSchema';
import { InvitationCreateNestedManyWithoutUserInputSchema } from './InvitationCreateNestedManyWithoutUserInputSchema';
import { TwoFactorCreateNestedManyWithoutUserInputSchema } from './TwoFactorCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutMembersInputSchema: z.ZodType<Prisma.UserCreateWithoutMembersInput> = z.object({
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
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutMembersInputSchema;
