import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereUniqueInputSchema } from '../inputTypeSchemas/TasksWhereUniqueInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export const TasksDeleteArgsSchema: z.ZodType<Prisma.TasksDeleteArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export default TasksDeleteArgsSchema;
