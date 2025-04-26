import type { Prisma } from '@prisma/client';

import { z } from 'zod';
import { SortOrderSchema } from './SortOrderSchema';
import { TasksCountOrderByAggregateInputSchema } from './TasksCountOrderByAggregateInputSchema';
import { TasksMaxOrderByAggregateInputSchema } from './TasksMaxOrderByAggregateInputSchema';
import { TasksMinOrderByAggregateInputSchema } from './TasksMinOrderByAggregateInputSchema';

export const TasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.TasksOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TasksCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TasksMinOrderByAggregateInputSchema).optional()
}).strict();

export default TasksOrderByWithAggregationInputSchema;
