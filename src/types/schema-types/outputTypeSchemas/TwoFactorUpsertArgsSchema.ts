import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TwoFactorIncludeSchema } from '../inputTypeSchemas/TwoFactorIncludeSchema'
import { TwoFactorWhereUniqueInputSchema } from '../inputTypeSchemas/TwoFactorWhereUniqueInputSchema'
import { TwoFactorCreateInputSchema } from '../inputTypeSchemas/TwoFactorCreateInputSchema'
import { TwoFactorUncheckedCreateInputSchema } from '../inputTypeSchemas/TwoFactorUncheckedCreateInputSchema'
import { TwoFactorUpdateInputSchema } from '../inputTypeSchemas/TwoFactorUpdateInputSchema'
import { TwoFactorUncheckedUpdateInputSchema } from '../inputTypeSchemas/TwoFactorUncheckedUpdateInputSchema'
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

export const TwoFactorUpsertArgsSchema: z.ZodType<Prisma.TwoFactorUpsertArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: z.lazy(() => TwoFactorIncludeSchema).optional(),
  where: TwoFactorWhereUniqueInputSchema,
  create: z.union([ TwoFactorCreateInputSchema,TwoFactorUncheckedCreateInputSchema ]),
  update: z.union([ TwoFactorUpdateInputSchema,TwoFactorUncheckedUpdateInputSchema ]),
}).strict() ;

export default TwoFactorUpsertArgsSchema;
