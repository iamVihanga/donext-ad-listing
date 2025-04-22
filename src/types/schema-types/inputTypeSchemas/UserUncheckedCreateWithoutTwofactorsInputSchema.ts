import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { MemberUncheckedCreateNestedManyWithoutUserInputSchema } from './MemberUncheckedCreateNestedManyWithoutUserInputSchema';
import { InvitationUncheckedCreateNestedManyWithoutUserInputSchema } from './InvitationUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTwofactorsInput> = z.object({
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
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutTwofactorsInputSchema;
