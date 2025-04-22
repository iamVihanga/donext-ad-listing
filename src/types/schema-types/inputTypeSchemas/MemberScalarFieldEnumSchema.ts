import { z } from 'zod';

export const MemberScalarFieldEnumSchema = z.enum(['id','organizationId','userId','role','createdAt']);

export default MemberScalarFieldEnumSchema;
