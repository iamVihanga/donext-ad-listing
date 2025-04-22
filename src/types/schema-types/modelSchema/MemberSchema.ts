import { z } from 'zod';

/////////////////////////////////////////
// MEMBER SCHEMA
/////////////////////////////////////////

export const MemberSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
})

export type Member = z.infer<typeof MemberSchema>

export default MemberSchema;
