import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema } from './OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema';
import { UserUpdateOneRequiredWithoutInvitationsNestedInputSchema } from './UserUpdateOneRequiredWithoutInvitationsNestedInputSchema';

export const InvitationUpdateInputSchema: z.ZodType<Prisma.InvitationUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export default InvitationUpdateInputSchema;
