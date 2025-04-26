import { z } from 'zod';

export const TasksScalarFieldEnumSchema = z.enum(['id','name','done']);

export default TasksScalarFieldEnumSchema;
