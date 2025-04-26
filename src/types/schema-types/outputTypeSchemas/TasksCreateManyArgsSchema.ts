import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksCreateManyInputSchema } from '../inputTypeSchemas/TasksCreateManyInputSchema'

export const TasksCreateManyArgsSchema: z.ZodType<Prisma.TasksCreateManyArgs> = z.object({
  data: z.union([ TasksCreateManyInputSchema,TasksCreateManyInputSchema.array() ]),
}).strict() ;

export default TasksCreateManyArgsSchema;
