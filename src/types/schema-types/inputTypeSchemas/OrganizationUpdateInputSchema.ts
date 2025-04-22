import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringFieldUpdateOperationsInputSchema } from './StringFieldUpdateOperationsInputSchema';
import { NullableStringFieldUpdateOperationsInputSchema } from './NullableStringFieldUpdateOperationsInputSchema';
import { DateTimeFieldUpdateOperationsInputSchema } from './DateTimeFieldUpdateOperationsInputSchema';
import { MemberUpdateManyWithoutOrganizationNestedInputSchema } from './MemberUpdateManyWithoutOrganizationNestedInputSchema';
import { InvitationUpdateManyWithoutOrganizationNestedInputSchema } from './InvitationUpdateManyWithoutOrganizationNestedInputSchema';

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export default OrganizationUpdateInputSchema;
