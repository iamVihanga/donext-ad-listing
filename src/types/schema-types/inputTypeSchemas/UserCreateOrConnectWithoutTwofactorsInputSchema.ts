import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserCreateWithoutTwofactorsInputSchema } from './UserCreateWithoutTwofactorsInputSchema';
import { UserUncheckedCreateWithoutTwofactorsInputSchema } from './UserUncheckedCreateWithoutTwofactorsInputSchema';

export const UserCreateOrConnectWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTwofactorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]),
}).strict();

export default UserCreateOrConnectWithoutTwofactorsInputSchema;
