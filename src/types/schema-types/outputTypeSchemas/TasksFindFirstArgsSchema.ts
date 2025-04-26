import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereInputSchema } from '../inputTypeSchemas/TasksWhereInputSchema'
import { TasksOrderByWithRelationInputSchema } from '../inputTypeSchemas/TasksOrderByWithRelationInputSchema'
import { TasksWhereUniqueInputSchema } from '../inputTypeSchemas/TasksWhereUniqueInputSchema'
import { TasksScalarFieldEnumSchema } from '../inputTypeSchemas/TasksScalarFieldEnumSchema'
// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()

export const TasksFindFirstArgsSchema: z.ZodType<Prisma.TasksFindFirstArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema,TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export default TasksFindFirstArgsSchema;
