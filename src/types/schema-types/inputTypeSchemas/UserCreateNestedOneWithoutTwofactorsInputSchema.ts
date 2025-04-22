import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutTwofactorsInputSchema } from './UserCreateWithoutTwofactorsInputSchema';
import { UserUncheckedCreateWithoutTwofactorsInputSchema } from './UserUncheckedCreateWithoutTwofactorsInputSchema';
import { UserCreateOrConnectWithoutTwofactorsInputSchema } from './UserCreateOrConnectWithoutTwofactorsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';

export const UserCreateNestedOneWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTwofactorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export default UserCreateNestedOneWithoutTwofactorsInputSchema;
