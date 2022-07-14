import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class RegistrationUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'firstName is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly firstName: string;

  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50, {
    message:
      'email is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message:
      'password is too long. Maximal length is $constraint1 characters, but actual is $value',
  })
  @MinLength(8, {
    message:
      'password is too short. Minimal is $constraint1 characters, but actual is $value',
  })
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-z]).*$/,
    {
      message:
        'password must contain an uppercase letter, one number and one symbol !@#$%^&*',
    },
  )
  readonly password: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 0 })
  @Max(130, {
    message:
      'age is very large. Maximal large is $constraint1, but actual is $value',
  })
  @Min(16, {
    message: 'age is very short. Minimal is $constraint1, but actual is $value',
  })
  readonly age: number;
}
