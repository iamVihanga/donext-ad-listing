import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { AccountUncheckedCreateNestedManyWithoutUserInputSchema } from './AccountUncheckedCreateNestedManyWithoutUserInputSchema';
import { MemberUncheckedCreateNestedManyWithoutUserInputSchema } from './MemberUncheckedCreateNestedManyWithoutUserInputSchema';
import { InvitationUncheckedCreateNestedManyWithoutUserInputSchema } from './InvitationUncheckedCreateNestedManyWithoutUserInputSchema';
import { TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema } from './TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema';

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
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
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export default UserUncheckedCreateWithoutSessionsInputSchema;
