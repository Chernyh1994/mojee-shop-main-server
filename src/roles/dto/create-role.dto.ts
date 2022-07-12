import { RoleType } from '../types/roles.type';

export class CreateRoleDto {
  readonly name?: RoleType;
  readonly description?: string;
}
