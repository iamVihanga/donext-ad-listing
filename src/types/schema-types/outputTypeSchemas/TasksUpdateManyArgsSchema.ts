import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksUpdateManyMutationInputSchema } from '../inputTypeSchemas/TasksUpdateManyMutationInputSchema'
import { TasksUncheckedUpdateManyInputSchema } from '../inputTypeSchemas/TasksUncheckedUpdateManyInputSchema'
import { TasksWhereInputSchema } from '../inputTypeSchemas/TasksWhereInputSchema'

export const TasksUpdateManyArgsSchema: z.ZodType<Prisma.TasksUpdateManyArgs> = z.object({
  data: z.union([ TasksUpdateManyMutationInputSchema,TasksUncheckedUpdateManyInputSchema ]),
  where: TasksWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export default TasksUpdateManyArgsSchema;
