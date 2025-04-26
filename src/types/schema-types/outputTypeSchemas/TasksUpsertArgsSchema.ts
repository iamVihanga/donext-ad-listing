import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereUniqueInputSchema } from '../inputTypeSchemas/TasksWhereUniqueInputSchema'
import { TasksCreateInputSchema } from '../inputTypeSchemas/TasksCreateInputSchema'
import { TasksUncheckedCreateInputSchema } from '../inputTypeSchemas/TasksUncheckedCreateInputSchema'
import { TasksUpdateInputSchema } from '../inputTypeSchemas/TasksUpdateInputSchema'
import { TasksUncheckedUpdateInputSchema } from '../inputTypeSchemas/TasksUncheckedUpdateInputSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export const TasksUpsertArgsSchema: z.ZodType<Prisma.TasksUpsertArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
  create: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
  update: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
}).strict() ;

export default TasksUpsertArgsSchema;
