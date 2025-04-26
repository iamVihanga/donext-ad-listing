import { z } from 'zod';

/////////////////////////////////////////
// TASKS SCHEMA
/////////////////////////////////////////

export const TasksSchema = z.object({
  id: z.string(),
  name: z.string(),
  done: z.boolean(),
})

export type Tasks = z.infer<typeof TasksSchema>

export default TasksSchema;
