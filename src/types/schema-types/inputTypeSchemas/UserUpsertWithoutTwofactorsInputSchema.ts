import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserUpdateWithoutTwofactorsInputSchema } from './UserUpdateWithoutTwofactorsInputSchema';
import { UserUncheckedUpdateWithoutTwofactorsInputSchema } from './UserUncheckedUpdateWithoutTwofactorsInputSchema';
import { UserCreateWithoutTwofactorsInputSchema } from './UserCreateWithoutTwofactorsInputSchema';
import { UserUncheckedCreateWithoutTwofactorsInputSchema } from './UserUncheckedCreateWithoutTwofactorsInputSchema';
import { UserWhereInputSchema } from './UserWhereInputSchema';

export const UserUpsertWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTwofactorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export default UserUpsertWithoutTwofactorsInputSchema;
