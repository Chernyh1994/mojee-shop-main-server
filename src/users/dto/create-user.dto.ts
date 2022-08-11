import {
  IsDefined,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  Matches,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50, {
    message: 'email is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(8, {
    message: 'password is too short. Minimal is $constraint1 characters, but actual is $value',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).*$/, {
    message: 'password must contain an uppercase letter, one number and one symbol !@#$%^&*',
  })
  password: string;

  @IsDefined()
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  readonly role_id: number;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateProfileDto)
  readonly profile: CreateProfileDto;
}
