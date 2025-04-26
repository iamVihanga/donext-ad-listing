import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export default TasksSelectSchema;
