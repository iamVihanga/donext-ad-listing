import { z } from 'zod';

export const TwoFactorScalarFieldEnumSchema = z.enum(['id','secret','backupCodes','userId']);

export default TwoFactorScalarFieldEnumSchema;
