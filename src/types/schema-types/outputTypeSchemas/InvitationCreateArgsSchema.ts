import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { InvitationIncludeSchema } from '../inputTypeSchemas/InvitationIncludeSchema'
import { InvitationCreateInputSchema } from '../inputTypeSchemas/InvitationCreateInputSchema'
import { InvitationUncheckedCreateInputSchema } from '../inputTypeSchemas/InvitationUncheckedCreateInputSchema'
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

export const InvitationCreateArgsSchema: z.ZodType<Prisma.InvitationCreateArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: z.lazy(() => InvitationIncludeSchema).optional(),
  data: z.union([ InvitationCreateInputSchema,InvitationUncheckedCreateInputSchema ]),
}).strict() ;

export default InvitationCreateArgsSchema;
