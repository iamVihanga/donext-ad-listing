import type { Prisma } from '@prisma/client';

import { z } from 'zod';

export const TasksCreateManyInputSchema: z.ZodType<Prisma.TasksCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  done: z.boolean().optional()
}).strict();

export default TasksCreateManyInputSchema;
