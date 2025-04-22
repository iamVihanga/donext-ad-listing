import { z } from 'zod';

/////////////////////////////////////////
// ORGANIZATION SCHEMA
/////////////////////////////////////////

export const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().nullable(),
  logo: z.string().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().nullable(),
})

export type Organization = z.infer<typeof OrganizationSchema>

export default OrganizationSchema;
