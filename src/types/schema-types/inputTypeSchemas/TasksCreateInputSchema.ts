import type { Prisma } from "@prisma/client";

import { z } from "zod";

export const TasksCreateInputSchema: z.ZodType<Prisma.TasksCreateInput> = z
  .object({
    id: z.string().optional(),
    name: z.string(),
    done: z.boolean().optional()
  })
  .strict();

export default TasksCreateInputSchema;
