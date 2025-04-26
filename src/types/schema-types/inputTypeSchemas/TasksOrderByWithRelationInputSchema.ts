import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';

export const TasksOrderByWithRelationInputSchema: z.ZodType<Prisma.TasksOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional()
}).strict();

export default TasksOrderByWithRelationInputSchema;
