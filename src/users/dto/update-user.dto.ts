import { IsEmail, IsInt, MaxLength, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateProfileDto } from './update-profile.dto';

export class UpdateUserDto {
  @IsEmail()
  @MaxLength(50, {
    message: 'email is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly email: string;

  @IsInt()
  @Min(0)
  readonly role_id: number;

  @ValidateNested()
  @Type(() => UpdateProfileDto)
  readonly profile: UpdateProfileDto;
}
