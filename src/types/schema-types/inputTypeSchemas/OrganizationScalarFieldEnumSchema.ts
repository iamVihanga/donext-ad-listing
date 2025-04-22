import { z } from 'zod';

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','slug','logo','createdAt','metadata']);

export default OrganizationScalarFieldEnumSchema;
