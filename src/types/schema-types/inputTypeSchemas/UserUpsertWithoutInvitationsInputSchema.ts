import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutInvitationsInputSchema } from './UserUpdateWithoutInvitationsInputSchema';
import { UserUncheckedUpdateWithoutInvitationsInputSchema } from './UserUncheckedUpdateWithoutInvitationsInputSchema';
import { UserCreateWithoutInvitationsInputSchema } from './UserCreateWithoutInvitationsInputSchema';
import { UserUncheckedCreateWithoutInvitationsInputSchema } from './UserUncheckedCreateWithoutInvitationsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutInvitationsInputSchema;
