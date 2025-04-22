import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationIncludeSchema } from '../inputTypeSchemas/InvitationIncludeSchema'
import { InvitationWhereUniqueInputSchema } from '../inputTypeSchemas/InvitationWhereUniqueInputSchema'
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

export const InvitationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindUniqueOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: z.lazy(() => InvitationIncludeSchema).optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export default InvitationFindUniqueOrThrowArgsSchema;
