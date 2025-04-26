import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { TasksWhereInputSchema } from './TasksWhereInputSchema';
import { StringFilterSchema } from './StringFilterSchema';
import { BoolFilterSchema } from './BoolFilterSchema';

export const TasksWhereUniqueInputSchema: z.ZodType<Prisma.TasksWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export default TasksWhereUniqueInputSchema;
