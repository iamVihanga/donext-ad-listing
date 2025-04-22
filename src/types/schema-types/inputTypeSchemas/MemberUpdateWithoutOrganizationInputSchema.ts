import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { UserUpdateOneRequiredWithoutMembersNestedInputSchema } from './UserUpdateOneRequiredWithoutMembersNestedInputSchema';

export const MemberUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithoutOrganizationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export default MemberUpdateWithoutOrganizationInputSchema;
