import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionCreateNestedManyWithoutUserInputSchema } from './SessionCreateNestedManyWithoutUserInputSchema';
import { MemberCreateNestedManyWithoutUserInputSchema } from './MemberCreateNestedManyWithoutUserInputSchema';
import { InvitationCreateNestedManyWithoutUserInputSchema } from './InvitationCreateNestedManyWithoutUserInputSchema';
import { TwoFactorCreateNestedManyWithoutUserInputSchema } from './TwoFactorCreateNestedManyWithoutUserInputSchema';

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
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
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserCreateWithoutAccountsInputSchema;
