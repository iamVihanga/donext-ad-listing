import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TasksUncheckedCreateInputSchema: z.ZodType<Prisma.TasksUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  done: z.boolean().optional()
}).strict();

export default TasksUncheckedCreateInputSchema;
