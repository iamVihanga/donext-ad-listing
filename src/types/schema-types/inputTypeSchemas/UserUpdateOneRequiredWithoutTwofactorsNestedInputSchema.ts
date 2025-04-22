import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserCreateWithoutTwofactorsInputSchema } from './UserCreateWithoutTwofactorsInputSchema';
import { UserUncheckedCreateWithoutTwofactorsInputSchema } from './UserUncheckedCreateWithoutTwofactorsInputSchema';
import { UserCreateOrConnectWithoutTwofactorsInputSchema } from './UserCreateOrConnectWithoutTwofactorsInputSchema';
import { UserUpsertWithoutTwofactorsInputSchema } from './UserUpsertWithoutTwofactorsInputSchema';
import { UserWhereUniqueInputSchema } from './UserWhereUniqueInputSchema';
import { UserUpdateToOneWithWhereWithoutTwofactorsInputSchema } from './UserUpdateToOneWithWhereWithoutTwofactorsInputSchema';
import { UserUpdateWithoutTwofactorsInputSchema } from './UserUpdateWithoutTwofactorsInputSchema';
import { UserUncheckedUpdateWithoutTwofactorsInputSchema } from './UserUncheckedUpdateWithoutTwofactorsInputSchema';

export const UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTwofactorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTwofactorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTwofactorsInputSchema),z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]).optional(),
}).strict();

export default UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema;
