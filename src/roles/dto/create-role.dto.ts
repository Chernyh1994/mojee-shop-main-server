import { IsDefined, IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { RoleType } from '../types/role.type';
import { RoleEnum } from '../enums/role.enum';

export class CreateRoleDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEnum(RoleEnum)
  readonly name: RoleType;

  @IsString()
  @MaxLength(100, {
    message: 'description is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly description: string;
}
