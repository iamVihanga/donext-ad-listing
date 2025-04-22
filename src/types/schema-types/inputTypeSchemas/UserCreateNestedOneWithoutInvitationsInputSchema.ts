import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutInvitationsInputSchema } from './UserCreateWithoutInvitationsInputSchema';
import { UserUncheckedCreateWithoutInvitationsInputSchema } from './UserUncheckedCreateWithoutInvitationsInputSchema';
import { UserCreateOrConnectWithoutInvitationsInputSchema } from './UserCreateOrConnectWithoutInvitationsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutInvitationsInputSchema;
