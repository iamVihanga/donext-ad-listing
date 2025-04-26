import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereInputSchema } from '../inputTypeSchemas/TasksWhereInputSchema'

export const TasksDeleteManyArgsSchema: z.ZodType<Prisma.TasksDeleteManyArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default TasksDeleteManyArgsSchema;
