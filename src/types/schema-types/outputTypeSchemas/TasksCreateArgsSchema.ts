import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksCreateInputSchema } from '../inputTypeSchemas/TasksCreateInputSchema'
import { TasksUncheckedCreateInputSchema } from '../inputTypeSchemas/TasksUncheckedCreateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export const TasksCreateArgsSchema: z.ZodType<Prisma.TasksCreateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  data: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
}).strict() ;

export default TasksCreateArgsSchema;
