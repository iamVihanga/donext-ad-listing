import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { OrganizationIncludeSchema } from '../inputTypeSchemas/OrganizationIncludeSchema'
import { OrganizationWhereUniqueInputSchema } from '../inputTypeSchemas/OrganizationWhereUniqueInputSchema'
import { MemberArgsSchema } from "../outputTypeSchemas/MemberArgsSchema"
import { InvitationArgsSchema } from "../outputTypeSchemas/InvitationArgsSchema"
import { OrganizationCountOutputTypeArgsSchema } from "../outputTypeSchemas/OrganizationCountOutputTypeArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const OrganizationSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  logo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const OrganizationFindUniqueArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: z.lazy(() => OrganizationIncludeSchema).optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export default OrganizationFindUniqueArgsSchema;
