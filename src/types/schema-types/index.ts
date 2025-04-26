import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image','createdAt','updatedAt','twoFactorEnabled','role','banned','banReason','banExpires']);

export const SessionScalarFieldEnumSchema = z.enum(['id','expiresAt','token','createdAt','updatedAt','ipAddress','userAgent','userId','activeOrganizationId','impersonatedBy']);

export const AccountScalarFieldEnumSchema = z.enum(['id','accountId','providerId','userId','accessToken','refreshToken','idToken','accessTokenExpiresAt','refreshTokenExpiresAt','scope','password','createdAt','updatedAt']);

export const VerificationScalarFieldEnumSchema = z.enum(['id','identifier','value','expiresAt','createdAt','updatedAt']);

export const OrganizationScalarFieldEnumSchema = z.enum(['id','name','slug','logo','createdAt','metadata']);

export const MemberScalarFieldEnumSchema = z.enum(['id','organizationId','userId','role','createdAt']);

export const InvitationScalarFieldEnumSchema = z.enum(['id','organizationId','email','role','status','expiresAt','inviterId']);

export const TwoFactorScalarFieldEnumSchema = z.enum(['id','secret','backupCodes','userId']);

export const TasksScalarFieldEnumSchema = z.enum(['id','name','done']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const QueryModeSchema = z.enum(['default','insensitive']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().nullable(),
  role: z.string().nullable(),
  banned: z.boolean().nullable(),
  banReason: z.string().nullable(),
  banExpires: z.coerce.date().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
  activeOrganizationId: z.string().nullable(),
  impersonatedBy: z.string().nullable(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
})

export type Verification = z.infer<typeof VerificationSchema>

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

/////////////////////////////////////////
// INVITATION SCHEMA
/////////////////////////////////////////

export const InvitationSchema = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string(),
})

export type Invitation = z.infer<typeof InvitationSchema>

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

/////////////////////////////////////////
// TASKS SCHEMA
/////////////////////////////////////////

export const TasksSchema = z.object({
  id: z.string(),
  name: z.string(),
  done: z.boolean(),
})

export type Tasks = z.infer<typeof TasksSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  sessions: z.boolean().optional(),
  accounts: z.boolean().optional(),
  members: z.boolean().optional(),
  invitations: z.boolean().optional(),
  twofactors: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  twoFactorEnabled: z.boolean().optional(),
  role: z.boolean().optional(),
  banned: z.boolean().optional(),
  banReason: z.boolean().optional(),
  banExpires: z.boolean().optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionArgsSchema)]).optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountArgsSchema)]).optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationArgsSchema)]).optional(),
  twofactors: z.union([z.boolean(),z.lazy(() => TwoFactorArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  token: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  ipAddress: z.boolean().optional(),
  userAgent: z.boolean().optional(),
  userId: z.boolean().optional(),
  activeOrganizationId: z.boolean().optional(),
  impersonatedBy: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
  id: z.boolean().optional(),
  accountId: z.boolean().optional(),
  providerId: z.boolean().optional(),
  userId: z.boolean().optional(),
  accessToken: z.boolean().optional(),
  refreshToken: z.boolean().optional(),
  idToken: z.boolean().optional(),
  accessTokenExpiresAt: z.boolean().optional(),
  refreshTokenExpiresAt: z.boolean().optional(),
  scope: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationArgsSchema: z.ZodType<Prisma.VerificationDefaultArgs> = z.object({
  select: z.lazy(() => VerificationSelectSchema).optional(),
}).strict();

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z.object({
  id: z.boolean().optional(),
  identifier: z.boolean().optional(),
  value: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
}).strict()

// ORGANIZATION
//------------------------------------------------------

export const OrganizationIncludeSchema: z.ZodType<Prisma.OrganizationInclude> = z.object({
}).strict()

export const OrganizationArgsSchema: z.ZodType<Prisma.OrganizationDefaultArgs> = z.object({
  select: z.lazy(() => OrganizationSelectSchema).optional(),
  include: z.lazy(() => OrganizationIncludeSchema).optional(),
}).strict();

export const OrganizationCountOutputTypeArgsSchema: z.ZodType<Prisma.OrganizationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => OrganizationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const OrganizationCountOutputTypeSelectSchema: z.ZodType<Prisma.OrganizationCountOutputTypeSelect> = z.object({
  members: z.boolean().optional(),
  invitations: z.boolean().optional(),
}).strict();

export const OrganizationSelectSchema: z.ZodType<Prisma.OrganizationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  slug: z.boolean().optional(),
  logo: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  metadata: z.boolean().optional(),
  members: z.union([z.boolean(),z.lazy(() => MemberArgsSchema)]).optional(),
  invitations: z.union([z.boolean(),z.lazy(() => InvitationArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => OrganizationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// MEMBER
//------------------------------------------------------

export const MemberIncludeSchema: z.ZodType<Prisma.MemberInclude> = z.object({
}).strict()

export const MemberArgsSchema: z.ZodType<Prisma.MemberDefaultArgs> = z.object({
  select: z.lazy(() => MemberSelectSchema).optional(),
  include: z.lazy(() => MemberIncludeSchema).optional(),
}).strict();

export const MemberSelectSchema: z.ZodType<Prisma.MemberSelect> = z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  userId: z.boolean().optional(),
  role: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// INVITATION
//------------------------------------------------------

export const InvitationIncludeSchema: z.ZodType<Prisma.InvitationInclude> = z.object({
}).strict()

export const InvitationArgsSchema: z.ZodType<Prisma.InvitationDefaultArgs> = z.object({
  select: z.lazy(() => InvitationSelectSchema).optional(),
  include: z.lazy(() => InvitationIncludeSchema).optional(),
}).strict();

export const InvitationSelectSchema: z.ZodType<Prisma.InvitationSelect> = z.object({
  id: z.boolean().optional(),
  organizationId: z.boolean().optional(),
  email: z.boolean().optional(),
  role: z.boolean().optional(),
  status: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  inviterId: z.boolean().optional(),
  organization: z.union([z.boolean(),z.lazy(() => OrganizationArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TWO FACTOR
//------------------------------------------------------

export const TwoFactorIncludeSchema: z.ZodType<Prisma.TwoFactorInclude> = z.object({
}).strict()

export const TwoFactorArgsSchema: z.ZodType<Prisma.TwoFactorDefaultArgs> = z.object({
  select: z.lazy(() => TwoFactorSelectSchema).optional(),
  include: z.lazy(() => TwoFactorIncludeSchema).optional(),
}).strict();

export const TwoFactorSelectSchema: z.ZodType<Prisma.TwoFactorSelect> = z.object({
  id: z.boolean().optional(),
  secret: z.boolean().optional(),
  backupCodes: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// TASKS
//------------------------------------------------------

export const TasksArgsSchema: z.ZodType<Prisma.TasksDefaultArgs> = z.object({
  select: z.lazy(() => TasksSelectSchema).optional(),
}).strict();

export const TasksSelectSchema: z.ZodType<Prisma.TasksSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  done: z.boolean().optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  banned: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  banReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  banExpires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  twofactors: z.lazy(() => TwoFactorListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    email: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  banned: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  banReason: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  banExpires: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional(),
  twofactors: z.lazy(() => TwoFactorListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  emailVerified: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  twoFactorEnabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  banned: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  banReason: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  banExpires: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeOrganizationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  impersonatedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeOrganizationId: z.lazy(() => SortOrderSchema).optional(),
  impersonatedBy: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    token: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    token: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  token: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeOrganizationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  impersonatedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeOrganizationId: z.lazy(() => SortOrderSchema).optional(),
  impersonatedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  activeOrganizationId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  impersonatedBy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationWhereInputSchema),z.lazy(() => VerificationWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict());

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updatedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const OrganizationWhereInputSchema: z.ZodType<Prisma.OrganizationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional()
}).strict();

export const OrganizationOrderByWithRelationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  members: z.lazy(() => MemberOrderByRelationAggregateInputSchema).optional(),
  invitations: z.lazy(() => InvitationOrderByRelationAggregateInputSchema).optional()
}).strict();

export const OrganizationWhereUniqueInputSchema: z.ZodType<Prisma.OrganizationWhereUniqueInput> = z.union([
  z.object({
    id: z.string(),
    slug: z.string()
  }),
  z.object({
    id: z.string(),
  }),
  z.object({
    slug: z.string(),
  }),
])
.and(z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  AND: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationWhereInputSchema),z.lazy(() => OrganizationWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  logo: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  members: z.lazy(() => MemberListRelationFilterSchema).optional(),
  invitations: z.lazy(() => InvitationListRelationFilterSchema).optional()
}).strict());

export const OrganizationOrderByWithAggregationInputSchema: z.ZodType<Prisma.OrganizationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => OrganizationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => OrganizationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => OrganizationMinOrderByAggregateInputSchema).optional()
}).strict();

export const OrganizationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.OrganizationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema),z.lazy(() => OrganizationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  slug: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  logo: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  metadata: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MemberWhereInputSchema: z.ZodType<Prisma.MemberWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationScalarRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const MemberOrderByWithRelationInputSchema: z.ZodType<Prisma.MemberOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const MemberWhereUniqueInputSchema: z.ZodType<Prisma.MemberWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberWhereInputSchema),z.lazy(() => MemberWhereInputSchema).array() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationScalarRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const MemberOrderByWithAggregationInputSchema: z.ZodType<Prisma.MemberOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => MemberCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MemberMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MemberMinOrderByAggregateInputSchema).optional()
}).strict();

export const MemberScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MemberScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberScalarWhereWithAggregatesInputSchema),z.lazy(() => MemberScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvitationWhereInputSchema: z.ZodType<Prisma.InvitationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationScalarRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const InvitationOrderByWithRelationInputSchema: z.ZodType<Prisma.InvitationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  organization: z.lazy(() => OrganizationOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const InvitationWhereUniqueInputSchema: z.ZodType<Prisma.InvitationWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationWhereInputSchema),z.lazy(() => InvitationWhereInputSchema).array() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organization: z.union([ z.lazy(() => OrganizationScalarRelationFilterSchema),z.lazy(() => OrganizationWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const InvitationOrderByWithAggregationInputSchema: z.ZodType<Prisma.InvitationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => InvitationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => InvitationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => InvitationMinOrderByAggregateInputSchema).optional()
}).strict();

export const InvitationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.InvitationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema),z.lazy(() => InvitationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TwoFactorWhereInputSchema: z.ZodType<Prisma.TwoFactorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const TwoFactorOrderByWithRelationInputSchema: z.ZodType<Prisma.TwoFactorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const TwoFactorWhereUniqueInputSchema: z.ZodType<Prisma.TwoFactorWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorWhereInputSchema),z.lazy(() => TwoFactorWhereInputSchema).array() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserScalarRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const TwoFactorOrderByWithAggregationInputSchema: z.ZodType<Prisma.TwoFactorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TwoFactorCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TwoFactorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TwoFactorMinOrderByAggregateInputSchema).optional()
}).strict();

export const TwoFactorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema),z.lazy(() => TwoFactorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const TasksWhereInputSchema: z.ZodType<Prisma.TasksWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict();

export const TasksOrderByWithRelationInputSchema: z.ZodType<Prisma.TasksOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksWhereUniqueInputSchema: z.ZodType<Prisma.TasksWhereUniqueInput> = z.object({
  id: z.string()
})
.and(z.object({
  id: z.string().optional(),
  AND: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksWhereInputSchema),z.lazy(() => TasksWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
}).strict());

export const TasksOrderByWithAggregationInputSchema: z.ZodType<Prisma.TasksOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => TasksCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => TasksMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => TasksMinOrderByAggregateInputSchema).optional()
}).strict();

export const TasksScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TasksScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TasksScalarWhereWithAggregatesInputSchema),z.lazy(() => TasksScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  done: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  userId: z.string(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional().nullable(),
  updatedAt: z.coerce.date().optional().nullable()
}).strict();

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrganizationCreateInputSchema: z.ZodType<Prisma.OrganizationCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUpdateInputSchema: z.ZodType<Prisma.OrganizationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationCreateManyInputSchema: z.ZodType<Prisma.OrganizationCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable()
}).strict();

export const OrganizationUpdateManyMutationInputSchema: z.ZodType<Prisma.OrganizationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const OrganizationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MemberCreateInputSchema: z.ZodType<Prisma.MemberCreateInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const MemberUncheckedCreateInputSchema: z.ZodType<Prisma.MemberUncheckedCreateInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const MemberUpdateInputSchema: z.ZodType<Prisma.MemberUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberCreateManyInputSchema: z.ZodType<Prisma.MemberCreateManyInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const MemberUpdateManyMutationInputSchema: z.ZodType<Prisma.MemberUpdateManyMutationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationCreateInputSchema: z.ZodType<Prisma.InvitationCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string()
}).strict();

export const InvitationUpdateInputSchema: z.ZodType<Prisma.InvitationUpdateInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationCreateManyInputSchema: z.ZodType<Prisma.InvitationCreateManyInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string()
}).strict();

export const InvitationUpdateManyMutationInputSchema: z.ZodType<Prisma.InvitationUpdateManyMutationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorCreateInputSchema: z.ZodType<Prisma.TwoFactorCreateInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutTwofactorsInputSchema)
}).strict();

export const TwoFactorUncheckedCreateInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string()
}).strict();

export const TwoFactorUpdateInputSchema: z.ZodType<Prisma.TwoFactorUpdateInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema).optional()
}).strict();

export const TwoFactorUncheckedUpdateInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorCreateManyInputSchema: z.ZodType<Prisma.TwoFactorCreateManyInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string(),
  userId: z.string()
}).strict();

export const TwoFactorUpdateManyMutationInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyMutationInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksCreateInputSchema: z.ZodType<Prisma.TasksCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  done: z.boolean().optional()
}).strict();

export const TasksUncheckedCreateInputSchema: z.ZodType<Prisma.TasksUncheckedCreateInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  done: z.boolean().optional()
}).strict();

export const TasksUpdateInputSchema: z.ZodType<Prisma.TasksUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksUncheckedUpdateInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksCreateManyInputSchema: z.ZodType<Prisma.TasksCreateManyInput> = z.object({
  id: z.string().optional(),
  name: z.string(),
  done: z.boolean().optional()
}).strict();

export const TasksUpdateManyMutationInputSchema: z.ZodType<Prisma.TasksUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TasksUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TasksUncheckedUpdateManyInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  done: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const MemberListRelationFilterSchema: z.ZodType<Prisma.MemberListRelationFilter> = z.object({
  every: z.lazy(() => MemberWhereInputSchema).optional(),
  some: z.lazy(() => MemberWhereInputSchema).optional(),
  none: z.lazy(() => MemberWhereInputSchema).optional()
}).strict();

export const InvitationListRelationFilterSchema: z.ZodType<Prisma.InvitationListRelationFilter> = z.object({
  every: z.lazy(() => InvitationWhereInputSchema).optional(),
  some: z.lazy(() => InvitationWhereInputSchema).optional(),
  none: z.lazy(() => InvitationWhereInputSchema).optional()
}).strict();

export const TwoFactorListRelationFilterSchema: z.ZodType<Prisma.TwoFactorListRelationFilter> = z.object({
  every: z.lazy(() => TwoFactorWhereInputSchema).optional(),
  some: z.lazy(() => TwoFactorWhereInputSchema).optional(),
  none: z.lazy(() => TwoFactorWhereInputSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MemberOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.InvitationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TwoFactorOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TwoFactorOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  twoFactorEnabled: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  banned: z.lazy(() => SortOrderSchema).optional(),
  banReason: z.lazy(() => SortOrderSchema).optional(),
  banExpires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeOrganizationId: z.lazy(() => SortOrderSchema).optional(),
  impersonatedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeOrganizationId: z.lazy(() => SortOrderSchema).optional(),
  impersonatedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  ipAddress: z.lazy(() => SortOrderSchema).optional(),
  userAgent: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  activeOrganizationId: z.lazy(() => SortOrderSchema).optional(),
  impersonatedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  accountId: z.lazy(() => SortOrderSchema).optional(),
  providerId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  accessToken: z.lazy(() => SortOrderSchema).optional(),
  refreshToken: z.lazy(() => SortOrderSchema).optional(),
  idToken: z.lazy(() => SortOrderSchema).optional(),
  accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
  scope: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  identifier: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationCountOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationMinOrderByAggregateInputSchema: z.ZodType<Prisma.OrganizationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  slug: z.lazy(() => SortOrderSchema).optional(),
  logo: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  metadata: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const OrganizationScalarRelationFilterSchema: z.ZodType<Prisma.OrganizationScalarRelationFilter> = z.object({
  is: z.lazy(() => OrganizationWhereInputSchema).optional(),
  isNot: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const MemberCountOrderByAggregateInputSchema: z.ZodType<Prisma.MemberCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MemberMinOrderByAggregateInputSchema: z.ZodType<Prisma.MemberMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationCountOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const InvitationMinOrderByAggregateInputSchema: z.ZodType<Prisma.InvitationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  organizationId: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  expiresAt: z.lazy(() => SortOrderSchema).optional(),
  inviterId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TwoFactorCountOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TwoFactorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TwoFactorMinOrderByAggregateInputSchema: z.ZodType<Prisma.TwoFactorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  secret: z.lazy(() => SortOrderSchema).optional(),
  backupCodes: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksCountOrderByAggregateInputSchema: z.ZodType<Prisma.TasksCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const TasksMinOrderByAggregateInputSchema: z.ZodType<Prisma.TasksMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  done: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TwoFactorCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable(),
  unset: z.boolean().optional()
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TwoFactorUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberCreateWithoutUserInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema),z.lazy(() => MemberCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationCreateWithoutUserInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorCreateWithoutUserInputSchema).array(),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema),z.lazy(() => TwoFactorCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => TwoFactorCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => TwoFactorWhereUniqueInputSchema),z.lazy(() => TwoFactorWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => TwoFactorUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const MemberCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateNestedManyWithoutOrganizationInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MemberUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberCreateWithoutOrganizationInputSchema).array(),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => MemberCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MemberCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MemberWhereUniqueInputSchema),z.lazy(() => MemberWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => MemberUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutOrganizationNestedInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutOrganizationNestedInput> = z.object({
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateWithoutOrganizationInputSchema).array(),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema),z.lazy(() => InvitationCreateOrConnectWithoutOrganizationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InvitationUpsertWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => InvitationCreateManyOrganizationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => InvitationWhereUniqueInputSchema),z.lazy(() => InvitationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputSchema),z.lazy(() => InvitationUpdateWithWhereUniqueWithoutOrganizationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputSchema),z.lazy(() => InvitationUpdateManyWithWhereWithoutOrganizationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutMembersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMembersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembersInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutMembersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutMembersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutMembersInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMembersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMembersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutMembersInputSchema),z.lazy(() => UserUpdateWithoutMembersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembersInputSchema) ]).optional(),
}).strict();

export const OrganizationCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutInvitationsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.OrganizationUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => OrganizationCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => OrganizationUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => OrganizationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => OrganizationUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => OrganizationUpdateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutInvitationsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutInvitationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutInvitationsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutInvitationsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutInvitationsInputSchema),z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTwofactorsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutTwofactorsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTwofactorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTwofactorsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTwofactorsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutTwofactorsInputSchema),z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  isSet: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
}).strict();

export const MemberCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateWithoutUserInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const MemberUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const MemberCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MemberCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyUserInputSchema),z.lazy(() => MemberCreateManyUserInputSchema).array() ]),
}).strict();

export const InvitationCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateWithoutUserInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  organization: z.lazy(() => OrganizationCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const InvitationCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InvitationCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyUserInputSchema),z.lazy(() => InvitationCreateManyUserInputSchema).array() ]),
}).strict();

export const TwoFactorCreateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateWithoutUserInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string()
}).strict();

export const TwoFactorUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string()
}).strict();

export const TwoFactorCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TwoFactorCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => TwoFactorCreateManyUserInputSchema),z.lazy(() => TwoFactorCreateManyUserInputSchema).array() ]),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  ipAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userAgent: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  activeOrganizationId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  impersonatedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  accessToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  refreshToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  idToken: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const MemberUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MemberUpdateWithoutUserInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutUserInputSchema),z.lazy(() => MemberUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const MemberUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateWithoutUserInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const MemberUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => MemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateManyMutationInputSchema),z.lazy(() => MemberUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const MemberScalarWhereInputSchema: z.ZodType<Prisma.MemberScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MemberScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MemberScalarWhereInputSchema),z.lazy(() => MemberScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const InvitationUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationUpdateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCreateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const InvitationUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateWithoutUserInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const InvitationUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => InvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateManyMutationInputSchema),z.lazy(() => InvitationUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const InvitationScalarWhereInputSchema: z.ZodType<Prisma.InvitationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => InvitationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => InvitationScalarWhereInputSchema),z.lazy(() => InvitationScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  organizationId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expiresAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  inviterId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const TwoFactorUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => TwoFactorCreateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const TwoFactorUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => TwoFactorUpdateWithoutUserInputSchema),z.lazy(() => TwoFactorUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const TwoFactorUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => TwoFactorScalarWhereInputSchema),
  data: z.union([ z.lazy(() => TwoFactorUpdateManyMutationInputSchema),z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const TwoFactorScalarWhereInputSchema: z.ZodType<Prisma.TwoFactorScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => TwoFactorScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => TwoFactorScalarWhereInputSchema),z.lazy(() => TwoFactorScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  secret: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  backupCodes: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MemberCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  role: z.string(),
  createdAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutMembersInputSchema)
}).strict();

export const MemberUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const MemberCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MemberCreateManyOrganizationInputSchema),z.lazy(() => MemberCreateManyOrganizationInputSchema).array() ]),
}).strict();

export const InvitationCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutInvitationsInputSchema)
}).strict();

export const InvitationUncheckedCreateWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUncheckedCreateWithoutOrganizationInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string()
}).strict();

export const InvitationCreateOrConnectWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateOrConnectWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const InvitationCreateManyOrganizationInputEnvelopeSchema: z.ZodType<Prisma.InvitationCreateManyOrganizationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => InvitationCreateManyOrganizationInputSchema),z.lazy(() => InvitationCreateManyOrganizationInputSchema).array() ]),
}).strict();

export const MemberUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => MemberCreateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateWithoutOrganizationInputSchema),z.lazy(() => MemberUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const MemberUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => MemberScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MemberUpdateManyMutationInputSchema),z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const InvitationUpsertWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUpsertWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => InvitationUpdateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutOrganizationInputSchema) ]),
  create: z.union([ z.lazy(() => InvitationCreateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedCreateWithoutOrganizationInputSchema) ]),
}).strict();

export const InvitationUpdateWithWhereUniqueWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUpdateWithWhereUniqueWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InvitationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateWithoutOrganizationInputSchema),z.lazy(() => InvitationUncheckedUpdateWithoutOrganizationInputSchema) ]),
}).strict();

export const InvitationUpdateManyWithWhereWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUpdateManyWithWhereWithoutOrganizationInput> = z.object({
  where: z.lazy(() => InvitationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => InvitationUpdateManyMutationInputSchema),z.lazy(() => InvitationUncheckedUpdateManyWithoutOrganizationInputSchema) ]),
}).strict();

export const OrganizationCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const UserCreateWithoutMembersInputSchema: z.ZodType<Prisma.UserCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutMembersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutMembersInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutMembersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMembersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutMembersInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembersInputSchema) ]),
}).strict();

export const OrganizationUpsertWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutMembersInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutMembersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutMembersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutMembersInputSchema: z.ZodType<Prisma.UserUpsertWithoutMembersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutMembersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutMembersInputSchema),z.lazy(() => UserUncheckedCreateWithoutMembersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutMembersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMembersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutMembersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutMembersInputSchema) ]),
}).strict();

export const UserUpdateWithoutMembersInputSchema: z.ZodType<Prisma.UserUpdateWithoutMembersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutMembersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutMembersInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const OrganizationCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string().optional().nullable(),
  logo: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  metadata: z.string().optional().nullable(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutOrganizationInputSchema).optional()
}).strict();

export const OrganizationCreateOrConnectWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationCreateOrConnectWithoutInvitationsInput> = z.object({
  where: z.lazy(() => OrganizationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputSchema) ]),
}).strict();

export const UserCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutInvitationsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutInvitationsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]),
}).strict();

export const OrganizationUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => OrganizationUpdateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => OrganizationCreateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => OrganizationWhereInputSchema).optional()
}).strict();

export const OrganizationUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => OrganizationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => OrganizationUpdateWithoutInvitationsInputSchema),z.lazy(() => OrganizationUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export const OrganizationUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUpdateWithoutInvitationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => MemberUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const OrganizationUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.OrganizationUncheckedUpdateWithoutInvitationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  slug: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  logo: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  metadata: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutOrganizationNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpsertWithoutInvitationsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedCreateWithoutInvitationsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutInvitationsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutInvitationsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutInvitationsInputSchema) ]),
}).strict();

export const UserUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUpdateWithoutInvitationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutInvitationsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutInvitationsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  twofactors: z.lazy(() => TwoFactorUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateWithoutTwofactorsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTwofactorsInput> = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  twoFactorEnabled: z.boolean().optional().nullable(),
  role: z.string().optional().nullable(),
  banned: z.boolean().optional().nullable(),
  banReason: z.string().optional().nullable(),
  banExpires: z.coerce.date().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTwofactorsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]),
}).strict();

export const UserUpsertWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpsertWithoutTwofactorsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedCreateWithoutTwofactorsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTwofactorsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutTwofactorsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutTwofactorsInputSchema) ]),
}).strict();

export const UserUpdateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUpdateWithoutTwofactorsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutTwofactorsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTwofactorsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  emailVerified: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  twoFactorEnabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banned: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banReason: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  banExpires: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  members: z.lazy(() => MemberUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  invitations: z.lazy(() => InvitationUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  activeOrganizationId: z.string().optional().nullable(),
  impersonatedBy: z.string().optional().nullable()
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  accessToken: z.string().optional().nullable(),
  refreshToken: z.string().optional().nullable(),
  idToken: z.string().optional().nullable(),
  accessTokenExpiresAt: z.coerce.date().optional().nullable(),
  refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
  scope: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const MemberCreateManyUserInputSchema: z.ZodType<Prisma.MemberCreateManyUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const InvitationCreateManyUserInputSchema: z.ZodType<Prisma.InvitationCreateManyUserInput> = z.object({
  id: z.string(),
  organizationId: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date()
}).strict();

export const TwoFactorCreateManyUserInputSchema: z.ZodType<Prisma.TwoFactorCreateManyUserInput> = z.object({
  id: z.string(),
  secret: z.string(),
  backupCodes: z.string()
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ipAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  userAgent: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  activeOrganizationId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  impersonatedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  accountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  accessToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  idToken: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accessTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  refreshTokenExpiresAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUpdateWithoutUserInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutUserInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutUserInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUpdateWithoutUserInputSchema: z.ZodType<Prisma.InvitationUpdateWithoutUserInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  organization: z.lazy(() => OrganizationUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateWithoutUserInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutUserInput> = z.object({
  organizationId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorUpdateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUpdateWithoutUserInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateWithoutUserInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const TwoFactorUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TwoFactorUncheckedUpdateManyWithoutUserInput> = z.object({
  secret: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  backupCodes: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberCreateManyOrganizationInputSchema: z.ZodType<Prisma.MemberCreateManyOrganizationInput> = z.object({
  id: z.string(),
  userId: z.string(),
  role: z.string(),
  createdAt: z.coerce.date()
}).strict();

export const InvitationCreateManyOrganizationInputSchema: z.ZodType<Prisma.InvitationCreateManyOrganizationInput> = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string().optional().nullable(),
  status: z.string(),
  expiresAt: z.coerce.date(),
  inviterId: z.string()
}).strict();

export const MemberUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUpdateWithoutOrganizationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutMembersNestedInputSchema).optional()
}).strict();

export const MemberUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateWithoutOrganizationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const MemberUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.MemberUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUpdateWithoutOrganizationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutInvitationsNestedInputSchema).optional()
}).strict();

export const InvitationUncheckedUpdateWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateWithoutOrganizationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const InvitationUncheckedUpdateManyWithoutOrganizationInputSchema: z.ZodType<Prisma.InvitationUncheckedUpdateManyWithoutOrganizationInput> = z.object({
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expiresAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  inviterId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationScalarFieldEnumSchema,VerificationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithRelationInputSchema.array(),VerificationOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  orderBy: z.union([ VerificationOrderByWithAggregationInputSchema.array(),VerificationOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationScalarFieldEnumSchema.array(),
  having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationFindFirstArgsSchema: z.ZodType<Prisma.OrganizationFindFirstArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindFirstOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationFindManyArgsSchema: z.ZodType<Prisma.OrganizationFindManyArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ OrganizationScalarFieldEnumSchema,OrganizationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const OrganizationAggregateArgsSchema: z.ZodType<Prisma.OrganizationAggregateArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithRelationInputSchema.array(),OrganizationOrderByWithRelationInputSchema ]).optional(),
  cursor: OrganizationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrganizationGroupByArgsSchema: z.ZodType<Prisma.OrganizationGroupByArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  orderBy: z.union([ OrganizationOrderByWithAggregationInputSchema.array(),OrganizationOrderByWithAggregationInputSchema ]).optional(),
  by: OrganizationScalarFieldEnumSchema.array(),
  having: OrganizationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const OrganizationFindUniqueArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.OrganizationFindUniqueOrThrowArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const MemberFindFirstArgsSchema: z.ZodType<Prisma.MemberFindFirstArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MemberFindFirstOrThrowArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberFindManyArgsSchema: z.ZodType<Prisma.MemberFindManyArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MemberScalarFieldEnumSchema,MemberScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MemberAggregateArgsSchema: z.ZodType<Prisma.MemberAggregateArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithRelationInputSchema.array(),MemberOrderByWithRelationInputSchema ]).optional(),
  cursor: MemberWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberGroupByArgsSchema: z.ZodType<Prisma.MemberGroupByArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
  orderBy: z.union([ MemberOrderByWithAggregationInputSchema.array(),MemberOrderByWithAggregationInputSchema ]).optional(),
  by: MemberScalarFieldEnumSchema.array(),
  having: MemberScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MemberFindUniqueArgsSchema: z.ZodType<Prisma.MemberFindUniqueArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MemberFindUniqueOrThrowArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const InvitationFindFirstArgsSchema: z.ZodType<Prisma.InvitationFindFirstArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindFirstOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationFindManyArgsSchema: z.ZodType<Prisma.InvitationFindManyArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InvitationScalarFieldEnumSchema,InvitationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const InvitationAggregateArgsSchema: z.ZodType<Prisma.InvitationAggregateArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithRelationInputSchema.array(),InvitationOrderByWithRelationInputSchema ]).optional(),
  cursor: InvitationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationGroupByArgsSchema: z.ZodType<Prisma.InvitationGroupByArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
  orderBy: z.union([ InvitationOrderByWithAggregationInputSchema.array(),InvitationOrderByWithAggregationInputSchema ]).optional(),
  by: InvitationScalarFieldEnumSchema.array(),
  having: InvitationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const InvitationFindUniqueArgsSchema: z.ZodType<Prisma.InvitationFindUniqueArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.InvitationFindUniqueOrThrowArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const TwoFactorFindFirstArgsSchema: z.ZodType<Prisma.TwoFactorFindFirstArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereInputSchema.optional(),
  orderBy: z.union([ TwoFactorOrderByWithRelationInputSchema.array(),TwoFactorOrderByWithRelationInputSchema ]).optional(),
  cursor: TwoFactorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TwoFactorScalarFieldEnumSchema,TwoFactorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TwoFactorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TwoFactorFindFirstOrThrowArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereInputSchema.optional(),
  orderBy: z.union([ TwoFactorOrderByWithRelationInputSchema.array(),TwoFactorOrderByWithRelationInputSchema ]).optional(),
  cursor: TwoFactorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TwoFactorScalarFieldEnumSchema,TwoFactorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TwoFactorFindManyArgsSchema: z.ZodType<Prisma.TwoFactorFindManyArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereInputSchema.optional(),
  orderBy: z.union([ TwoFactorOrderByWithRelationInputSchema.array(),TwoFactorOrderByWithRelationInputSchema ]).optional(),
  cursor: TwoFactorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TwoFactorScalarFieldEnumSchema,TwoFactorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TwoFactorAggregateArgsSchema: z.ZodType<Prisma.TwoFactorAggregateArgs> = z.object({
  where: TwoFactorWhereInputSchema.optional(),
  orderBy: z.union([ TwoFactorOrderByWithRelationInputSchema.array(),TwoFactorOrderByWithRelationInputSchema ]).optional(),
  cursor: TwoFactorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TwoFactorGroupByArgsSchema: z.ZodType<Prisma.TwoFactorGroupByArgs> = z.object({
  where: TwoFactorWhereInputSchema.optional(),
  orderBy: z.union([ TwoFactorOrderByWithAggregationInputSchema.array(),TwoFactorOrderByWithAggregationInputSchema ]).optional(),
  by: TwoFactorScalarFieldEnumSchema.array(),
  having: TwoFactorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TwoFactorFindUniqueArgsSchema: z.ZodType<Prisma.TwoFactorFindUniqueArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereUniqueInputSchema,
}).strict() ;

export const TwoFactorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TwoFactorFindUniqueOrThrowArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereUniqueInputSchema,
}).strict() ;

export const TasksFindFirstArgsSchema: z.ZodType<Prisma.TasksFindFirstArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema,TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TasksFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TasksFindFirstOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema,TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TasksFindManyArgsSchema: z.ZodType<Prisma.TasksFindManyArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ TasksScalarFieldEnumSchema,TasksScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const TasksAggregateArgsSchema: z.ZodType<Prisma.TasksAggregateArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithRelationInputSchema.array(),TasksOrderByWithRelationInputSchema ]).optional(),
  cursor: TasksWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TasksGroupByArgsSchema: z.ZodType<Prisma.TasksGroupByArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  orderBy: z.union([ TasksOrderByWithAggregationInputSchema.array(),TasksOrderByWithAggregationInputSchema ]).optional(),
  by: TasksScalarFieldEnumSchema.array(),
  having: TasksScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const TasksFindUniqueArgsSchema: z.ZodType<Prisma.TasksFindUniqueArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export const TasksFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TasksFindUniqueOrThrowArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
  create: z.union([ VerificationCreateInputSchema,VerificationUncheckedCreateInputSchema ]),
  update: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> = z.object({
  data: z.union([ VerificationCreateManyInputSchema,VerificationCreateManyInputSchema.array() ]),
}).strict() ;

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> = z.object({
  select: VerificationSelectSchema.optional(),
  data: z.union([ VerificationUpdateInputSchema,VerificationUncheckedUpdateInputSchema ]),
  where: VerificationWhereUniqueInputSchema,
}).strict() ;

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> = z.object({
  data: z.union([ VerificationUpdateManyMutationInputSchema,VerificationUncheckedUpdateManyInputSchema ]),
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> = z.object({
  where: VerificationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OrganizationCreateArgsSchema: z.ZodType<Prisma.OrganizationCreateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
}).strict() ;

export const OrganizationUpsertArgsSchema: z.ZodType<Prisma.OrganizationUpsertArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
  create: z.union([ OrganizationCreateInputSchema,OrganizationUncheckedCreateInputSchema ]),
  update: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
}).strict() ;

export const OrganizationCreateManyArgsSchema: z.ZodType<Prisma.OrganizationCreateManyArgs> = z.object({
  data: z.union([ OrganizationCreateManyInputSchema,OrganizationCreateManyInputSchema.array() ]),
}).strict() ;

export const OrganizationDeleteArgsSchema: z.ZodType<Prisma.OrganizationDeleteArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationUpdateArgsSchema: z.ZodType<Prisma.OrganizationUpdateArgs> = z.object({
  select: OrganizationSelectSchema.optional(),
  include: OrganizationIncludeSchema.optional(),
  data: z.union([ OrganizationUpdateInputSchema,OrganizationUncheckedUpdateInputSchema ]),
  where: OrganizationWhereUniqueInputSchema,
}).strict() ;

export const OrganizationUpdateManyArgsSchema: z.ZodType<Prisma.OrganizationUpdateManyArgs> = z.object({
  data: z.union([ OrganizationUpdateManyMutationInputSchema,OrganizationUncheckedUpdateManyInputSchema ]),
  where: OrganizationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const OrganizationDeleteManyArgsSchema: z.ZodType<Prisma.OrganizationDeleteManyArgs> = z.object({
  where: OrganizationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MemberCreateArgsSchema: z.ZodType<Prisma.MemberCreateArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  data: z.union([ MemberCreateInputSchema,MemberUncheckedCreateInputSchema ]),
}).strict() ;

export const MemberUpsertArgsSchema: z.ZodType<Prisma.MemberUpsertArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
  create: z.union([ MemberCreateInputSchema,MemberUncheckedCreateInputSchema ]),
  update: z.union([ MemberUpdateInputSchema,MemberUncheckedUpdateInputSchema ]),
}).strict() ;

export const MemberCreateManyArgsSchema: z.ZodType<Prisma.MemberCreateManyArgs> = z.object({
  data: z.union([ MemberCreateManyInputSchema,MemberCreateManyInputSchema.array() ]),
}).strict() ;

export const MemberDeleteArgsSchema: z.ZodType<Prisma.MemberDeleteArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberUpdateArgsSchema: z.ZodType<Prisma.MemberUpdateArgs> = z.object({
  select: MemberSelectSchema.optional(),
  include: MemberIncludeSchema.optional(),
  data: z.union([ MemberUpdateInputSchema,MemberUncheckedUpdateInputSchema ]),
  where: MemberWhereUniqueInputSchema,
}).strict() ;

export const MemberUpdateManyArgsSchema: z.ZodType<Prisma.MemberUpdateManyArgs> = z.object({
  data: z.union([ MemberUpdateManyMutationInputSchema,MemberUncheckedUpdateManyInputSchema ]),
  where: MemberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const MemberDeleteManyArgsSchema: z.ZodType<Prisma.MemberDeleteManyArgs> = z.object({
  where: MemberWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InvitationCreateArgsSchema: z.ZodType<Prisma.InvitationCreateArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  data: z.union([ InvitationCreateInputSchema,InvitationUncheckedCreateInputSchema ]),
}).strict() ;

export const InvitationUpsertArgsSchema: z.ZodType<Prisma.InvitationUpsertArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
  create: z.union([ InvitationCreateInputSchema,InvitationUncheckedCreateInputSchema ]),
  update: z.union([ InvitationUpdateInputSchema,InvitationUncheckedUpdateInputSchema ]),
}).strict() ;

export const InvitationCreateManyArgsSchema: z.ZodType<Prisma.InvitationCreateManyArgs> = z.object({
  data: z.union([ InvitationCreateManyInputSchema,InvitationCreateManyInputSchema.array() ]),
}).strict() ;

export const InvitationDeleteArgsSchema: z.ZodType<Prisma.InvitationDeleteArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationUpdateArgsSchema: z.ZodType<Prisma.InvitationUpdateArgs> = z.object({
  select: InvitationSelectSchema.optional(),
  include: InvitationIncludeSchema.optional(),
  data: z.union([ InvitationUpdateInputSchema,InvitationUncheckedUpdateInputSchema ]),
  where: InvitationWhereUniqueInputSchema,
}).strict() ;

export const InvitationUpdateManyArgsSchema: z.ZodType<Prisma.InvitationUpdateManyArgs> = z.object({
  data: z.union([ InvitationUpdateManyMutationInputSchema,InvitationUncheckedUpdateManyInputSchema ]),
  where: InvitationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const InvitationDeleteManyArgsSchema: z.ZodType<Prisma.InvitationDeleteManyArgs> = z.object({
  where: InvitationWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TwoFactorCreateArgsSchema: z.ZodType<Prisma.TwoFactorCreateArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  data: z.union([ TwoFactorCreateInputSchema,TwoFactorUncheckedCreateInputSchema ]),
}).strict() ;

export const TwoFactorUpsertArgsSchema: z.ZodType<Prisma.TwoFactorUpsertArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereUniqueInputSchema,
  create: z.union([ TwoFactorCreateInputSchema,TwoFactorUncheckedCreateInputSchema ]),
  update: z.union([ TwoFactorUpdateInputSchema,TwoFactorUncheckedUpdateInputSchema ]),
}).strict() ;

export const TwoFactorCreateManyArgsSchema: z.ZodType<Prisma.TwoFactorCreateManyArgs> = z.object({
  data: z.union([ TwoFactorCreateManyInputSchema,TwoFactorCreateManyInputSchema.array() ]),
}).strict() ;

export const TwoFactorDeleteArgsSchema: z.ZodType<Prisma.TwoFactorDeleteArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  where: TwoFactorWhereUniqueInputSchema,
}).strict() ;

export const TwoFactorUpdateArgsSchema: z.ZodType<Prisma.TwoFactorUpdateArgs> = z.object({
  select: TwoFactorSelectSchema.optional(),
  include: TwoFactorIncludeSchema.optional(),
  data: z.union([ TwoFactorUpdateInputSchema,TwoFactorUncheckedUpdateInputSchema ]),
  where: TwoFactorWhereUniqueInputSchema,
}).strict() ;

export const TwoFactorUpdateManyArgsSchema: z.ZodType<Prisma.TwoFactorUpdateManyArgs> = z.object({
  data: z.union([ TwoFactorUpdateManyMutationInputSchema,TwoFactorUncheckedUpdateManyInputSchema ]),
  where: TwoFactorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TwoFactorDeleteManyArgsSchema: z.ZodType<Prisma.TwoFactorDeleteManyArgs> = z.object({
  where: TwoFactorWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TasksCreateArgsSchema: z.ZodType<Prisma.TasksCreateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  data: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
}).strict() ;

export const TasksUpsertArgsSchema: z.ZodType<Prisma.TasksUpsertArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
  create: z.union([ TasksCreateInputSchema,TasksUncheckedCreateInputSchema ]),
  update: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
}).strict() ;

export const TasksCreateManyArgsSchema: z.ZodType<Prisma.TasksCreateManyArgs> = z.object({
  data: z.union([ TasksCreateManyInputSchema,TasksCreateManyInputSchema.array() ]),
}).strict() ;

export const TasksDeleteArgsSchema: z.ZodType<Prisma.TasksDeleteArgs> = z.object({
  select: TasksSelectSchema.optional(),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export const TasksUpdateArgsSchema: z.ZodType<Prisma.TasksUpdateArgs> = z.object({
  select: TasksSelectSchema.optional(),
  data: z.union([ TasksUpdateInputSchema,TasksUncheckedUpdateInputSchema ]),
  where: TasksWhereUniqueInputSchema,
}).strict() ;

export const TasksUpdateManyArgsSchema: z.ZodType<Prisma.TasksUpdateManyArgs> = z.object({
  data: z.union([ TasksUpdateManyMutationInputSchema,TasksUncheckedUpdateManyInputSchema ]),
  where: TasksWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;

export const TasksDeleteManyArgsSchema: z.ZodType<Prisma.TasksDeleteManyArgs> = z.object({
  where: TasksWhereInputSchema.optional(),
  limit: z.number().optional(),
}).strict() ;