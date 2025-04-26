import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { TasksWhereInputSchema } from '../inputTypeSchemas/TasksWhereInputSchema'
import { TasksOrderByWithRelationInputSchema } from '../inputTypeSchemas/TasksOrderByWithRelationInputSchema'
import { TasksWhereUniqueInputSchema } from '../inputTypeSchemas/TasksWhereUniqueInputSchema'

export const TasksAggregateArgsSchema: z.ZodType<Prisma.TasksAggregateArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export default TasksAggregateArgsSchema;
