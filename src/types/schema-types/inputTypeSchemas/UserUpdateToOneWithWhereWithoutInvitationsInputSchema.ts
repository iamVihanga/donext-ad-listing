import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { UserWhereInputSchema } from './UserWhereInputSchema';
import { UserUpdateWithoutInvitationsInputSchema } from './UserUpdateWithoutInvitationsInputSchema';
import { UserUncheckedUpdateWithoutInvitationsInputSchema } from './UserUncheckedUpdateWithoutInvitationsInputSchema';

export const UserUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export default UserUpdateToOneWithWhereWithoutInvitationsInputSchema;
