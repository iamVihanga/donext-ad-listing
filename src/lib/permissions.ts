import { createAccessControl } from "better-auth/plugins/access";
import {
  defaultStatements,
  adminAc,
  memberAc,
  ownerAc
} from "better-auth/plugins/organization/access";

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
const statement = {
  ...defaultStatements
} as const;

export const ac = createAccessControl(statement);

export const member = ac.newRole({
  ...memberAc.statements
});

export const admin = ac.newRole({
  ...adminAc.statements
});

export const owner = ac.newRole({
  ...ownerAc.statements
});
