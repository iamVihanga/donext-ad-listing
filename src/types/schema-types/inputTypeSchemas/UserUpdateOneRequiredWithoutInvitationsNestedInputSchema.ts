import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutInvitationsInputSchema } from './UserCreateWithoutInvitationsInputSchema';
import { UserUncheckedCreateWithoutInvitationsInputSchema } from './UserUncheckedCreateWithoutInvitationsInputSchema';
import { UserCreateOrConnectWithoutInvitationsInputSchema } from './UserCreateOrConnectWithoutInvitationsInputSchema';
import { UserUpsertWithoutInvitationsInputSchema } from './UserUpsertWithoutInvitationsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutInvitationsInputSchema } from './UserUpdateToOneWithWhereWithoutInvitationsInputSchema';
import { UserUpdateWithoutInvitationsInputSchema } from './UserUpdateWithoutInvitationsInputSchema';
import { UserUncheckedUpdateWithoutInvitationsInputSchema } from './UserUncheckedUpdateWithoutInvitationsInputSchema';

export const UserUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutInvitationsNestedInputSchema;
