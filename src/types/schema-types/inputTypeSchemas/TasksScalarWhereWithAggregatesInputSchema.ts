import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { StringWithAggregatesFilterSchema } from './StringWithAggregatesFilterSchema';
import { BoolWithAggregatesFilterSchema } from './BoolWithAggregatesFilterSchema';

export const TasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TasksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export default TasksScalarWhereWithAggregatesInputSchema;
