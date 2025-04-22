import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema } from './OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema';
import { UserUpdateOneRequiredWithoutMembersNestedInputSchema } from './UserUpdateOneRequiredWithoutMembersNestedInputSchema';

export const MemberUpdateInputSchema: z.ZodType<Prisma.MemberUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export default MemberUpdateInputSchema;
