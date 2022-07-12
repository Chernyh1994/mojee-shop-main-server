export enum RoleValues {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  VERIFY_USER = 'VERIFY_USER',
  USER = 'USER',
}

export type RoleType = keyof typeof RoleValues;
