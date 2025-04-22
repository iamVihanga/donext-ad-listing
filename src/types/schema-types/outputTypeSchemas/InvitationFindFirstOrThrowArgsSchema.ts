import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationIncludeSchema } from '../inputTypeSchemas/InvitationIncludeSchema'
import { InvitationWhereInputSchema } from '../inputTypeSchemas/InvitationWhereInputSchema'
import { InvitationOrderByWithRelationInputSchema } from '../inputTypeSchemas/InvitationOrderByWithRelationInputSchema'
import { InvitationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationWhereUniqueInputSchema'
import { InvitationScalarFieldEnumSchema } from '../inputTypeSchemas/InvitationScalarFieldEnumSchema'
import { OrganizationArgsSchema } from "../outputTypeSchemas/OrganizationArgsSchema"
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const InvitationSelectSchema: z.ZodType<Prisma.InvitationSelect> = z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  status: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  inviterId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const InvitationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindFirstOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: z.lazy(() => InvitationIncludeSchema).optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default InvitationFindFirstOrThrowArgsSchema;
