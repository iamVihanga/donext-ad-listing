import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TwoFactorIncludeSchema } from '../inputTypeSchemas/TwoFactorIncludeSchema'
import { TwoFactorCreateInputSchema } from '../inputTypeSchemas/TwoFactorCreateInputSchema'
import { TwoFactorUncheckedCreateInputSchema } from '../inputTypeSchemas/TwoFactorUncheckedCreateInputSchema'
import { UserArgsSchema } from "../outputTypeSchemas/UserArgsSchema"
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TwoFactorSelectSchema: z.ZodType<Prisma.TwoFactorSelect> = z.object({
  id: z.boolean().optional(),
  secret: z.boolean().optional(),
  backupCodes: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const TwoFactorCreateArgsSchema: z.ZodType<Prisma.TwoFactorCreateArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: z.lazy(() => TwoFactorIncludeSchema).optional(),
  data: z.union([ TwoFactorCreateInputSchema,TwoFactorUncheckedCreateInputSchema ]),
}).strict() ;

export default TwoFactorCreateArgsSchema;
