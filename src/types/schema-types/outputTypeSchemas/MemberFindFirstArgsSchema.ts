import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { MemberIncludeSchema } from '../inputTypeSchemas/MemberIncludeSchema'
import { MemberWhereInputSchema } from '../inputTypeSchemas/MemberWhereInputSchema'
import { MemberOrderByWithRelationInputSchema } from '../inputTypeSchemas/MemberOrderByWithRelationInputSchema'
import { MemberWhereUniqueInputSchema } from '../inputTypeSchemas/MemberWhereUniqueInputSchema'
import { MemberScalarFieldEnumSchema } from '../inputTypeSchemas/MemberScalarFieldEnumSchema'
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

export const MemberFindFirstArgsSchema: z.ZodType<Prisma.MemberFindFirstArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: z.lazy(() => MemberIncludeSchema).optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default MemberFindFirstArgsSchema;
