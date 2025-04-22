import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutTwofactorsInputSchema } from './UserUpdateWithoutTwofactorsInputSchema';
import { UserUncheckedUpdateWithoutTwofactorsInputSchema } from './UserUncheckedUpdateWithoutTwofactorsInputSchema';

export const UserUpdateToOneWithWhereWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTwofactorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutTwofactorsInputSchema;
