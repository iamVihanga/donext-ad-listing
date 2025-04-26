import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereInputSchema } from '../inputTypeSchemas/TasksWhereInputSchema'
import { TasksOrderByWithAggregationInputSchema } from '../inputTypeSchemas/TasksOrderByWithAggregationInputSchema'
import { TasksScalarFieldEnumSchema } from '../inputTypeSchemas/TasksScalarFieldEnumSchema'
import { TasksScalarWhereWithAggregatesInputSchema } from '../inputTypeSchemas/TasksScalarWhereWithAggregatesInputSchema'

export const TasksGroupByArgsSchema: z.ZodType<Prisma.TasksGroupByArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithAggregationInputSchema.array(),TasksOrderByWithAggregationInputSchema ]).optional(),
  by: TasksScalarFieldEnumSchema.array(),
  having: TasksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TasksGroupByArgsSchema;
