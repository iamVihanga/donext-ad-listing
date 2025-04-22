import { z } from 'zod';

/////////////////////////////////////////
// TWO FACTOR SCHEMA
/////////////////////////////////////////

export const TwoFactorSchema = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string(),
})

export type TwoFactor = z.infer<typeof TwoFactorSchema>

export default TwoFactorSchema;
