import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { UserIncludeSchema } from '../inputTypeSchemas/UserIncludeSchema'
import { UserWhereUniqueInputSchema } from '../inputTypeSchemas/UserWhereUniqueInputSchema'
import { SessionArgsSchema } from "../outputTypeSchemas/SessionArgsSchema"
import { AccountArgsSchema } from "../outputTypeSchemas/AccountArgsSchema"
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { InvitationArgsSchema } from "../outputTypeSchemas/InvitationArgsSchema"
import { TwoFactorArgsSchema } from "../outputTypeSchemas/TwoFactorArgsSchema"
import { UserCountOutputTypeArgsSchema } from "../outputTypeSchemas/UserCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  role: z.boolean().optional(),
  banned: z.boolean().optional(),
  banReason: z.boolean().optional(),
  banExpires: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationArgsSchema)]).optional(),
  twofactors: z.union([z.boolean(),z.lazy(() => TwoFactorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export default UserFindUniqueOrThrowArgsSchema;
