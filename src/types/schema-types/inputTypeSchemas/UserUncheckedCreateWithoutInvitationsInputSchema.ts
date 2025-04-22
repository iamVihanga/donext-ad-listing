import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SessionUncheckedCreateNestedManyWithoutUserInputSchema } from './SessionUncheckedCreateNestedManyWithoutUserInputSchema';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { MemberUncheckedCreateNestedManyWithoutUserInputSchema } from './MemberUncheckedCreateNestedManyWithoutUserInputSchema';
import { TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema } from './TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationsInput> = z.object({
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
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutInvitationsInputSchema;
