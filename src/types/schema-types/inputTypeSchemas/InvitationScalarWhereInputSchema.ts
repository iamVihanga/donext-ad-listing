import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFilterSchema } from './StringFilterSchema';
import { StringNullableFilterSchema } from './StringNullableFilterSchema';
import { DateTimeFilterSchema } from './DateTimeFilterSchema';

export const InvitationScalarWhereInputSchema: z.ZodType<Prisma.InvitationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export default InvitationScalarWhereInputSchema;
