import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { SessionOrderByRelationAggregateInputSchema } from './SessionOrderByRelationAggregateInputSchema';
import { AccountOrderByRelationAggregateInputSchema } from './AccountOrderByRelationAggregateInputSchema';
import { MemberOrderByRelationAggregateInputSchema } from './MemberOrderByRelationAggregateInputSchema';
import { InvitationOrderByRelationAggregateInputSchema } from './InvitationOrderByRelationAggregateInputSchema';
import { TwoFactorOrderByRelationAggregateInputSchema } from './TwoFactorOrderByRelationAggregateInputSchema';

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorOrderByRelationAggregateInputSchema).optional()
}).strict();

export default UserOrderByWithRelationInputSchema;
