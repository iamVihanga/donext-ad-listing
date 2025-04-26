import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksUpdateInputSchema } from '../inputTypeSchemas/TasksUpdateInputSchema'
import { TasksUncheckedUpdateInputSchema } from '../inputTypeSchemas/TasksUncheckedUpdateInputSchema'
import { TasksWhereUniqueInputSchema } from '../inputTypeSchemas/TasksWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export const TasksUpdateArgsSchema: z.ZodType<Prisma.TasksUpdateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  data: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export default TasksUpdateArgsSchema;
