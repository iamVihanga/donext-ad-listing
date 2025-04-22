import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MemberIncludeSchema } from '../inputTypeSchemas/MemberIncludeSchema'
import { MemberCreateInputSchema } from '../inputTypeSchemas/MemberCreateInputSchema'
import { MemberUncheckedCreateInputSchema } from '../inputTypeSchemas/MemberUncheckedCreateInputSchema'
import { OrganizationArgsSchema } from "../outputTypeSchemas/OrganizationArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const MemberSelectSchema: z.ZodType<Prisma.MemberSelect> = z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const MemberCreateArgsSchema: z.ZodType<Prisma.MemberCreateArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: z.lazy(() => MemberIncludeSchema).optional(),
  data: z.union([ MemberCreateInputSchema,MemberUncheckedCreateInputSchema ]),
}).strict() ;

export default MemberCreateArgsSchema;
