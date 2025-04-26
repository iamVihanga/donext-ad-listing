import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksSelectSchema } from '../inputTypeSchemas/TasksSelectSchema';

export const TasksArgsSchema: z.ZodType<Prisma.TasksDefaultArgs> = z.object({
  select: z.lazy(() => TasksSelectSchema).optional(),
}).strict();

export default TasksArgsSchema;
