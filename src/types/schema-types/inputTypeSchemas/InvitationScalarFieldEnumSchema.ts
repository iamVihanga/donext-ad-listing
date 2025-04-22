import { z } from 'zod';

export const InvitationScalarFieldEnumSchema = z.enum(['id','organizationId','email','role','status','expiresAt','inviterId']);

export default InvitationScalarFieldEnumSchema;
