import { RoleType } from '../types/role.type';

export class CreateRoleDto {
  readonly name?: RoleType;
  readonly description?: string;
}
